### Simple event emitter

Simple class to return event streams from functions. Is not intended to replace rxjs or other libraries: doesn't have any logic for filtering, mapping streams. It's lightweight and doesn't require any other library to work.

SimpleEvent is a hot observable, not cold like in rxjs.

### Usage

##### Create event emitter:

```ts
const event = new SimpleEvent<string | number>((next, complete, error) => {
	next("I'm a string")
	next(10)
	next("Another string")
	complete()
})
```

#####  Subscribe and listen:

Subscribers will get all previously emitted events on subscription

```ts
const s = event.subscribe(
	next => console.log("Next event is", next),
	() => console.log('Success! Yay'),
	err => console.error("Oops", err)
)
```

##### Unsubscribe (although, unsubsribe is not needed. Resources will be cleared after error or complete events):
```ts
s()
```
