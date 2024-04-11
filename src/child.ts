
export const getChildWorker = () => {
	const events: Record<string, any> = {};
	
	self.onmessage = ({ data: { event, message } }: any) => {
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
		self.postMessage({ event, message });
	
	const remove = (event: string, id: number) =>
		events[event] = events[event].filter((event, index) => index === id ? undefined : event);
	
	const close = () => {
		emit('disconnected', '')
		setTimeout(() => {
			self.close();
		}, 2)
	}
	
	return {
		on,
		emit,
		remove,
		close
	}
}