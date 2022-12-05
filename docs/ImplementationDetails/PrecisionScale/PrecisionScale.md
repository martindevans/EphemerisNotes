---
title: Precision & Scale
---

import FloatCalculator from '@site/docs/ImplementationDetails/PrecisionScale/FloatCalculator';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Ephemeris needs to represent the entire solar system, at these extreme scales the precision of floating point numbers can become a serious issues. For example if the aphelion of Jupiter (5.4570 AU) is stored as metres (816,356,000,000) then a single precision float (i.e. C# `float`/`Single`) can only represent steps of 65.5 **kilometres**!

 - Floating point precision: https://blog.demofox.org/2017/11/21/floating-point-precision/

## Calculator

<FloatCalculator />
