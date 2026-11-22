# -*- coding: utf-8 -*-
"""
AI Atlas — Manim Community Scene for Tokenizer Padding & Attention Mask
Upstream reference: Hugging Face LLM Course, Chapter 2 (Apache-2.0)
Render command:
    manim -pqh examples/manim/token_padding.py TokenPaddingScene
"""

from manim import (
    Scene,
    VGroup,
    RoundedRectangle,
    Text,
    MathTex,
    Arrow,
    UP,
    DOWN,
    LEFT,
    RIGHT,
    GREEN_C,
    BLUE_C,
    GREY_B,
    YELLOW_C,
    WHITE,
    FadeIn,
    Write,
    Create,
)


class TokenPaddingScene(Scene):
    """
    Visualizes how variable-length token ID sequences are padded to form a
    rectangular batch tensor alongside their binary 1/0 attention_mask.
    Note: Illustrative educational scene; not actual transformer attention weights.
    """

    def construct(self):
        title = Text("Tokenizer: Padding & Attention Mask", font_size=34, color=WHITE)
        subtitle = Text(
            "Turli uzunlikdagi gaplarni bitta batch matritsaga tekislash",
            font_size=20,
            color=GREY_B,
        ).next_to(title, DOWN, buff=0.2)
        header = VGroup(title, subtitle).to_edge(UP, buff=0.4)
        self.play(Write(title), FadeIn(subtitle))

        # Raw sequences: [11, 12] and [21, 22, 23, 24]
        seq_1_ids = [11, 12, 0, 0]
        seq_1_mask = [1, 1, 0, 0]
        seq_2_ids = [21, 22, 23, 24]
        seq_2_mask = [1, 1, 1, 1]

        def make_row(values, is_padded_flags, active_color):
            cells = VGroup()
            for val, is_pad in zip(values, is_padded_flags):
                col = GREY_B if is_pad else active_color
                box = RoundedRectangle(
                    corner_radius=0.12, width=1.1, height=0.75, color=col, fill_opacity=0.2
                )
                lbl = Text(str(val), font_size=24, color=col).move_to(box.get_center())
                cells.add(VGroup(box, lbl))
            cells.arrange(RIGHT, buff=0.15)
            return cells

        ids_label = Text("input_ids (pad_id = 0)", font_size=22, color=BLUE_C)
        r1_ids = make_row(seq_1_ids, [False, False, True, True], BLUE_C)
        r2_ids = make_row(seq_2_ids, [False, False, False, False], BLUE_C)
        ids_group = VGroup(ids_label, r1_ids, r2_ids).arrange(DOWN, buff=0.25).shift(LEFT * 3.1 + DOWN * 0.3)

        mask_label = Text("attention_mask (1=real, 0=pad)", font_size=22, color=GREEN_C)
        r1_mask = make_row(seq_1_mask, [False, False, True, True], GREEN_C)
        r2_mask = make_row(seq_2_mask, [False, False, False, False], GREEN_C)
        mask_group = VGroup(mask_label, r1_mask, r2_mask).arrange(DOWN, buff=0.25).shift(RIGHT * 3.1 + DOWN * 0.3)

        arrow = Arrow(ids_group.get_right(), mask_group.get_left(), buff=0.35, color=YELLOW_C)
        formula = MathTex(
            r"\text{mask}_{i,j} = \begin{cases} 1 & \text{haqiqiy token} \\ 0 & \text{padding} \end{cases}",
            font_size=28,
            color=YELLOW_C,
        ).to_edge(DOWN, buff=0.45)

        self.play(FadeIn(ids_group))
        self.play(Create(arrow), FadeIn(mask_group))
        self.play(Write(formula))
        self.wait(2)
