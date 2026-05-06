Steamworks is a framework provided by Valve for accessing all Steam features by games. Kessler uses it for multiplayer.
## Lobby
Important lobby calls:
- Create `SteamMatchmaking.CreateLobby`
- Leave `SteamMatchmaking.LeaveLobby(_lobbyId);`
- Prevent joining `SteamMatchmaking.SetLobbyJoinable(_lobbyId, false);`
- Store data `SteamMatchmaking.SetLobbyData(_lobbyId, "key", "value");`
- Chat:
	- Send `SteamMatchmaking.SendLobbyChatMsg`
	- Receive `LobbyChatMsg_t`
## Invite To Join
### Sending
- Call `SteamFriends.ActivateGameOverlayInviteDialog(lobbyid)`
### Receiving
- When an invite to join is received, if the game is **not** already running it will be launched with  `+connect_lobby LOBBY_ID` as a command line argument.
- `GameLobbyJoinRequested_t` will be raised if the game is already running.
## Call Results
Steamworks.NET implements call results (basically async results) like this:
```csharp
// Setup handler
_numPlayersHandled = CallResult<NumberOfCurrentPlayers_t>.Create(OnNumPlayers);

// Make call
SteamAPICall_t handle = SteamUserStats.GetNumberOfCurrentPlayers();
_numPlayersHandled.Set(handle);

// Handle results
private void OnNumPlayers(NumberOfCurrentPlayers_t pCallback, bool bIOFailure)
{
	if (pCallback.m_bSuccess != 1 || bIOFailure)
	{
		Debug.Log("There was an error retrieving the NumberOfCurrentPlayers.");
	}
	else
	{
		Debug.Log("Num Players: " + pCallback.m_cPlayers);
	}
}
```