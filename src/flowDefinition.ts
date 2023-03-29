import { AsyncLocalStorage } from 'node:async_hooks'
import { Model } from 'sequelize'

import { AsyncStorageData } from './interfaces/asyncStorageData'

export abstract class FlowDefinition<T extends Model<any, any>> {
	private storage: AsyncLocalStorage<AsyncStorageData<T>> = new AsyncLocalStorage<AsyncStorageData<T>>()

	init<R, TArgs extends any[]>(data: AsyncStorageData<T>, callback: (...args: TArgs) => R, ...args: TArgs): R {
		return this.storage.run(data, callback, ...args)
	}

	get(): AsyncStorageData<T> {
		const store = this.storage.getStore()
		if (!store) {
			throw new Error('Cannot get store, method called outside of an asynchronous context')
		}

		return store
	}
}
