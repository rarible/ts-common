## Action abstraction for @rarible/sdk

Action is almost like async function, but actions can be divided into steps. It gives more control over action execution.

This way frontend applications can allow users to see what step is currently executing. Also, it's possible to even control when next step should be started.

### How-to create an Action

[Action](./src/action.ts) can be created using [ActionBuilder](./src/action-builder.ts):

```ts
import { ActionBuilder } from "@rarible/action"

const action = ActionBuilder
  .create({ id: "first-step" as const, run: (input: string) => firstStep(input) })
  .thenStep({ id: "second-step" as const, run: input => secondStep(input) })
```

This creates and action, which can be executed:
```ts
const result = await action("pass the input data here")
```

Here, result will be the result of secondStep async function.

You can run steps individually:
```ts
//First, start action, get Execution
const exec = action.start("pass the input data here")

//then run steps
await exec.run(0)
await exec.run(1)

//then get the result
const result = await exec.result
```