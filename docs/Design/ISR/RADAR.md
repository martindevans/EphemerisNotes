Radar is a system that uses radio waves to determine the distance (ranging), direction (azimuth and elevation angles), and radial velocity of objects relative to the site.

## Range
RADAR range equation:
$$
P_r = \frac{P_t \cdot G_t \cdot G_r \cdot \lambda^2 \cdot \sigma \cdot L}{(4\pi)^3 \cdot R^4}
$$
- `P_r`: Received power (watts)
- `P_t`: Transmitted power (watts)
- `G_t`: Transmitter antenna gain
- `G_r`: Receiver antenna gain
- `λ`: Wavelength of the radar signal (meters)
- `σ`: Radar cross-section of the target (square meters)
- `R`: Range (distance) to the target (meters)
- `L`: Other general losses (unitless)

### Gain
Transmitter gain can be determined from transmit beam width:
$$
G = 4\pi / \Omega
$$
- `Ω`: Beam solid angle (steradian)

It can also be calculated from aperture and wavelength:
$$G = \frac{4\pi \cdot A}{\lambda^2}$$
- `A`: Aperture area
- $\lambda$: Wavelength

## Beam Width
Minimum beam width is determined by aperture size, i.e. the physical size of the transmitter. This applies even for a phased array transmitter. ([Rayleigh Criterion](https://en.wikipedia.org/wiki/Angular_resolution#The_Rayleigh_criterion))
$$
\Omega_{min} = 1.22 \cdot \frac{\lambda}{D}
$$
- $\Omega_{min}$: Minimum beam width
- $\lambda$: Wavelength
- `D`: Diameter of the aperture

### Beam Steering
Using a phased array antenna the beam can be steered. In this case the effective antenna size gets smaller at steeper angles:
$$D_{effective} = D \cdot cos(\theta)$$
This has knock on effects in beam width.


## Sensitivity
Detection is done in a "resolution cell" which is the smallest volume of space that can be distinguished. i.e. two things within one cell are seen as one big thing. There are two parts:
$$
\Delta R = \frac{c}{2 × B}
$$
$$
\Delta \theta = \frac{\lambda}{D}
$$

- `c`: Speed of light
- `B`: Transmitted bandwidth (range of frequencies transmitted, centred on `λ`)
- $\lambda$: Wavelength
- `D`: Aperture diameter
- $\Delta R$: Range resolution
- $\Delta \theta$: Angular resolution

### Bandwidth Limits
Based on this more bandwidth always seems to be better! Although it only improves range resolution, so at some point there's not any use in tighter range resolution and enormous angular resolution.

In a phased array, beam steering is accomplished by delaying transmission. This delays is frequency dependent, so a phased arrays is inherently hard to make high bandwidth. The array needs more elements.

Wide bandwidth amplifiers are less efficient. This can be simulated by reducing the `L` (Other general losses) term slightly.

Very wide bandwidth can interfere with other equipment due to leakage. This could be simulated in game.

Processing of higher bandwidth requires more samples (e.g. 1GH\ bandwidth needs 2GSamples/sec). More computing load from that maybe means other trade-offs, e.g. less channels.

### SNR
Signal to noise ratio determines what can be seen at all. A RADAR requires a certain SNR threshold to detect anything.
$$
N=k \cdot T_s \cdot B_n
$$
$$
E_r = P_r \cdot T_{dwell}
$$
$$
SNR = \frac{E_r}{N}
$$
- `N`: Noise
- `k`: Boltzmann's constant
- `T_s`: System noise temperature
- `B`: Noise bandwidth
	- We can assume the RADAR filters out energy not in it's frequency bands. So this is the amount of bandwidth of the noise that overlaps with the active band of the radar
- `E_r`: Energy received
- `P_r`: Power received (see RADAR equation at top)
- `T_dwell`: Dwell time of beam
- `SNR`: Signal to Noise ratio

#### System Noise Temperature
This is all of the sources of noise added together:
- Environment temperature (see below)
	- 3K background in space
	- 290K if looking at Earth
	- 5600K if looking at sun
- System noise
	- Antenna, amplifier etc
	- 20K for cryogenically cooled military grade systems
	- 50-150K for a "normal" high quality system
- Jamming noise
##### Environmental Noise
Environmental noise can come from sources such as planets or the sun.
$$
T_{antenna} = T_{source} \cdot \frac{\Omega_{source}}{\Omega_{beam}}
$$
- `T_antenna`: Actual noise temperature as seen by antenna
- `Omega_source`: Solid angle (steradian) of source
- `Omega_beam`: Solid angle (steradian) of beam

##### Jamming Noise
Jamming power converted into equivalent temperature:
$$
T_{jammer} = \frac{P_j}{k \cdot B}
$$
- `T_jammer`: Temperature to add to system noise temperature
- `P_j`: Jamming power received by antenna
- `B`: Jammer bandwidth
#### Gameplay
- SNR can act as a threshold for what is even detectable, below the SNR threshold and it is invisible.
- A middle band of low SNR can reduce tracking quality.
	- Worse range or angular resolution
	- No target type classification
	- Less frequent updates
## EC(C)M
Electronic Counter Measures (ECM) and Electronic Counter-Countermeasures (ECCM).
### ECM
- Barrage/Noise Jamming - broadband noise that simply lower SNR.
	- Can be more intelligent, e.g. receive enemy RADAR signals and match their frequency.
	- Coherent jamming intentionally broadcasts destructive interference, reducing returned power. Effectively reducing RCS.
- Delay/Repeat Jamming - capturing RADAR signals and rebroadcasting them after some delay. Creates a false range reading.
	- `Range Gate Pull-Off` involves doing this repeatedly with increasing delays, slowly "pulling" the range estimate away from ground truth until the RADAR is looking in the wrong place entirely.
### ECCM
- Frequency Hopping - constantly change broadcast frequency so jammer don't know what to transmit.
- Adaptive Processing - detect jamming signals and adapt. e.g. increase dwell time to improve SNR.
- Pulse coding - transmit a coded pulse across certain frequencies, ignore everything that doesn't match that code.

# References
- General: https://www.radartutorial.eu
- The Radar Equation: https://www.ll.mit.edu/sites/default/files/outreach/doc/2018-07/lecture%202.pdf