"""
Manim Community Animation Scene: Feedforward Neural Network Forward Pass.
Visualizes Input -> Hidden -> Output layer propagation, weighted sums z = W·x + b,
activation functions a = f(z), and final output calculation.
Designed for AI Atlas Interactive Learning Platform.
"""

from manim import *

config.background_color = "#090d16"
config.frame_width = 16
config.frame_height = 9

class NeuralNetworkScene(Scene):
    def construct(self):
        # 1. Header
        title = Text("Neyron Tarmoq: To'g'ri Tarqalish (Forward Pass)", font_size=34, color=BLUE_B)
        title.to_edge(UP, buff=0.4)
        subtitle = Text("Signalning kirish qatlamidan yashirin qatlam orqali chiqishga harakati", font_size=18, color=GRAY_B)
        subtitle.next_to(title, DOWN, buff=0.15)

        self.play(FadeIn(title, shift=UP*0.3), FadeIn(subtitle, shift=UP*0.2), run_time=1)
        self.wait(0.5)

        # 2. Layer Positions
        # Input: 2 nodes at x = -4.5
        # Hidden: 3 nodes at x = 0
        # Output: 1 node at x = 4.5
        input_coords = [np.array([-4.5, 1.2, 0]), np.array([-4.5, -1.2, 0])]
        hidden_coords = [np.array([0, 1.8, 0]), np.array([0, 0, 0]), np.array([0, -1.8, 0])]
        output_coords = [np.array([4.5, 0, 0])]

        # Layer Labels
        in_lbl = Text("Kirish Qatlami", font_size=18, color=TEAL_B).next_to(input_coords[0], UP, buff=0.8)
        hid_lbl = Text("Yashirin Qatlam (ReLU)", font_size=18, color=PURPLE_B).next_to(hidden_coords[0], UP, buff=0.8)
        out_lbl = Text("Chiqish Qatlami (Sigmoid)", font_size=18, color=GREEN_B).next_to(output_coords[0], UP, buff=1.2)

        # Draw Connections
        w1_lines = []
        for p1 in input_coords:
            for p2 in hidden_coords:
                line = Line(p1, p2, color=BLUE_E, stroke_width=2.5, stroke_opacity=0.6)
                w1_lines.append(line)

        w2_lines = []
        for p1 in hidden_coords:
            for p2 in output_coords:
                line = Line(p1, p2, color=PURPLE_E, stroke_width=3, stroke_opacity=0.7)
                w2_lines.append(line)

        lines_group = VGroup(*w1_lines, *w2_lines)

        # Draw Neurons
        in_nodes = VGroup(*[Circle(radius=0.45, color=TEAL, fill_color="#0d233a", fill_opacity=0.9).move_to(p) for p in input_coords])
        in_text1 = Text("x₁", font_size=20, color=WHITE).move_to(input_coords[0])
        in_text2 = Text("x₂", font_size=20, color=WHITE).move_to(input_coords[1])

        hid_nodes = VGroup(*[Circle(radius=0.45, color=PURPLE, fill_color="#271142", fill_opacity=0.9).move_to(p) for p in hidden_coords])
        h_text1 = Text("h₁", font_size=20, color=WHITE).move_to(hidden_coords[0])
        h_text2 = Text("h₂", font_size=20, color=WHITE).move_to(hidden_coords[1])
        h_text3 = Text("h₃", font_size=20, color=WHITE).move_to(hidden_coords[2])

        out_node = Circle(radius=0.5, color=GREEN, fill_color="#0a2a1a", fill_opacity=0.9).move_to(output_coords[0])
        out_text = Text("ŷ", font_size=24, color=WHITE).move_to(output_coords[0])

        self.play(
            FadeIn(in_lbl), FadeIn(hid_lbl), FadeIn(out_lbl),
            Create(lines_group),
            FadeIn(in_nodes), Write(in_text1), Write(in_text2),
            FadeIn(hid_nodes), Write(h_text1), Write(h_text2), Write(h_text3),
            FadeIn(out_node), Write(out_text),
            run_time=1.8
        )
        self.wait(0.5)

        # 3. Input Value Labels (placed clearly to the left of input node circles)
        val_x1 = Text("x₁ = 1.0", font_size=16, color=YELLOW).next_to(in_nodes[0], LEFT, buff=0.25)
        val_x2 = Text("x₂ = 0.5", font_size=16, color=YELLOW).next_to(in_nodes[1], LEFT, buff=0.25)

        self.play(FadeIn(val_x1), FadeIn(val_x2), Flash(in_nodes[0], color=YELLOW), Flash(in_nodes[1], color=YELLOW), run_time=1)
        self.wait(0.4)

        # 4. Signal Pulse from Inputs to Hidden Layer
        pulses1 = []
        for l in w1_lines:
            dot = Dot(l.get_start(), color=YELLOW_B, radius=0.08)
            pulses1.append(dot)

        pulses1_group = VGroup(*pulses1)
        self.play(
            *[dot.animate.move_to(l.get_end()) for dot, l in zip(pulses1, w1_lines)],
            run_time=1.2,
            rate_func=linear
        )
        self.play(FadeOut(pulses1_group), run_time=0.2)

        # 5. Hidden Layer Activation Calculation HUD & Activation Value Badges
        formula_card = RoundedRectangle(
            corner_radius=0.18,
            width=12.6,
            height=1.2,
            color=PURPLE_E,
            fill_color="#0c1020",
            fill_opacity=0.92
        ).to_edge(DOWN, buff=0.35)

        hid_formula = Text(
            "Yashirin neyron formulasi:   zⱼ = ∑(wⱼᵢ · xᵢ) + bⱼ   →   aⱼ = ReLU(zⱼ)",
            font_size=18,
            color=YELLOW_A
        ).move_to(formula_card.get_center())

        # Badges placed strictly OUTSIDE the node circles (never overlapping h1, h2, h3)
        val_h1 = Text("a₁ = 0.70", font_size=15, color=GREEN_B).next_to(hid_nodes[0], RIGHT, buff=0.3)
        val_h2 = Text("a₂ = 0.00", font_size=15, color=GRAY_B).next_to(hid_nodes[1], RIGHT, buff=0.3)
        val_h3 = Text("a₃ = 1.70", font_size=15, color=GREEN_B).next_to(hid_nodes[2], RIGHT, buff=0.3)

        self.play(
            FadeIn(formula_card),
            FadeIn(hid_formula),
            FadeIn(val_h1), FadeIn(val_h2), FadeIn(val_h3),
            Flash(hid_nodes[0], color=PURPLE_B),
            Flash(hid_nodes[2], color=PURPLE_B),
            run_time=1.2
        )
        self.wait(0.8)

        # 6. Signal Pulse from Hidden to Output
        pulses2 = []
        for l in w2_lines:
            dot = Dot(l.get_start(), color=GREEN_B, radius=0.09)
            pulses2.append(dot)

        pulses2_group = VGroup(*pulses2)
        self.play(
            *[dot.animate.move_to(l.get_end()) for dot, l in zip(pulses2, w2_lines)],
            run_time=1.2,
            rate_func=linear
        )
        self.play(FadeOut(pulses2_group), run_time=0.2)

        # 7. Final Output Activation
        out_formula = Text(
            "Chiqish neyroni formulasi:   z = ∑(wⱼ · aⱼ) + b   →   ŷ = Sigmoid(z) = 0.8306",
            font_size=18,
            color=GREEN_A
        ).move_to(formula_card.get_center())

        final_val = Text("ŷ = 0.8306", font_size=18, color=GREEN_A).next_to(out_node, RIGHT, buff=0.3)

        self.play(
            formula_card.animate.set_color(GREEN_E),
            Transform(hid_formula, out_formula),
            FadeIn(final_val),
            Flash(out_node, color=GREEN, flash_radius=0.6),
            run_time=1.4
        )
        self.wait(1.8)
