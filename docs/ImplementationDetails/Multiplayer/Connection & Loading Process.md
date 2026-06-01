1. Create a lobby
2. Lobby contains `LobbyKeys` (e.g. scenario/campaign) and `MemberKeys` (e.g. Team ID/Fleet ID)
3. Start lobby, switch to Connecting scene
4. `CreateNetworkManager` creates `NetworkManager` and calls host/connect
5. When connected, auto switch to scenario scene
6. `NetworkScenarioLoader` controls process:
	1. `WaitForNetworkSpawn` waits for connection to server and spawns a player object (`PlayerDataEntity`)
	2. On each client `PlayerDataEntity` is created and in turn creates an Entity representing this player
	3. Everyone retrieves the scenario from the server, then loads the planets specified in the scenario
	4. Wait for everyone to finish loading planets
	5. Switch gamemode to "spawning"