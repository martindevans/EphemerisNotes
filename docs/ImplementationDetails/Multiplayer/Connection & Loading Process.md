1. Create lobby
2. Lobby contains `LobbyKeys` (e.g. scenario/campaign) and `MemberKeys` (e.g. Team ID)
3. tart lobby, switch to Connecting scene
4. `CreateNetworkManager` creates `NetworkManager` and calls host/connect
5. When connected, auto switch to scenario scene
	1. On failure to connect, revert to offline scene
6. When connected, client requests that the server creates a player object (`PlayerDataEntity`)
7. `NetworkScenarioLoader`
	1. Waits for player object to be spawned before loading further
	2. Fetches scenario from server
	3. Loads solar system bodies specified by scenario
		1. Wait for everyone to signal loading planets is complete
	4. Server switches to spawning mode