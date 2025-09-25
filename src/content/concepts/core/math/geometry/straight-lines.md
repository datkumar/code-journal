---
title: Straight Lines (2D)
tags: [math, geometry]
---

**List of Contents**:

- [Distance between two points](#distance-between-two-points)
- [Slope of a Line](#slope-of-a-line)
- [Angle between two lines](#angle-between-two-lines)
- [Equation of a Line](#equation-of-a-line)
  - [Point Slope form](#point-slope-form)
  - [Two-Point Slope form](#two-point-slope-form)
  - [Slope-Intercept and Intercept forms](#slope-intercept-and-intercept-forms)
  - [Normal Form](#normal-form)

## Distance between two points

![Distance between two points](/code-journal/diagrams/line-dist-2pts.svg)

From above figure you can see the right triangle formed where if we apply Pythogas theorem

$$
d(AB)^2 = (x_2 - x_1)^2  + (y_2-y_1)^2
$$

Thus, the distance between two points $A(x_1,y_1)$ and $B(x_2, y_2)$ on a line is given as:

$$
\boxed{
d(AB) = \sqrt{(x_2 - x_1)^2  + (y_2-y_1)^2 }
}
$$

## Slope of a Line

Consider a line $L$ that is at an angle $\theta$ (**anticlockwise**) over the $\text{X-axis}$. Let $P(x,y)$ be any point on the line $L$. Let $A(x_1,y_1)$ and $B(x_2,y_2)$ be any two points on the same line $L$ that might be given

![Slope of a Straight Line](/code-journal/diagrams/line-slope.svg)

Then,

**Slope** of line $L$, denoted by $m$ is given by:

$$
m =  \frac{y_2-y_1}{x_2-x_1} = \frac{y-y_1}{x-x_1}
$$

Consider the two cases where the line has an acute or an obtuse angle theta with the $\text{X-axis}$

![Generic Straight Line](/code-journal/diagrams/line-slope-2pt-variants.svg)

From the first case where angle $\theta$ is acute (left part of image), it is clear that the slope:

$$m =  \frac{y_2-y_1}{x_2-x_1} = \tan(\theta)$$

In the second case where angle $\theta$ is obtuse (right part of image), let it's complementary angle be $\alpha$. We can see that $\alpha$ is acute and $(\alpha = \pi - \theta )$. We can see:

$$
\tan(\alpha) = \dfrac{y_2 - y_1}{x_1 - x_2} = -\left( \dfrac{y_2 - y_1}{x_2 - x_1} \right)
$$

We know, $\tan(\pi - x) = -\tan(x)$ and so:

$$
\tan(\theta) = -\tan(\alpha) = \frac{y_2-y_1}{x_2-x_1}
$$

In general, we can write, the slope of a line as:

$$
\boxed{
m = \frac{\Delta y}{\Delta x} =  \tan(\theta)
}
$$

## Angle between two lines

![Angle between two lines](/code-journal/diagrams/line-angle-between-two-lines.svg)

As shown in above figure, consider two lines $L_1$ and $L_2$ inclined at angles $\theta_1$ and $\theta_2$ (anticlockwise) with the $\text{X-axis}$ respectively. Let $\alpha$ be the angle between $L_1$ and $L_2$ . So their slopes would be $m_1 = \tan(\theta_1)$ and $m_2 = \tan(\theta_2)$ respectively. The angle $\alpha$ between $L_1$ and $L_2$ is calculated as:

$$
\theta_2  = \alpha + \theta_1
$$

$$
\therefore \space
\alpha = \theta_2  - \theta_1
$$

$$
\therefore \space
\tan(\alpha) = \left| \dfrac{\tan(\theta_2) - \tan(\theta_1)}{1 + \tan(\theta_1) \cdot \tan(\theta_2)} \right|
$$

$$
\boxed{
\tan(\alpha) = \left| \dfrac{m_2 - m_1}{1 + m_1 \cdot m_2} \right|
}
$$

The $\tan(\alpha)$ value can be positive or negative depending on the order of the slopes $m_1$, $m_2$, but the angle $\alpha$ itself should always be positive and between $0\degree$ and $180\degree$. The modulus ensures you’re taking the smallest positive angle between the lines.

**Some notable cases** (as shown in below figure):

![Parallel and Perpendicular lines](/code-journal/diagrams/line-angle-parallel-perpendicular.svg)

**Perpendicular Lines**:

$$
\alpha = 90 \degree \implies \tan(\alpha) = \left| \dfrac{m_2 - m_1}{1 + m_1 \cdot m_2} \right| = \infty
$$

$$
\therefore \space
1 + m_1 \cdot m_2 = 0
$$

$$
\therefore \space \boxed {
m_1 \cdot m_2 = (-1)
}
$$

**Parallel Lines**:

$$
\theta_1 = \theta_2 \implies \boxed{m_1 = m_2} \implies \alpha = 0\degree
$$

---

## Equation of a Line

Consider a line $L$ having a slope of $m$. Let $(x,y)$ be any point lying on $L$. Let $(x_1,y_1)$ and $(x_2,y_2)$ be any two points on the same line $L$ that might be given to us. There are various forms for representing equation of a line as mentioned below:

### Point Slope form

The slope of line $m$ obeys for given point $(x_1,y_1)$ and any point $(x,y)$ on the line that:

$$
m = \dfrac{y - y_1}{x - x_1}
$$

$$
\therefore \space \boxed {
(y - y_1) = m \cdot (x - x_1)
}
$$

### Two-Point Slope form

If we knew two points $(x_1,y_1)$ and $(x_2,y_2)$ present on the line, then for any point $(x,y)$ on the line:

$$
m = \dfrac{y_2 - y_1}{x_2 - x_1}
$$

Substituting this $m$ expression in first equation form of line:

$$
\boxed {
(y - y_1) = \left( \dfrac{y_2 - y_1}{x_2 - x_1} \right) \cdot (x - x_1)
}
$$

### Slope-Intercept and Intercept forms

<img alt="Intercepts of a Line" height="350px" src="/code-journal/diagrams/line-intercepts.svg">

As shown in above figure, let a line $L$ intersect the $\text{Y-axis}$ at $(0,c)$ and the $\text{X-axis}$ at $(d,0)$. Then, $c$ and $d$ are called the $\text{Y-intercept}$ and $\text{X-intercept}$ of $L$ respectively. From before, we had:

$$
(y - y_1) = m \cdot (x - x_1)
$$

Substituting $(x_1,y_1)$ as $(0,c)$ we get:

$$
(y - c) = m (x - 0)
$$

$$
\therefore \space \boxed{
y = mx + c
}
$$

If we instead substitute $(x_1,y_1)$ as $(d,0)$ we get:

$$
(y - 0)  = m (x - d)
$$

$$
\therefore \space \boxed{
y = m(x - d)
}
$$

Above two forms are known as the **slope-intercept forms** as they involve slope $m$ and either of the intercepts $c$ or $d$. Note that we also had:

$$
(y - y_1) = \left( \dfrac{y_2 - y_1}{x_2 - x_1} \right) \cdot (x - x_1)
$$

Substituting $(x_1,y_1)$ as $(0,c)$ and $(x_2,y_2)$ as $(d,0)$ we get:

$$
\therefore \space
(y - c) = \left( \dfrac{0-c}{d - 0} \right) \cdot (x - 0)
$$

$$
\therefore \space
(y - c) = \left( \dfrac{-cx}{d} \right)
$$

On simplifying:

$$
cx + yd = cd
$$

Dividing by $cd$:

$$
\boxed {
\dfrac{x}{d} \space + \space \dfrac{y}{c} = 1
}
$$

This is known as the **intercept form** for equation of a line as it involves just the $c$ and $d$ intercepts

### Normal Form

As shown in below figure, for a line $L$, draw a normal from origin $O$ on $L$ that intersects $L$ at a point $A(x_1,y_1)$. Let $p$ be the length of the normal $OA$ on line $L$. Let $\beta$ be the anticlockwise angle made by the normal $OA$ with the $\text{X-axis}$

![Normal drawn to a Line](/code-journal/diagrams/line-normal-form.svg)

We can deduce that:

$$
A(x_1, y_1) = \left( p\cos\beta, \space p\sin\beta \right)
$$

Slope of the normal $OA$ considering the two-point slope form is (points are $O$ and $A$)

$$
m_{OA} = \dfrac{(p \sin \beta - 0)}{(p \cos \beta - 0)} = \tan \beta
$$

Since line $L$ is perpendicular to $OA$, the product of their slopes is $-1$

$$
\therefore \space
m_L = \dfrac{-1}{m_{OA}} =  \dfrac{-1}{\tan \beta} = \dfrac{-\cos \beta}{\sin \beta}
$$

Since point $(x_1,y_1)$ lies on line $L$, the equation of line $L$ is:

$$
(y - y_1) = (m_L)(x - x_1)
$$

$$
\therefore \space
( y -  p\sin\beta ) = \left( \dfrac{-\cos \beta}{\sin \beta} \right) \cdot (x - p\cos \beta)
$$

$$
\therefore \space
y\sin\beta -  p\sin^2\beta  = -x\cos\beta + p\cos^2\beta
$$

$$
\therefore \space
y\sin\beta + x\cos\beta =  p( \sin^2\beta + \cos^2\beta )
$$

$$
\therefore \space \boxed{
y\sin\beta + x\cos\beta = p
}
$$
