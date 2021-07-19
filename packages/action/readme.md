### Action 

Action is an abstraction for calculation that can be divided into stages. Usually stage depicts one simple user interaction, for example, `signing message`, `sending transaction` etc. 

Action has these features:
- run any stage (by index) - returns `Promise<void>`
- get result of the last stage - `Promise<T>`
- get list of stage identifiers

### Usage

```ts
import { ActionBuilder } from "./index"

type Id = "approve" | "send-tx"

const action: Action<Id, [number, string]> = ActionBuilder.create<Id>()
  .then({ id: "approve", run: () => Promise.resolve(10)})
  .then({ id: "send-tx", run: (value) => Promise.resolve(`hash-${value}`)})
  .build()

//then
const firstStageResult: number = await action.run(0) //resolves to 10
const secondStageResult: string = await action.run(1) //resolved to hash-10

//also this can be used to get final result (the same as .run(1))
const finalResult: string = await action.result

//get array of stage ids
const ids = action.ids // ["approve", "send-tx"]
```
