import { getChildWorker } from "../mod.ts";

const worker = getChildWorker();

setTimeout(() => {
  worker.close();
}, 2_000);
