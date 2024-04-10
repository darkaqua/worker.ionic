# SOCKET.ionic

## Parent
```ts
import { getParent } from 'https://deno.land/x/worker_ionic/mod.ts';

// load worker
const parent = getParent(new URL('./worker.ts', import.meta.url).href)

// listen to worker events
parent.on('ping', (data) => {
	console.log(data)
})
```


## Child
```ts
const client = getClientSocket('localhost:1994', ['session', 'token']);
client.on('connected', () => {
  // client is connected
  
  // listen to a channel
  client.on('ping', (message) => {
    // client emit message
    client.emit('pong', { date: Date.now() })
  });
});
client.on('error', () => {
  // client error
});
client.on('disconnected', () => {
  // client is disconnected
});
```