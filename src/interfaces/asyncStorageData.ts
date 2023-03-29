import { Model } from 'sequelize'
// eslint-disable-next-line import/no-extraneous-dependencies
import { TFunction } from 'i18next'

import { RequestData } from './requestData'

/**
 * Helper interface, represent data stored in AsyncLocalStorage
 */
export interface AsyncStorageData<T extends Model<any, any>> {
	user?: T
	t: TFunction
	requestID: string
	request: RequestData
}
