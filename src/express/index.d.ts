import { Request as OriginalRequest } from 'express'
// eslint-disable-next-line import/no-extraneous-dependencies
import { TFunction } from 'i18next'

declare module 'express' {
	export interface Request extends Omit<OriginalRequest, 'query'> {
		query: any
		requestID: string
		t: TFunction
	}
}
