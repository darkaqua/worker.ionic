# @da/worker

## Parent

```ts
import { getParentWorker } from "@da/worker";

// load worker
const worker = getParentWorker({
  url: new URL("./worker.ts", import.meta.url).href,
  pingTimeout: 1000,
  pingInterval: 100,
});

// listen to worker events
const event = worker.on("ping", (data) => {
  console.log(data);
});
// remove event listener
worker.remove("ping", event);
// emit to worker
worker.emit("channel", { potatoes: "smashed" });
```

## Child

```ts
import { getChildWorker } from "@da/worker";

const worker = getChildWorker();

// listen to parent events
const event = worker.on("ping", (data) => {
  console.log(data);
});
// remove event listener
worker.remove("ping", event);
// emit to parent
worker.emit("channel", { potatoes: "smashed" });
```
