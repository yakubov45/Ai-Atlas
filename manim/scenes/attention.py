"""
Manim Community Animation Scene: Scaled Dot-Product Attention (Q, K, V).
Visualizes Query (Q) matching against Keys (K_A, K_B), Softmax weights (26.9% vs 73.1%),
and weighted sum of Values (V_A, V_B) -> Output = 4.924.
Designed for AI Atlas Interactive Learning Platform.
"""

from manim import *

config.background_color = "#090d16"
config.frame_width = 16
config.frame_height = 9


class SelfAttentionScene(Scene):
    def construct(self):
        # 1. Header
        title = Text("Self-Attention: Q, K, V va Vaznli Yig'indi", font_size=34, color=BLUE_B)
        title.to_edge(UP, buff=0.4)
        subtitle = Text(
            "Attention(Q, K, V) = Softmax(Q·K / √dₖ) · V",
            font_size=20,
            color=PURPLE_B,
        )
        subtitle.next_to(title, DOWN, buff=0.15)

        self.play(FadeIn(title, shift=UP * 0.3), FadeIn(subtitle, shift=UP * 0.2), run_time=1)
        self.wait(0.4)

        # 2. Query Box (Left)
        q_pos = np.array([-5.2, 0.0, 0])
        q_box = RoundedRectangle(
            corner_radius=0.2, width=2.4, height=1.5, color=PURPLE, fill_color="#24123d", fill_opacity=0.9
        ).move_to(q_pos)
        q_lbl = Text("Query (Q)", font_size=20, color=PURPLE_A).move_to(q_pos + UP * 0.3)
        q_val = Text("Q = 1.0", font_size=22, color=WHITE).move_to(q_pos + DOWN * 0.25)

        # 3. Token A & Token B Boxes (Center-Left)
        tokA_pos = np.array([-1.0, 1.5, 0])
        tokB_pos = np.array([-1.0, -1.5, 0])

        tokA_box = RoundedRectangle(
            corner_radius=0.2, width=3.0, height=1.5, color=TEAL, fill_color="#0d2638", fill_opacity=0.9
        ).move_to(tokA_pos)
        tokA_lbl = Text("Token A", font_size=20, color=TEAL_A).move_to(tokA_pos + UP * 0.35)
        tokA_kv = Text("K = 1.0   |   V = 2.0", font_size=18, color=WHITE).move_to(tokA_pos + DOWN * 0.25)

        tokB_box = RoundedRectangle(
            corner_radius=0.2, width=3.0, height=1.5, color=BLUE, fill_color="#111d3b", fill_opacity=0.9
        ).move_to(tokB_pos)
        tokB_lbl = Text("Token B", font_size=20, color=BLUE_A).move_to(tokB_pos + UP * 0.35)
        tokB_kv = Text("K = 2.0   |   V = 6.0", font_size=18, color=WHITE).move_to(tokB_pos + DOWN * 0.25)

        self.play(
            FadeIn(q_box), Write(q_lbl), Write(q_val),
            FadeIn(tokA_box), Write(tokA_lbl), Write(tokA_kv),
            FadeIn(tokB_box), Write(tokB_lbl), Write(tokB_kv),
            run_time=1.4,
        )
        self.wait(0.4)

        # 4. Dot Product & Softmax Weights (Center-Right)
        arr_qA = Arrow(q_box.get_right(), tokA_box.get_left(), buff=0.15, color=TEAL_B, stroke_width=3)
        arr_qB = Arrow(q_box.get_right(), tokB_box.get_left(), buff=0.15, color=BLUE_B, stroke_width=3)

        scoreA_txt = Text("Q·K = 1.0", font_size=16, color=YELLOW_B).next_to(arr_qA, UP, buff=0.1)
        scoreB_txt = Text("Q·K = 2.0", font_size=16, color=YELLOW_B).next_to(arr_qB, DOWN, buff=0.1)

        self.play(GrowArrow(arr_qA), GrowArrow(arr_qB), FadeIn(scoreA_txt), FadeIn(scoreB_txt), run_time=1.0)
        self.wait(0.4)

        # Softmax Weights
        wA_pos = np.array([2.4, 1.5, 0])
        wB_pos = np.array([2.4, -1.5, 0])

        wA_box = RoundedRectangle(
            corner_radius=0.18, width=2.2, height=1.2, color=TEAL_B, fill_color="#0b2e36", fill_opacity=0.9
        ).move_to(wA_pos)
        wA_txt = Text("Softmax: 26.9%", font_size=18, color=TEAL_A).move_to(wA_pos)

        wB_box = RoundedRectangle(
            corner_radius=0.18, width=2.2, height=1.2, color=PURPLE_B, fill_color="#2a1447", fill_opacity=0.9
        ).move_to(wB_pos)
        wB_txt = Text("Softmax: 73.1%", font_size=18, color=PURPLE_A).move_to(wB_pos)

        arr_A_w = Arrow(tokA_box.get_right(), wA_box.get_left(), buff=0.12, color=TEAL_B)
        arr_B_w = Arrow(tokB_box.get_right(), wB_box.get_left(), buff=0.12, color=PURPLE_B)

        self.play(
            GrowArrow(arr_A_w), GrowArrow(arr_B_w),
            FadeIn(wA_box), Write(wA_txt),
            FadeIn(wB_box), Write(wB_txt),
            run_time=1.2,
        )
        self.wait(0.5)

        # 5. Final Weighted Sum Output (Right)
        out_pos = np.array([5.6, 0.0, 0])
        out_box = RoundedRectangle(
            corner_radius=0.22, width=2.5, height=1.8, color=GREEN, fill_color="#0a2b1d", fill_opacity=0.95
        ).move_to(out_pos)
        out_lbl = Text("Natija (Z)", font_size=19, color=GREEN_B).move_to(out_pos + UP * 0.4)
        out_val = Text("4.924", font_size=26, color=GREEN_A).move_to(out_pos + DOWN * 0.2)

        arr_wA_out = Arrow(wA_box.get_right(), out_box.get_left() + UP * 0.3, buff=0.12, color=GREEN_B)
        arr_wB_out = Arrow(wB_box.get_right(), out_box.get_left() + DOWN * 0.3, buff=0.12, color=GREEN_B)

        calc_footer = Text(
            "Natija = 2.0 × 0.269 + 6.0 × 0.731 = 0.538 + 4.386 = 4.924",
            font_size=18,
            color=GREEN_B,
        ).to_edge(DOWN, buff=0.5)

        self.play(
            GrowArrow(arr_wA_out),
            GrowArrow(arr_wB_out),
            FadeIn(out_box),
            Write(out_lbl),
            Write(out_val),
            FadeIn(calc_footer),
            Flash(out_box, color=GREEN, flash_radius=0.8),
            run_time=1.4,
        )
        self.wait(1.5)
