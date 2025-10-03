Penetration equations calculate the effects of an impact on armour. Cratering, spalling and full penetration.
## Glossary
- **Crater depth**: depth of crater without penetration.
- **Spallation**: Fragments flying off inside of armour, but no penetration.
- **Spallation limit**: At the spallation limit there's a 50% chance of spallation.
- **Ballistic limit**: At the ballistic limit there's a 50% chance of penetration.
- **Single Plate**: Armour scheme with one single plate of armour.
- **Double Plate**: Armour scheme with 2 plates, separated by a gap. Front (bumper) plate shatters the projectile, gap allows fragments to spread out. a.k.a. Whipple Shield.
## Tank Archives
Equations for low speed regime - tanks (~1.5km/s) and battleships (~1km/s). Source: https://www.tankarchives.com/2014/10/penetration-equations.html
### DeMarre Equation
Calculates penetration depth of a shell, based on known penetration for another similar shell. Designed for tanks in WWII.

Could be used to interpolate between pre-calculated penetration depths (e.g. do more expensive calculations in ship editor, interpolate at runtime). 

$$P = \frac{Ref(P) \cdot (V / Ref(V))^{1.4283} \cdot (D/Ref(D)^3)^{1.0714} \cdot (W/D)^{0.7143}}{(Ref(W) / Ref(D)^3)^{0.7143}}$$
Where `Ref(X)` means the value of `X` for some known reference.
- P: Thickness of armour that a shell will penetrate.
- V: Velocity
- D: Diameter
- W: Weight
### Krupp Formula
Estimates penetration depth of a shell. Designed for battleships in WWII.

Requires a `K` value that indicate how good the armour is, which would need to be generated somehow.

$$B = 10 \cdot \frac{V \cdot \sqrt{P}}{K \cdot \sqrt{D}}$$
- `B`: Depth of penetration (in meters)
- `V`: Velocity
- `P`: Mass
- `K`: Armour resistance constant, default to `2400`.
## Single Wall Penetration
A set of equations from NASA, designed for orbital debris impacts on single plates (i.e. a simple sheet of homogenous material).

Some of these equations predict the crater depth, these can usually be re-arranged into predicting the size of the projectile which penetrates.

