export class Batcher<T> {
	private queue: T[] = []

	constructor(interval: number, private readonly handler: (queue: T[]) => void) {
		setInterval(() => this.dropIfNeeded(), interval)
	}

	add(item: T) {
		this.queue.push(item)
	}

	dropIfNeeded() {
		if (this.queue.length > 0) {
			this.handler(this.queue)
			this.queue = []
		}
	}
}