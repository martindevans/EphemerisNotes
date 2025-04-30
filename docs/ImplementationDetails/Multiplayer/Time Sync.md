The game can run at extremely high time speeds (e.g. one day/second = 86400x). That means even tiny error in time synchronisation will be amplified enormously.

### Soft Lockstep
When the server wants to change the sim speed, it sends a message to all clients telling them what sim speed to set and when to set it (with some advance warning). The clients spend the short time ahead of the change tweaking their time speed to get exactly in sync at the moment of the time change.

## Lockstep Drift Correction
Even after a perfect in-sync change in time speed, client might drift. This can be handled with the same mechanism - simply re-scheduling the current time speed periodically. This acts as a "heartbeat" to keep everyone in sync.

## Time Control Step By Step
1. A `TimeSpeedRequestEvent` is sent through the event bus
	- From the user clicking a button in the UI
	- From backpressure (overloaded CPU)
		- `RailSamplerBackpressure`
2. Event is received by `TimeSyncComms` and sent up to the server
3. Event is received by `TimeSyncComms` (on server)
	1. Replicated to all clients, stored in ECS
4. `TimeSyncComms` (on server) detects when a change in time speed is needed. Sends a message to all clients scheduling that time change in the near future (in `NetworkScheduledGameTimeSimulationHost`)
5. Every frame `NetworkScheduledGameTimeSimulationHost` checks the next scheduled time change and applies it when necessary