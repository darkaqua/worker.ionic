
import { getParentWorker } from '../mod.ts'

const worker = getParentWorker({
	url: new URL('./child.ts', import.meta.url).href,
	pingTimeout: 1000,
	pingInterval: 100
});

worker.on('disconnected', () => {
	console.log('disconnected')
})

setInterval(() => {}, 1000)