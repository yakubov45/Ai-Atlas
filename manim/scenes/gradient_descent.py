"""
Manim Community Animation Scene: Gradient Descent Optimization.
Visualizes Loss Parabola L(x) = (x - 3)^2, tangent slope, update steps,
and convergence to global minimum x = 3.0.
Designed for AI Atlas Interactive Learning Platform.
"""

from manim import *
import numpy as np

config.background_color = "#090d16"
config.frame_width = 16
config.frame_height = 9

class GradientDescentScene(Scene):
    def construct(self):
        # 1. Header
        title = Text("Gradient Tushish Algoritmi (Gradient Descent)", font_size=34, color=BLUE_B)
        title.to_edge(UP, buff=0.4)
        formula = Text("Yo'qotish funksiyasi: L(x) = (x - 3)^2  |  Hosilasi: L'(x) = 2(x - 3)", font_size=20, color=GRAY_B)
        formula.next_to(title, DOWN, buff=0.15)

        self.play(FadeIn(title, shift=UP*0.3), FadeIn(formula, shift=UP*0.2), run_time=1)
        self.wait(0.5)

        # 2. Coordinate Axes
        axes = Axes(
            x_range=[0, 8, 1],
            y_range=[0, 20, 4],
            x_length=9,
            y_length=5.2,
            axis_config={"color": GRAY_C, "stroke_width": 2},
            tips=True,
        ).shift(DOWN * 0.4 + LEFT * 1.5)

        axes_labels = axes.get_axis_labels(
            x_label=Text("Parametr x", font_size=18, color=GRAY_A),
            y_label=Text("Loss L(x)", font_size=18, color=GRAY_A)
        )

        loss_curve = axes.plot(lambda x: (x - 3)**2, x_range=[0.5, 7.2], color=PURPLE_B, stroke_width=4)
        min_point = Dot(axes.c2p(3, 0), color=GREEN, radius=0.09)
        min_label = Text("Minimum: x = 3.0, L = 0", font_size=16, color=GREEN)
        min_label.next_to(min_point, DOWN, buff=0.25)

        self.play(Create(axes), Write(axes_labels), Create(loss_curve), FadeIn(min_point), Write(min_label), run_time=1.5)

        # 3. Telemetry Sidebar Card
        card_box = RoundedRectangle(corner_radius=0.15, width=4.6, height=5.2, color=BLUE_E, fill_color="#0f172a", fill_opacity=0.85)
        card_box.to_corner(UR, buff=0.6).shift(DOWN * 0.4)

        card_title = Text("Optimizatsiya Holati", font_size=20, color=BLUE_B).move_to(card_box.get_top() + DOWN * 0.4)
        rule_text = Text("Qoida: x_{t+1} = x_t - α · L'(x_t)", font_size=15, color=YELLOW_B).next_to(card_title, DOWN, buff=0.25)
        lr_text = Text("O'rganish tezligi: α = 0.25", font_size=15, color=GRAY_A).next_to(rule_text, DOWN, buff=0.2)

        self.play(FadeIn(card_box), Write(card_title), Write(rule_text), Write(lr_text), run_time=1)

        # 4. Starting Point at x_0 = 7.0
        x_val = 7.0
        loss_val = (x_val - 3)**2
        grad_val = 2 * (x_val - 3)

        curr_dot = Dot(axes.c2p(x_val, loss_val), color=YELLOW, radius=0.1)
        dot_label = Text(f"x_0 = {x_val:.1f}", font_size=16, color=YELLOW).next_to(curr_dot, RIGHT, buff=0.15)

        stat_iter = Text("Iteratsiya: 0", font_size=16, color=GRAY_A).next_to(lr_text, DOWN, buff=0.35)
        stat_x = Text(f"Parametr x: {x_val:.2f}", font_size=16, color=YELLOW_B).next_to(stat_iter, DOWN, buff=0.18)
        stat_loss = Text(f"Loss L(x): {loss_val:.2f}", font_size=16, color=RED_C).next_to(stat_x, DOWN, buff=0.18)
        stat_grad = Text(f"Gradient: {grad_val:.2f}", font_size=16, color=TEAL_C).next_to(stat_loss, DOWN, buff=0.18)

        self.play(
            FadeIn(curr_dot),
            Write(dot_label),
            FadeIn(stat_iter),
            FadeIn(stat_x),
            FadeIn(stat_loss),
            FadeIn(stat_grad),
            run_time=1
        )
        self.wait(0.8)

        # Step 1 Update
        alpha = 0.25
        steps = [
            (5.0, 1),
            (4.0, 2),
            (3.5, 3),
            (3.25, 4),
            (3.05, 5),
            (3.0, 6)
        ]

        past_dots = VGroup()

        for next_x, it in steps:
            next_loss = (next_x - 3)**2
            next_grad = 2 * (next_x - 3)

            # Leave small trail dot
            trail = Dot(axes.c2p(x_val, loss_val), color=GRAY_B, radius=0.05)
            past_dots.add(trail)

            new_stat_iter = Text(f"Iteratsiya: {it}", font_size=16, color=GRAY_A).move_to(stat_iter)
            new_stat_x = Text(f"Parametr x: {next_x:.2f}", font_size=16, color=YELLOW_B).move_to(stat_x)
            new_stat_loss = Text(f"Loss L(x): {next_loss:.2f}", font_size=16, color=RED_C).move_to(stat_loss)
            new_stat_grad = Text(f"Gradient: {next_grad:.2f}", font_size=16, color=TEAL_C).move_to(stat_grad)
            new_dot_label = Text(f"x_{it} = {next_x:.2f}", font_size=16, color=YELLOW).next_to(axes.c2p(next_x, next_loss), UP+RIGHT, buff=0.1)

            # Move along curve
            self.play(
                curr_dot.animate.move_to(axes.c2p(next_x, next_loss)),
                Transform(dot_label, new_dot_label),
                Transform(stat_iter, new_stat_iter),
                Transform(stat_x, new_stat_x),
                Transform(stat_loss, new_stat_loss),
                Transform(stat_grad, new_stat_grad),
                FadeIn(trail),
                run_time=0.8
            )
            x_val = next_x
            loss_val = next_loss
            grad_val = next_grad

        # Convergence celebration
        conv_banner = Text("✓ Global Minimumga Yaqinlashdi!", font_size=18, color=GREEN_B)
        conv_banner.next_to(stat_grad, DOWN, buff=0.3)
        self.play(FadeIn(conv_banner, shift=UP*0.2), Flash(min_point, color=GREEN, flash_radius=0.4), run_time=1)
        self.wait(1.5)
