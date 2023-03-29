import { NextFunction, Response } from 'express'
import { Model } from 'sequelize'

import { FlowDefinition } from './flowDefinition'
import { AsyncStorageData } from './interfaces/asyncStorageData'
import { RequestData } from './interfaces/requestData'

export function flowMiddleware<T extends Model<any, any>>(flowInstance: FlowDefinition<T>) {
	// NOTE: req has to have `any` type, otherwise middleware can be used due to the type mismatch ...
	return (req: any, res: Response, next: NextFunction) => {
		const asyncStorageData: AsyncStorageData<T> = {
			// from i18nextMiddleware
			t: req.t,
			// from loggingMiddleware
			requestID: req.requestID,
			request: new RequestData(req)
		}

		return flowInstance.init(asyncStorageData, () => next())
	}
}
