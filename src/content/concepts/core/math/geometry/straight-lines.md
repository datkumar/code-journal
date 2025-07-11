---
title: Straight Lines
tags: [math, geometry]
---

Consider a line $L$ that is at an angle $\theta$ (**anticlockwise**) over the **X-axis**. Let $P(x,y)$ be any point on the line $L$. Let $A(x_1,y_1)$ and $B(x_2,y_2)$ be any two points on the same line $L$ that might be given

![Generic Straight Line](/code-journal/diagrams/straight-line.svg)

Then,

**Slope** of line $L$, denoted by $m$ is given by:

$$
m =  \frac{y_2-y_1}{x_2-x_1} = \frac{y-y_1}{x-x_1}
$$

Consider the two cases where the line has an acute or an obtuse angle theta with the X-axis

![Generic Straight Line](/code-journal/diagrams/straight-line-2pts-variants.svg)

From the first case where angle $\theta$ is acute (left part of image), it is clear that the slope:

$$m =  \frac{y_2-y_1}{x_2-x_1} = tan(\theta)$$

In the second case where angle $\theta$ is obtuse (right part of image), let it's complementary angle be $\alpha$. We can see that $\alpha$ is acute and $(\alpha = \pi - \theta )$. We can see:

$$
\tan(\alpha) = \dfrac{y_2 - y_1}{x_1 - x_2} = -\left( \dfrac{y_2 - y_1}{x_2 - x_1} \right)
$$

We know, $tan(\pi - x) = -tan(x)$ and so:

$$
tan(\theta) = -tan(\alpha) = \frac{y_2-y_1}{x_2-x_1}
$$

In general, we can write, the slope of a line as:

$$
\boxed{
m = \frac{\Delta y}{\Delta x} =  tan(\theta)
}
$$
