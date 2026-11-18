"""
Manim Community Animation Scene: Phase 12 — 2D Vectors, Dot Product & Cosine Similarity (12.07).
Visualizes A=(1,0) and B=(0,1) at 90 degrees (cos = 0), then rotates to C=(1,1) at 45 degrees
(dot = 1, ||A|| = 1, ||C|| = sqrt(2), cos = 1/sqrt(2) ≈ 0.7071).
Designed for AI Atlas Interactive AI Engineer Learning Platform.
"""

from manim import *

config.background_color = "#090d16"
config.frame_width = 16
config.frame_height = 9


class CosineSimilarityScene(Scene):
    def construct(self):
        # 1. Header
        title = Text("Phase 12: Vektorlar, Dot Product va Cosine Similarity", font_size=32, color=BLUE_B)
        title.to_edge(UP, buff=0.35)
        subtitle = Text(
            "cos(A, B) = (A · B) / (||A|| · ||B||)  —  Uzunlik emas, yo'nalish o'xshashligi",
            font_size=18,
            color=PURPLE_B,
        )
        subtitle.next_to(title, DOWN, buff=0.12)

        self.play(FadeIn(title, shift=UP * 0.2), FadeIn(subtitle), run_time=1.0)

        # 2. 2D Coordinate Plane (Left side)
        plane = NumberPlane(
            x_range=[-2, 3, 1],
            y_range=[-2, 3, 1],
            x_length=6.0,
            y_length=6.0,
            background_line_style={"stroke_color": BLUE_E, "stroke_width": 1, "stroke_opacity": 0.4},
        ).shift(LEFT * 3.5 + DOWN * 0.4)

        origin = plane.c2p(0, 0)
        vec_a_end = plane.c2p(2, 0)  # Scaled by 2 units for visual clarity: represents A = (1, 0)
        vec_b_90_end = plane.c2p(0, 2)  # Represents B = (0, 1)
        vec_c_45_end = plane.c2p(2, 2)  # Represents C = (1, 1)

        arr_a = Arrow(origin, vec_a_end, buff=0, color=TEAL_A, stroke_width=5)
        lbl_a = Text("A = (1, 0)", font_size=18, color=TEAL_A).next_to(vec_a_end, DOWN, buff=0.15)

        arr_b = Arrow(origin, vec_b_90_end, buff=0, color=YELLOW_B, stroke_width=5)
        lbl_b = Text("B = (0, 1)", font_size=18, color=YELLOW_B).next_to(vec_b_90_end, LEFT, buff=0.15)

        self.play(Create(plane), GrowArrow(arr_a), Write(lbl_a), GrowArrow(arr_b), Write(lbl_b), run_time=1.4)

        # 3. 90-degree Orthogonal State (Right side formula box)
        card_90 = RoundedRectangle(
            corner_radius=0.2, width=6.6, height=2.2, color=YELLOW_C, fill_color="#1c1810", fill_opacity=0.9
        ).move_to(np.array([3.5, 1.1, 0]))
        txt_90_1 = Text("1-holat: Burchak = 90° (Tik vektorlar)", font_size=19, color=YELLOW_B).move_to(
            card_90.get_center() + UP * 0.55
        )
        txt_90_2 = Text("A · B = 1×0 + 0×1 = 0", font_size=17, color=WHITE).move_to(card_90.get_center())
        txt_90_3 = Text("cos(90°) = 0 / (1 × 1) = 0.0000", font_size=18, color=YELLOW_A).move_to(
            card_90.get_center() + DOWN * 0.55
        )

        self.play(FadeIn(card_90), Write(txt_90_1), Write(txt_90_2), Write(txt_90_3), run_time=1.2)
        self.wait(0.6)

        # 4. Transform B=(0,1) -> C=(1,1) at 45 degrees
        arr_c = Arrow(origin, vec_c_45_end, buff=0, color=PURPLE_A, stroke_width=5)
        lbl_c = Text("C = (1, 1)", font_size=18, color=PURPLE_A).next_to(vec_c_45_end, UP + RIGHT, buff=0.1)

        card_45 = RoundedRectangle(
            corner_radius=0.2, width=6.6, height=2.6, color=GREEN_C, fill_color="#0c261b", fill_opacity=0.95
        ).move_to(np.array([3.5, -1.6, 0]))
        txt_45_1 = Text("2-holat: Burchak = 45° — C = (1, 1)", font_size=19, color=GREEN_B).move_to(
            card_45.get_center() + UP * 0.75
        )
        txt_45_2 = Text("Dot product: A · C = 1×1 + 0×1 = 1", font_size=16, color=WHITE).move_to(
            card_45.get_center() + UP * 0.25
        )
        txt_45_3 = Text("Normlar: ||A|| = 1,   ||C|| = √(1² + 1²) = √2 ≈ 1.4142", font_size=16, color=GRAY_A).move_to(
            card_45.get_center() + DOWN * 0.25
        )
        txt_45_4 = Text("cos(A, C) = 1 / (1 × √2) ≈ 0.7071", font_size=19, color=GREEN_A).move_to(
            card_45.get_center() + DOWN * 0.75
        )

        self.play(
            Transform(arr_b, arr_c),
            Transform(lbl_b, lbl_c),
            FadeIn(card_45),
            Write(txt_45_1),
            Write(txt_45_2),
            Write(txt_45_3),
            Write(txt_45_4),
            run_time=1.6,
        )
        self.wait(1.5)
