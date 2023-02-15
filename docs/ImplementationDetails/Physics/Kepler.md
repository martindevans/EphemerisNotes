In [orbital mechanics](https://en.wikipedia.org/wiki/Orbital_mechanics "Orbital mechanics"), [Kepler's equation](https://en.wikipedia.org/wiki/Kepler%27s_equation) relates various geometric properties of the orbit of a body subject to a [central force](https://en.wikipedia.org/wiki/Central_force "Central force"). This can be used to calculate the position of a body (relative to the central body) at any time, without having to iteratively integrate acceleration and velocity over time.

In Ephemeris all gravity sources (planets, moon etc) are kept to Kepler orbits, only free floating items (spaceships, satellites, missiles etc) are plotted step-by-step.

## Orbital Elements

A keplerian orbit is defined by six **[Orbital Elements](https://en.wikipedia.org/wiki/Orbital_elements)**:
 - $e$ = [Eccentricity](https://en.wikipedia.org/wiki/Eccentricity_(mathematics))
 - $a$ = [Semi Major Axis](https://en.wikipedia.org/wiki/Semi-major_axis)
 - $i$ = [Inclination](https://en.wikipedia.org/wiki/Inclination)
 - $Ω$ = [Longitude of the Ascending Node](https://en.wikipedia.org/wiki/Longitude_of_the_ascending_node)
 - $ω$ = [Argument of periapsis](https://en.wikipedia.org/wiki/Argument_of_periapsis)
 - $M_0$ = Mean Anomaly At Epoch

## Calculating Position (Overview)

To calculate position the process is:
1. Choose a **time** since epoch.
2. Calculate **Mean Anomaly** at this time.
3. Calculate **Eccentric anomaly** from **Mean anomaly**.
4. Calculate Position (X/Y) from **Eccentric Anomaly**.
5. Tilt X/Y Position into orbital plane.

## Choose A Time

The **True Anomaly** element defines the position of the body along the orbit at an arbitrary time, called the "epoch". To calculate a position a time, relative to the epoch, must be chosen.

## Calculate Mean Anomaly

The mean anomaly is a measure of how far along the orbit the body is at a particular time. Since the body completes a full orbit every $orbital\_period$ (by definition) then the **Average Angular Velocity** ($n$) is:

$$n = \frac{360\degree}{orbital\_period}$$

The **Mean Anomaly** is simply:

$$M = M_0 + n * time\_since\_epoch$$

## Calculate Eccentric Anomaly

**Mean Anomaly** is related to **Eccentric Anomaly**:

$$M = E - e \sin E$$

However, there is no closed form solution to this equation. Instead an iterative solution such as [Newton's Method](https://en.wikipedia.org/wiki/Newton%27s_method) to refine an initial guess.

$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$

In our case:

$$f(E) = E - e * sin(E) - M$$

$$f'(E) = 1 - e * cos(E)$$

Implementing this in code:
```python
## Calculate Eccentric anomaly from M (Mean Anomaly) and (e) eccentricity
def solve_kepler(M, e):
	f = lambda E: E - e * sin(E) - M
	E = initial_guess(M, e) # Make an initial guess
	delta = 10000

	while (delta > 0.001): # exit once refinement process isn't doing much
		e1 = E - f(E) / (1 - e * cos(E)) # refine the guess
		delta = abs(e1 - E) # calculate how much the guess has improved
		E = e1
		
	return E
```

Now we just need an initial guess. The simplest option is simply to use the mean anomaly ($M$) as the initial guess.

For the original source of this code and also a better initial approximation, see this [blog post](https://www.johndcook.com/blog/2022/11/01/kepler-newton/).

## Calculate Position

Finally **Eccentric Anomaly** can be used to calculate position:

$$x = a * (cos(E) - e)$$

$$y=b*sin(E)$$

## Orbital Plane
We now have the position in 2D, on the orbital plane. This simply needs to be tilted into the orbital plane to achieve a 3D position:

```clike
_quaternion = Quaternion.AngleAxis(LongitudeOfAscendingNode, float3(0, 0, 1))
	        * Quaternion.AngleAxis(Inclination, float3(0, 1, 0))
	        * Quaternion.AngleAxis(ArgumentOfPeriapsis, float3(0, 0, 1));

var pos3 = _quaternion * new Vector3(x, y, 0);
```

This is where the final orbital parameters are used, they define a plane which tilts the $x$,$y$ position into 3d.