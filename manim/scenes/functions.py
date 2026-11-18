"""
Manim Community Animation Scene: Mathematical Functions & Activation Functions.
Visualizes Linear, Quadratic, ReLU, Sigmoid, and Tanh transformations.
Designed for AI Atlas Interactive Learning Platform.
"""

from manim import *
import numpy as np

# Configure dark navy background matching AI Atlas design system
config.background_color = "#090d16"
config.frame_width = 16
config.frame_height = 9

class FunctionsScene(Scene):
    def construct(self):
        # 1. Title Banner
        title = Text("Matematik Funksiyalar va Aktivatsiya", font_size=36, color=BLUE_B)
        title.to_edge(UP, buff=0.4)
        subtitle = Text("AI va Neyron Tarmoqlarning Matematik Poydevori", font_size=20, color=GRAY_B)
        subtitle.next_to(title, DOWN, buff=0.15)

        self.play(FadeIn(title, shift=UP*0.3), FadeIn(subtitle, shift=UP*0.2), run_time=1)
        self.wait(0.5)

        # 2. Coordinate System
        axes = Axes(
            x_range=[-5, 5, 1],
            y_range=[-3, 5, 1],
            x_length=9,
            y_length=5.5,
            axis_config={"color": GRAY_C, "stroke_width": 2},
            tips=True,
        ).shift(DOWN * 0.4)

        axes_labels = axes.get_axis_labels(
            x_label=Text("x", font_size=20, color=GRAY_A),
            y_label=Text("y", font_size=20, color=GRAY_A)
        )

        self.play(Create(axes), Write(axes_labels), FadeOut(subtitle), run_time=1.2)

        # 3. Linear Function: y = ax + b
        func_tag = Text("1. Chiziqli Funksiya: y = ax + b", font_size=24, color=YELLOW_B)
        func_tag.to_corner(UL, buff=0.6)

        linear_graph = axes.plot(lambda x: 0.8 * x + 0.5, color=TEAL_C, stroke_width=4)
        linear_label = Text("y = 0.8x + 0.5", font_size=18, color=TEAL_C)
        linear_label.next_to(axes.c2p(2, 0.8 * 2 + 0.5), UP, buff=0.2)

        self.play(FadeIn(func_tag, shift=DOWN*0.2), Create(linear_graph), Write(linear_label), run_time=1.2)
        self.wait(0.6)

        # Transform Linear -> Quadratic
        quad_tag = Text("2. Kvadratik Funksiya: y = x^2 - 2x + 1", font_size=24, color=YELLOW_B)
        quad_tag.to_corner(UL, buff=0.6)

        quad_graph = axes.plot(lambda x: (x - 1)**2, x_range=[-1.2, 3.2], color=PURPLE_B, stroke_width=4)
        quad_label = Text("y = (x - 1)^2 (Minimum: x=1)", font_size=18, color=PURPLE_B)
        quad_label.next_to(axes.c2p(1, 0), DOWN, buff=0.3)

        min_dot = Dot(axes.c2p(1, 0), color=YELLOW, radius=0.08)

        self.play(
            Transform(func_tag, quad_tag),
            Transform(linear_graph, quad_graph),
            Transform(linear_label, quad_label),
            FadeIn(min_dot),
            run_time=1.5
        )
        self.wait(0.8)

        # 4. Activation Function: Sigmoid
        sig_tag = Text("3. Sigmoid Aktivatsiyasi: σ(x) = 1 / (1 + e^-x)", font_size=24, color=YELLOW_B)
        sig_tag.to_corner(UL, buff=0.6)

        sig_graph = axes.plot(lambda x: 1.0 / (1.0 + np.exp(-x)), x_range=[-5, 5], color=BLUE_C, stroke_width=4)
        sig_label = Text("σ(x) ∈ (0, 1) Ehtimollik akslantirishi", font_size=18, color=BLUE_C)
        sig_label.next_to(axes.c2p(1, 0.8), UP, buff=0.2)

        # Asymptote guides
        upper_line = DashedLine(axes.c2p(-5, 1), axes.c2p(5, 1), color=GRAY_D, stroke_width=1.5)
        lower_line = DashedLine(axes.c2p(-5, 0), axes.c2p(5, 0), color=GRAY_D, stroke_width=1.5)

        self.play(
            Transform(func_tag, sig_tag),
            Transform(linear_graph, sig_graph),
            Transform(linear_label, sig_label),
            FadeOut(min_dot),
            Create(upper_line),
            Create(lower_line),
            run_time=1.5
        )
        self.wait(0.8)

        # 5. Activation Function: ReLU
        relu_tag = Text("4. ReLU: f(x) = max(0, x)", font_size=24, color=YELLOW_B)
        relu_tag.to_corner(UL, buff=0.6)

        relu_graph = axes.plot(lambda x: max(0.0, x), x_range=[-5, 4.5], color=GREEN_C, stroke_width=4)
        relu_label = Text("f(x) = max(0, x) (Siyrak aktivatsiya)", font_size=18, color=GREEN_C)
        relu_label.next_to(axes.c2p(2, 2), UP + LEFT, buff=0.2)

        self.play(
            Transform(func_tag, relu_tag),
            Transform(linear_graph, relu_graph),
            Transform(linear_label, relu_label),
            FadeOut(upper_line),
            FadeOut(lower_line),
            run_time=1.5
        )
        self.wait(0.8)

        # 6. Activation Function: Tanh
        tanh_tag = Text("5. Tanh: f(x) = tanh(x) ∈ (-1, 1)", font_size=24, color=YELLOW_B)
        tanh_tag.to_corner(UL, buff=0.6)

        tanh_graph = axes.plot(lambda x: np.tanh(x), x_range=[-5, 5], color=RED_C, stroke_width=4)
        tanh_label = Text("Zero-centered simmetrik aktivatsiya", font_size=18, color=RED_C)
        tanh_label.next_to(axes.c2p(1, 0.8), UP, buff=0.2)

        self.play(
            Transform(func_tag, tanh_tag),
            Transform(linear_graph, tanh_graph),
            Transform(linear_label, tanh_label),
            run_time=1.5
        )
        self.wait(1.0)

        # Final Summary
        summary = Text("Har bir funksiyani quyidagi interaktiv simulyatorda sinab ko'ring!", font_size=22, color=YELLOW_A)
        summary.next_to(axes, DOWN, buff=0.2)
        self.play(FadeIn(summary, shift=UP*0.2), run_time=1)
        self.wait(1.5)
