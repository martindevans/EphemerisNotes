---
tags:
  - physics
  - article
  - directed_energy_weapons
---
A laser is a monochromatic coherent beam of light.

## Glossary
- **Monochromatic**: a single wavelength
- **Coherent**: All the light waves move precisely together in the same phase, which gives the beam intense power.
- **Beam Waist**: The narrowest point of a laser beam. This isn't necessarily the emitter, the beam might be focused on a far away point.

## Damage Types
- **Dazzling**: Temporarily blinding sensors
- **Blinding**: Permanently damaging optical sensors
- **Heating**: Damaging surface electronics (e.g. radar panel) and mechanics (e.g. gun mounts).
- **Fracturing**: Thermal stresses can cause cracks, or delamination of layers
- **Weakening**: Hot structural elements are not as strong and may buckle under load
- **Melting**: Melting away surface material
- **Vaporising**: Evaporating surface material
- **Plasma Erosion**: Plasma plume can physically erode material around it as it exits the hole

## Physics
### Irradiance
Measure of radiant power incident on a surface per unit area:

$$I = \frac{P}{A}$$

- `I`: $W/m^2$
- `P`: `W`, power
- `A`: `m^2`, spot size

### Gaussian Beam Spot Size
The size of the laser beam, usually calculated at a given distance. The equation normally depends on the refractive index of the medium, in vacuum that's exactly `1` which slightly simplifies the equation.

$$w(z) = w_0\cdot\sqrt{1+\left(\frac{z\lambda}{\pi w_0^2}\right)^2}$$

**Rayleigh Range** is the _distance_ to where the area of the spot size has doubled (i.e. irradiance has halved).

$$z_R = \frac{\pi w_o^2}{\lambda}$$

**Beam divergence** is a simplification of the gaussian spot size which assumes the laser is a cone with a constant divergence angle. This provides a simpler equation for spot size.

$$w(z) = w_0 + z\theta$$

- $w(z)$: $m$, spot size radius (w) at range (z)
- $w_0$: $m$, beam waist radius
- $z$: $m$, range (from beam waist to target, not emitter to target)
- $\lambda$: $m$, wavelength
- $\theta$: `radians`, beam divergence angle

### Diffraction Limit
This sets the physical lower limit on beam divergence.

$$\theta = 1.27\frac{\lambda}{D_{aperture}}$$

- $\theta$: `radians`, beam divergence angle
- $\lambda$: $m$, wavelength
- `D_{aperture}`: `m`, aperture diameter

### Beam Quality Factor
Diffraction limited is the best you can do, but beam quality measures how much worse it is in reality. This is a factor of the quality of your optics etc. This is measured as $M^2$, for a perfect system $M^2 = 1$.

$$\theta_{actual} = M^2 \cdot \theta_{diffraction}$$

### Minimum Spot Size
The smallest spot size a  laser can be focused to. Airy disc formula.
$$R_{spot} = \frac{1.22 \cdot \lambda \cdot L}{D_{aperture}} \cdot M^2$$
- $R_{spot}$ is the spot diameter
- $\lambda$ is the wavelength of the laser
- $L$ is the distance to the target
- $D_{aperture}$ is the diameter of the aperture
- $M^2$ is the beam quality factor

#### Jittered Spot Size
Assuming the emitter is vibrating, we can account for that by rolling it into spot size.

$$R_{effective} = \sqrt{R_{spot}^2 + (L \cdot tan(\theta_{jitter}))^2}$$

- $\theta_{jitter}$ RMS of jitter angle

Note that the small angle approximation says $tan(\theta) \approx \theta$, for laser pointing errors the jitter angle is always going to be tiny, so the `tan` function can be ignored.

## References
- [Gaussian beam Wikipedia](https://en.wikipedia.org/wiki/Gaussian_beam)
- [Beam Quality Factor](https://en.wikipedia.org/wiki/M_squared)
- [laserbeamsize](https://laserbeamsize.readthedocs.io/en/latest/11-M2-Parameters.html)
- [xometry](https://www.xometry.com/resources/sheet/m2-factor/)
	- Includes some example real world values for $M^2$
