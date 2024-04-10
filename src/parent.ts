
export const getParentWorker = (url: string) => {
	const events: Record<string, any> = {};
	
	const worker = new Worker(url, { type: 'module' });
	
	worker.onmessage = ({data: { event, message }}) => {
		const eventList = (events[event] || []).filter(Boolean);
		if(eventList)
			for (const event of eventList)
				event(message)
	}
	
	const on = (event: string, callback: (event: string, message: any) => void) =>{
		if(!events[event]) events[event] = [];
		return events[event].push(callback) -1;
	}
	
	const emit = (event: string, message: any) =>
		worker.postMessage({ event, message });
	
	const remove = (event: string, id: number) =>
		events[event] = events[event].filter((event, index) => index === id ? undefined : event);
	
	return {
		on,
		emit,
		remove
	}
}