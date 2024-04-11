# SOCKET.ionic

## Parent
```ts
import { getParentWorker } from 'https://deno.land/x/worker_ionic/mod.ts';

// load worker
const worker = getParentWorker({
  url: new URL('./worker.ts', import.meta.url).href,
	pingTimeout: 1000,
	pingInterval: 100
})

// listen to worker events
const event = worker.on('ping', (data) => {
	console.log(data)
})
// remove event listener
worker.remove('ping', event);
// emit to worker
worker.emit('channel', { potatoes: 'smashed' });
```


## Child
```ts
import { getChildWorker } from 'https://deno.land/x/worker_ionic/mod.ts';

const worker = getChildWorker();

// listen to parent events
const event = worker.on('ping', (data) => {
	console.log(data)
})
// remove event listener
worker.remove('ping', event);
// emit to parent
worker.emit('channel', { potatoes: 'smashed' });
```