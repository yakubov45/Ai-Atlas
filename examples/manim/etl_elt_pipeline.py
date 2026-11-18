from manim import *


class EtlVsEltPipelineScene(Scene):
    def construct(self):
        self.camera.background_color = "#090D16"

        title = Text("ETL vs ELT — Order Pipeline (de-11-08)", font_size=28, color=WHITE).to_edge(UP)
        subtitle = Text(
            "Raw: 5  |  Valid: 4  |  Quarantine: 1 (e-004 'oops')  |  Clean Orders: 3  |  Total: 235.00",
            font_size=18,
            color="#38BDF8",
        ).next_to(title, DOWN, buff=0.2)
        self.play(Write(title), FadeIn(subtitle))

        stages = ["Extract (5)", "Staging / Validate", "Quarantine (1)", "Clean Upsert (3)"]
        boxes = VGroup()
        for name in stages:
            rect = RoundedRectangle(
                width=2.8,
                height=1.15,
                corner_radius=0.15,
                stroke_color="#22D3EE",
                fill_color="#0F172A",
                fill_opacity=0.9,
            )
            label = Text(name, font_size=18, color=WHITE).move_to(rect.get_center())
            boxes.add(VGroup(rect, label))

        boxes.arrange(RIGHT, buff=0.45).move_to(UP * 0.4)
        self.play(FadeIn(boxes))

        arrows = VGroup(
            *[
                Arrow(boxes[i].get_right(), boxes[i + 1].get_left(), buff=0.08, color="#94A3B8")
                for i in range(len(boxes) - 1)
            ]
        )
        self.play(Create(arrows))

        summary = VGroup(
            Text("Order 101: 120.00 -> 135.00 (e-003 Last-Write-Wins)", font_size=20, color="#A7F3D0"),
            Text("Order 102: 80.00 (e-002)  |  Order 104: 20.00 (e-005)", font_size=20, color="#E2E8F0"),
            Text("Order 103: 'oops' -> QUARANTINED (reason='invalid_amount')", font_size=20, color="#FCA5A5"),
            Text("Idempotent Replay Total Revenue = 235.00", font_size=22, color="#FDE047"),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.18).to_edge(DOWN, buff=0.45)

        self.play(FadeIn(summary))
        self.wait(1.5)
