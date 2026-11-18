"""
Manim Community Edition Scene for Python Developer Track (Phase 10):
Recursion & Conceptual Call Stack (`factorial(4)` = 24).
Source: `Python_Recursion_Micro_Lesson_Namuna.md`.
"""

from manim import (
    Scene,
    RoundedRectangle,
    Text,
    VGroup,
    BLUE_D,
    TEAL_D,
    GREEN_D,
    WHITE,
    GRAY_B,
    YELLOW_C,
    UP,
    DOWN,
    LEFT,
    RIGHT,
    FadeIn,
    Transform,
)


class FactorialCallStackScene(Scene):
    def construct(self) -> None:
        title = Text(
            "Python Call Stack: factorial(4) -> 24",
            font_size=28,
            color=WHITE,
        ).to_edge(UP)
        subtitle = Text(
            "Konseptual chaqiriq va qaytish ketma-ketligi (Base case: n <= 1)",
            font_size=18,
            color=GRAY_B,
        ).next_to(title, DOWN, buff=0.15)

        self.play(FadeIn(title), FadeIn(subtitle))

        call_labels = [
            "1) factorial(4) -> 4 * factorial(3)",
            "2) factorial(3) -> 3 * factorial(2)",
            "3) factorial(2) -> 2 * factorial(1)",
            "4) factorial(1) -> base case: return 1",
        ]
        return_labels = [
            "8) factorial(4) = 4 * 6 = 24",
            "7) factorial(3) = 3 * 2 = 6",
            "6) factorial(2) = 2 * 1 = 2",
            "5) factorial(1) = 1 (base case)",
        ]

        stack_boxes = VGroup()
        for idx, text_str in enumerate(call_labels):
            box = RoundedRectangle(
                corner_radius=0.15,
                width=7.5,
                height=0.78,
                fill_color=TEAL_D if idx == 3 else BLUE_D,
                fill_opacity=0.35,
                stroke_color=YELLOW_C if idx == 3 else WHITE,
            )
            txt = Text(text_str, font_size=20, color=WHITE).move_to(box.get_center())
            frame = VGroup(box, txt).shift(UP * (1.2 - idx * 0.95))
            stack_boxes.add(frame)

        for frame in stack_boxes:
            self.play(FadeIn(frame, shift=DOWN * 0.2), run_time=0.45)

        self.wait(0.6)

        for idx in range(3, -1, -1):
            ret_box = RoundedRectangle(
                corner_radius=0.15,
                width=7.5,
                height=0.78,
                fill_color=GREEN_D,
                fill_opacity=0.45,
                stroke_color=YELLOW_C,
            )
            ret_txt = Text(return_labels[idx], font_size=20, color=WHITE)
            target_frame = VGroup(ret_box, ret_txt).move_to(stack_boxes[idx].get_center())
            self.play(Transform(stack_boxes[idx], target_frame), run_time=0.5)

        self.wait(1.0)
