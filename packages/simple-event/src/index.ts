export type NextEmitter<T> = (value: T) => void
export type Body<T> = (next: NextEmitter<T>, complete: () => void, error: (err: any) => void) => void
export type Subscriber<T> = {
	onNext: (next: T) => void
	onComplete: () => void
	onError: (err: any) => void
}
export type Unsubscriber = () => void

export interface Events<T> {
	subscribe(subscriber: Subscriber<T>): Unsubscriber
}

/**
 * Допустим, мы в одном шаге делаем что-то и в другом хотим использовать результат из предыдущего. как тогда быть?
 *
 * type RaribleEvent<T> = {  }
 *
 * Action = () => SimpleEvent<T>
 */
export class SimpleEvent<T> implements Events<T> {
	private subscribers: Subscriber<T>[] = []

	private readonly emitted: T[] = []
	private error: any = undefined
	private completed: boolean = false

	constructor(private readonly body: Body<T>) {
		body(
			event => {
				this.emitted.push(event)
				this.subscribers.forEach(s => s.onNext(event))
			},
			() => {
				this.completed = true
				this.subscribers.forEach(s => s.onComplete())
				this.clearResources()
			},
			error => {
				if (error === undefined) {
					throw new Error("Error is undefined. Should be defined")
				}
				this.error = error
				this.subscribers.forEach(s => s.onError(error))
				this.clearResources()
			}
		)
	}

	public subscribe(subscriber: Subscriber<T>): Unsubscriber {
		if (this.subscribers.indexOf(subscriber) === -1) {
			this.subscribers.push(subscriber)
			this.emitted.forEach(subscriber.onNext)
			if (this.error !== undefined) {
				subscriber.onError(this.error)
			}
			if (this.completed) {
				subscriber.onComplete()
			}
		}
		return () => {
			this.subscribers = this.subscribers.filter(x => x !== subscriber)
		}
	}

	private clearResources() {
		this.subscribers = []
	}
}