Sources:
- [Main paper](https://ntrs.nasa.gov/api/citations/19920007464/downloads/19920007464.pdf)
- [The effect of material properties on threshold penetration](https://ntrs.nasa.gov/api/citations/19650019791/downloads/19650019791.pdf) (Fish & Summers)
- [Meteoroid Damage Assessment](https://ntrs.nasa.gov/api/citations/19710015594/downloads/19710015594.pdf)
### Fish-Summers Equation
Determined from empirical tests with a range of materials and speeds (0.5km/s to 8.5km/s).
$$t = K \cdot m^{0.352} \cdot V^{0.875} \cdot \rho^{1/6}$$
- `t`: Target thickness (cm)
- `K`: A constant for material
- `m`: Projectile mass (g)
- $\rho$: Projectile density ($g / cm^3$)
- `V`: Impact velocity (km/s)
### Schmidt-Holsapple Equation
Equation with many test results against many different material types in the range of 4km/s to 8km/s.
$$d = 2.06 \cdot t \cdot \frac{\rho_p}{\rho_t}^{-0.159} \cdot \frac{2.68 \cdot F_{tu}}{\rho_p \cdot V_n^2}^{0.236}$$
- `d`: Projectile Diameter (inches)
- `t`: Target Thickness (inches)
- $\rho_p$: Projectile Density ($lb/in^3$)
- $\rho_t$: Target Density ($lb/in^3$)
- $F_{tu}$: Ultimate tensile strength for target ($lb/in^2$)
- $V_n$: Normal Impact Velocity (normal component of impact velocity) (ft/s)
### Rockwell Equation
**For Crater Depth**:
$$p = 1.38 d^{1.1} \cdot B H^{-0.25} \cdot \rho_p^{0.5}\rho_t^{-0.167} \cdot V^{0.67}$$
**For Ballistic Limit**:
$$t_b = 1.8 p$$
**For Spallation Limit**:
$$t_s = 3p$$
- `p`: Crater depth on target (cm)
- $t_b$: Target thickness for ballistic limit (cm)
- $t_s$: Target thickness for spallation limit (cm)
- `d`: Projectile diameter (cm)
- $\rho_p$: Projectile density ($g/cm^3$)
- $\rho_t$: Target density ($g/cm^3$)
- `BH`: Brinnell hardness for target
- `V`: Impact velocity (km/s)
### JSC (Cour-Palais) Equation
Similar to the Rockwell equation, same range of speeds. Only valid when $(\rho_p / \rho_t < 1.5)$.
$$p = 5.24d^{1.056} \cdot BH^{-0.25} \cdot \rho_p^{0.5}\rho_t^{-0.167} \cdot E^{-0.33} \cdot V^{0.67}$$
**For Ballistic Limit**:
$$t_b = 2 p$$
**For Spallation Limit**:
$$t_s = 3p$$
- `p`: Crater depth on target (cm)
- $t_b$: Target thickness for ballistic limit (cm)
- $t_s$: Target thickness for spallation limit (cm)
- `d`: Projectile diameter (cm)
- $\rho_p$: Projectile density ($g/cm^3$)
- $\rho_t$: Target density ($g/cm^3$)
- `BH`: Brinnell hardness for target
- `E`: Youngs modulus for target (GPa)
- `V`: Impact velocity (km/s)
### Modified Cour-Palais Equation
Modified version of previous.
$$p = 5.24d^{1.056} \cdot BH^{-0.25} \cdot (\frac{\rho_p}{\rho_t})^{0.5} \cdot (\frac{V_n}{C})^{\frac{2}{3}}$$
**For Ballistic Limit**:
$$t_b = 1.8 p$$
**For Spallation Limit**:
$$t_s = 2.2 p$$
- `p`: Crater depth on target (cm)
- $t_b$: Target thickness for ballistic limit (cm)
- $t_s$: Target thickness for spallation limit (cm)
- `d`: Projectile diameter (cm)
- $\rho_p$: Projectile density ($g/cm^3$)
- $\rho_t$: Target density ($g/cm^3$)
- `BH`: Brinnell hardness for target
- `E`: Youngs modulus for target (GPa)
- $V_n$: Normal Impact Velocity (normal component of impact velocity) (km/s)
- `C`: Speed of sound for target (km/s) = $\sqrt{\frac{E}{\rho_t}}$
## Double Wall Penetration (Whipple Shield)
A whipple shield is a thin layer of material which is expected to be penetrated (bumper), this shattered the projectile which spreads out in the empty space (stand off distance) before impacting the back (rear wall). This reduces the damage by spreading it over more of the rear armour.

Equations presented in [Whipple Shield Sizing Equations](https://ntrs.nasa.gov/api/citations/19920010826/downloads/19920010826.pdf). The predicted thickness is the ballistic limit - i.e. no fracturing or spallation.
$$t_b = 0.25d \cdot \delta_p/\delta_b$$
$$t_w = 0.16 \cdot d^{0.25} \cdot (\delta_p\delta_b)^{1/6} \cdot M^{1/3} \cdot V_n/S^{0.5} \cdot (70 / \sigma)^{0.5}$$
- `t`: thickness
- `d`: projectile diameter (cm)
- $\delta$: Density ($g/cm^3$)
- `M`: Projectile mass (g)
- `S`: Spacing (cm)
- $\sigma$: Rear wall yield stress (ksi)
- $\theta$: Impact angle measured from surface normal (degrees)
- `V`: Projectile velocity (km/s)
- $V_n$: Normal component of projectile velocity ($V cos \theta$)
Subscripts:
- `b`: Bumper
- `p`: Projectile
- `w`: Rear wall
### New Cour-Palais Equation
[Double Plate Penetration Equations paper](https://ntrs.nasa.gov/api/citations/20000032469/downloads/20000032469.pdf) presents 3 phases of hypervelocity impacts:
- Ballistic/Low Range - normal ballistics apply, projectile will not shatter. In this phase a whipple shield has little effect.
- Shatter/Intermediate Range - projectile shatters on impact with the bumper plate and disperses a cloud of debris.
- Vaporisation/High Range - projectile and bumper plate vaporise on impact.

The paper presents 3 versions of the Cour-Palais equation:
- Original - developed from test data for the Apollo program
- Modified - tweaks as new data became available
- New - Entirely new equation that accounts for the 3 phases of damage

Note that this equation is written to predict the projectile diameter (assumed to be spherical) that will penetrate a shield (at the ballistic limit, i.e. just about penetrate).

When $V_n < 3 km/s$:
$$d = [(t_w\left(\sigma \over 40\right)^{0.5} + t_b) / (0.6(\cos\theta)^{5/3}\rho_p^{0.5}V^{2/3})]^{18/19}$$

When $3km/s < V_n < 7km/s$:
$$d = \begin{align}
&[(t_w\left(\sigma \over 40\right)^{0.5} + t_b) / (1.248\rho_p^{0.5}\cos\theta)]^{18/19}(1.75 - (V\cos\theta)/4) \\
&+ (1.071t_w^{2/3}\rho_p^{-1/3}\rho_b^{-1/9}S^{1/3})((V\cos\theta)/4-0.75)
\end{align}$$

When $V_n > 7km/s$:
$$d = 3.918t_w^{2/3}\rho_p^{-1/3}\rho_b^{-1/9}(V\cos\theta)^{-2/3}S^{1/3}\left(\frac{\sigma}{70}\right)^{1/3}$$
- d: Projectile diameter (cm)
- $t_b$: Bumper thickness (cm)
- $t_w$: Rear-wall thickness (cm)
- $\rho_p$: Projectile density (gm/cm^3)
- $\rho_b$: Bumper density (gm/cm^3)
- $\theta$: Impact angle from surface normal (degrees)
- V: Impact velocity (km/s)
- $V_n$: Normal component of impact velocity (km/s) = $V\cos\theta$
- S: Spacing (cm)
- $\sigma$: Rear wall yield stress (kilopound per square inch)
## Hypervelocity Impacts
### Sources
- [Handbook for Designing MMOD Protection](https://ntrs.nasa.gov/api/citations/20090010053/downloads/20090010053.pdf)
- [Structural Damage Prediction and Analysis for Hypervelocity Impacts - Handbook](https://ntrs.nasa.gov/api/citations/19960016651/downloads/19960016651.pdf)
- [Correlation of new Hypervelocity Impact Data by Threshold Penetration Relations](https://ntrs.nasa.gov/api/citations/19730022133/downloads/19730022133.pdf)
- [Characteristics of Whipple shield performance in the shatter regime](https://ntrs.nasa.gov/api/citations/20100006702/downloads/20100006702.pdf)

### Wilkinson Dispersion Angle
Calculates the average cone angle of debris cloud after hypervelocity impact and penetration of bumper. Only applicable for vaporisation.
$$\theta = \arctan\left(0.6 \cdot\frac{\rho_bt_b}{\rho_pd_p}\right) for \left(\frac{\rho_bt_b}{\rho_pd_p}\right) < 1$$
$$\theta = \arctan(0.6) = 31\degree for \left(\frac{\rho_bt_b}{\rho_pd_p}\right) \geq 1$$
### Piekutowski Shatter Fragment Diameter
Calculates the largest shatter fragment diameter, developed for 2017-T4 aluminium spheres impacting 6061-T6 aluminium sheets. Characterised at two specific thickness/diameter ratios. [Source](https://hadlandimaging.com/wp-content/uploads/2021/06/NASA-CR4707-Report-1996.pdf).
$$d_f = \left(204.8 \cdot V^{-2.24}\right) for \left(t_b/d_p = 0.049\right)$$
$$d_f = \left(147.1 \cdot V^{-2.24}\right) for \left(t_b/d_p = 0.084\right)$$
- $d_f$: Largest fragment diameter (mm)
- V: Velocity (km/s)
- $t_b$: Bumper thickness
	- Unit is arbitrary, as long as it's consistent with $d_p$
- $d_p$: Projectile diameter
	- Unit is arbitrary, as long as it's consistent with $t_b$
### Damage Types
Mostly summarised from [Structural Damage Prediction and Analysis for Hypervelocity Impacts - Handbook](https://ntrs.nasa.gov/api/citations/19960016651/downloads/19960016651.pdf).

1. Hit and bounce
	- Possible spallation
2. Hit and penetrate
	- Possible shatter
	- Possible melting/vaporisation
3. Debris cloud hit
4. Vapour cloud hit

- Direct hits at low speed penetrate a thin whipple shield with almost no changes.
- Direct hits at high speeds penetrate and shatter into a cloud of debris, but also add a smaller projectile made out of the bumper material going straight on
- Hits above $65\degree$ can ricochet, in this case the projectile shatters and bounces off harmlessly. Spallation from the bumper continues inward along the normal.