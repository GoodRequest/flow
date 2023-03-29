import { NextFunction, Request, Response } from 'express'
import { Model } from 'sequelize'

import { FlowDefinition } from './flowDefinition'
import { AsyncStorageData } from './interfaces/asyncStorageData'
import { RequestData } from './interfaces/requestData'

// eslint-disable-next-line import/prefer-default-export
export function flowMiddleware<T extends Model<any, any>>(flowInstance: FlowDefinition<T>) {
	return (req: Request, res: Response<any, Record<string, any>>, next: NextFunction) => {
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
