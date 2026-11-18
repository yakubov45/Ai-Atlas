"""
Manim Community Edition Scene for Data Scientist Deep-Dive Track:
A/B Testing & CUPED Pre-Experiment Covariate Adjustment (`examples/manim/ab_experiment.py`).

Illustrates the synthetic 8-observation dataset from `Data_Scientist_Micro_Lesson_AB_CUPED.md`:
Control: (1,3), (2,4), (3,7), (4,8)
Treatment: (3,8), (4,9), (5,12), (6,13)
Y_adjusted = Y - theta * (X - mean(X)), where mean(X) = 3.5 and theta = 19/9 ≈ 2.111.
"""

from manim import (
    Scene,
    Axes,
    Dot,
    Line,
    Text,
    VGroup,
    BLUE_C,
    TEAL_C,
    YELLOW_C,
    GRAY_B,
    WHITE,
    UP,
    DOWN,
    RIGHT,
    Create,
    FadeIn,
    Transform,
)


class AbCupedExperimentScene(Scene):
    def construct(self) -> None:
        title = Text(
            "A/B Test & CUPED: Y_adj = Y - theta * (X - X_bar)",
            font_size=26,
            color=WHITE,
        ).to_edge(UP)
        subtitle = Text(
            "Synthetic 8-Observation Example (X_bar = 3.500, theta = 2.111)",
            font_size=18,
            color=GRAY_B,
        ).next_to(title, DOWN, buff=0.15)

        axes = Axes(
            x_range=[0, 7, 1],
            y_range=[0, 15, 3],
            x_length=7.5,
            y_length=4.5,
            tips=False,
        ).shift(DOWN * 0.45)

        control_pts = [(1, 3), (2, 4), (3, 7), (4, 8)]
        treatment_pts = [(3, 8), (4, 9), (5, 12), (6, 13)]
        theta = 38.0 / 18.0
        x_bar = 3.5

        raw_dots = VGroup()
        adj_dots = VGroup()

        for x, y in control_pts:
            raw_dots.add(Dot(axes.c2p(x, y), color=BLUE_C, radius=0.09))
            y_adj = y - theta * (x - x_bar)
            adj_dots.add(Dot(axes.c2p(x, y_adj), color=BLUE_C, radius=0.09))

        for x, y in treatment_pts:
            raw_dots.add(Dot(axes.c2p(x, y), color=TEAL_C, radius=0.09))
            y_adj = y - theta * (x - x_bar)
            adj_dots.add(Dot(axes.c2p(x, y_adj), color=TEAL_C, radius=0.09))

        mean_line = Line(
            axes.c2p(x_bar, 0),
            axes.c2p(x_bar, 14.5),
            color=YELLOW_C,
            stroke_width=2,
        )

        self.play(FadeIn(title), FadeIn(subtitle))
        self.play(Create(axes), Create(mean_line))
        self.play(FadeIn(raw_dots))
        self.wait(0.8)
        self.play(Transform(raw_dots, adj_dots), run_time=1.8)
        self.wait(1.0)
