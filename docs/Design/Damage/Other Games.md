## World of Warships
Armour penetration mechanics: https://wiki.wargaming.net/en/Ship:Armor_Penetration
- Damage saturation: lots of damage to one area reduces damage taken (no point shooting something that's already damaged/destroyed)
- HE shells hitting armour they can't penetrate shatter, no damage
- AP shells arm on impact and explode shortly after, doing internal damage. Failing to penetrate, or over penetrating massively reduces damage.
- Ricochet chance based on armour angle
	- If angle is over a certain limit, always bounce
- Overmatch means that very large shells hitting very thin armour can't ricochet
- Shell normalization: if there are multiple layers of armour the shell path gets bent slightly towards perpendicular every time it penetrates. This makes subsequent layers easier to penetrate.
## World of Tanks
Armour penetration mechanics: https://wiki.wargaming.net/en/Battle_Mechanics#Penetration_Mechanics
- Many shared mechanics with world of warships:
	- Overmatch
	- Ricochet
	- Normalization
- Effective thickness
	- Armour is treated as if it is thicker at shallow angles
- Randomisation
	- Penetration stats are slightly randomised per hit
- Layered armour
	- If external layers are penetrated, internal ones can be too (taking into account normalisation)
	- Shells can ricochet off internal layers, in which case they might hit the _backside_ of external layers.