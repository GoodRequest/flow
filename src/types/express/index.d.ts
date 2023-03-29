// eslint-disable-next-line import/no-extraneous-dependencies
import { TFunction } from 'i18next'

declare module 'express' {
	export interface Request {
		t: TFunction
		requestID: string
	}
}
