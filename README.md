[![Build and run tests](https://github.com/GoodRequest/flow/actions/workflows/build.yaml/badge.svg)](https://github.com/GoodRequest/flow/actions/workflows/build.yaml)
[![Publish package to GitHub Packages](https://github.com/GoodRequest/flow/actions/workflows/publish.yaml/badge.svg)](https://github.com/GoodRequest/flow/actions/workflows/publish.yaml)

# Flow Library
Helper library for using [async hooks](https://nodejs.org/api/async_hooks.html), using [AsyncLocalStorage](https://nodejs.org/api/async_context.html#class-asynclocalstorage) class.

## Installation
`npm i --save @goodrequest/flow`

## Initialization:
You need to extend abstract `FlowDefinition` class and then instantiate it. Best way to do it is to create a new file, e.g. `flow.ts` ([example](./tests/mocks/flow.ts):
```typescript
import { FlowDefinition } from '../../src'
import { UserModel } from './user'

class TestFlow extends FlowDefinition<UserModel> {}

export const Flow = new TestFlow()
```

Next step is to setup middleware for hydrating storage:
```typescript
app.use(flowMiddleware(Flow))
```

## Usage
When class is instantiated and data are saved using middleware, you can start using it:
```typescript
const asyncData = Flow.get()
```

## Stored data
- `AsyncStorageData` [interface](src/interfaces/asyncStorageData.ts)
- `RequestData` [class](src/interfaces/requestData.ts)
```typescript
export interface AsyncStorageData<T extends Model<any, any>> {
	user?: T
	t: TFunction
	requestID: string
	request: RequestData
}

export class RequestData {
	method: string
	url: string
	ip: string
	headers: any
	query: any
	body: any

	constructor(req: Request) {
		this.method = req.method
		this.url = req.originalUrl
		// NOTE: x-real-ip is from nginx reverse proxy
		this.ip = req.header('x-real-ip') || req.ip
		this.headers = req.headers
		this.query = req.query
		this.body = req.body
	}
}
```

## Modifications
You can implement this by yourself following [this example](https://www.notion.so/goodrequest/Async-Hooks-Flow-ee8720fa61cb45b7ac77440561dcb81a).
