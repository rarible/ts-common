export class Batcher<T> {
	private timeout?: ReturnType<typeof setTimeout>
	private queue: T[] = []

	constructor(
		private readonly interval: number,
		private readonly handler: (queue: T[]) => void
	) {}

	add(item: T) {
		this.queue.push(item)
		if (!this.timeout) {
			this.timeout = setTimeout(() => this.drop(), this.interval)
		}
	}

	drop() {
		this.handler(this.queue)
		this.queue = []
		this.timeout = undefined
	}
}