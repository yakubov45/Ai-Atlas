from manim import *


class SamplingExplainedScene(Scene):
    def construct(self):
        self.camera.background_color = "#090D16"

        title = Text("Temperature, Top-K & Top-P Sampling (pe-06-06 / pe-07-04)", font_size=26, color=WHITE).to_edge(UP)
        subtitle = Text(
            "Synthetic Logits: Python=2.4, matematika=1.4, LLM=0.6, fizika=-0.2",
            font_size=18,
            color="#38BDF8",
        ).next_to(title, DOWN, buff=0.18)
        self.play(Write(title), FadeIn(subtitle))

        tokens = [
            ("Python", 0.6221, "#22D3EE"),
            ("matematika", 0.2289, "#A78BFA"),
            ("LLM", 0.1028, "#34D399"),
            ("fizika", 0.0462, "#FBBF24"),
        ]

        bars = VGroup()
        for name, prob, col in tokens:
            bar = Rectangle(
                width=prob * 7.0,
                height=0.45,
                fill_color=col,
                fill_opacity=0.88,
                stroke_color=WHITE,
                stroke_width=1,
            )
            lbl = Text(f"{name}: {prob * 100:.2f}%", font_size=18, color=WHITE).next_to(bar, RIGHT, buff=0.2)
            row = VGroup(bar, lbl)
            bars.add(row)

        bars.arrange(DOWN, aligned_edge=LEFT, buff=0.28).move_to(LEFT * 1.0 + UP * 0.1)
        self.play(FadeIn(bars))

        pipeline_note = Text(
            "Pipeline: softmax(T=1.0) -> Top-K(4) -> renormalize -> Top-P(1.0) -> sample",
            font_size=18,
            color="#FDE047",
        ).to_edge(DOWN, buff=0.45)
        self.play(FadeIn(pipeline_note))
        self.wait(1.5)
