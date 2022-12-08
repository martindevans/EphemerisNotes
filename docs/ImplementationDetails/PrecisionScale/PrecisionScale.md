---
title: Precision & Scale
---

import FloatCalculator from '@site/docs/ImplementationDetails/PrecisionScale/FloatCalculator';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Ephemeris needs to represent the entire solar system, at these extreme scales the precision of floating point numbers can become a serious issues. For example if the aphelion of Jupiter (5.4570 AU) is stored as metres (816,356,000,000) then the smallest possible step a single precision float (i.e. C# `float`, Rust `f32`) can represent is 65.5 **kilometres**!

This is a problem even on _much_ smaller scales smaller scales. For example Unity, which uses single precision floats, recommends a max map size of 50km [[2]]. At this scale the smallest possible step size is 1.95mm.

## Scaling

It is tempting to think that scaling the units in use, for example representing all positions as kilometres instead of metres, will gain back more precision. **This is wrong**.

Scaling the value down by some factor (e.g. 1000) does improved the smallest possible step size, but that step is now measured in larger units and thus has to be scaled up by the same factor. These two operations effectively cancel each other out. You can see this effect in the calculator below; the "scale" setting reduces the scale of the value but increases the scale of the step size.

## Calculator

<FloatCalculator />

This calculation is done by reinterpreting (i.e. converting it without changing the bit pattern at all) the floating point value as an integer [[3]], incrementing the integer and reinterpreting it back to a float. This gets the next value along the "number line" which is the smallest possible change in value that can be represented.

## Relevance To Ephemeris

Example step size at various planets:
 - Jupiter (`5.5AU`/`816_100_000_000m`): 0.12mm
 - Saturn (`10AU`/`1_503_980_000_000m`): 0.24mm
 - Uranus (`20AU`/`3_006_389_400_000m`): 0.48mm
 - Neptune (`30.3AU`/`4_537_300_000_000m`): 7.18mm

Ephemeris is a realistic game based on plausible, near-future technology. It is extremely unlikely this level of tech will be able to reach the farthest reaches of the solar system in any kind of vehicle that can engage in combat! The game will not set any missions beyond Uranus, to avoid exceeding the 1mm minimum step size. This yields a smaller step size than the 1.95mm step size which Unity themselves recommend [[2]].

## References
 1. [Demystifying Floating Point Precision][1]
 2. [Unity forum, map scale][2]
 3. [StackOverflow JS reinterpret float][3]

[1]: https://blog.demofox.org/2017/11/21/floating-point-precision/
[2]: https://forum.unity.com/threads/large-world-coordinates-double-precision-data.1371378/#post-8645223
[3]: https://stackoverflow.com/questions/7538734/reinterpret-cast-floating-point-number-to-integer