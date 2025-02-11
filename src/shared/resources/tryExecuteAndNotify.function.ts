/* eslint-disable @typescript-eslint/no-explicit-any */
import { UmbResourceController } from './resource.controller.js';
import { UmbControllerHostElement } from '@umbraco-cms/backoffice/controller-api';
import type { UmbNotificationOptions } from '@umbraco-cms/backoffice/notification';

export function tryExecuteAndNotify<T>(
	host: UmbControllerHostElement,
	resource: Promise<T>,
	options?: UmbNotificationOptions
) {
	return new UmbResourceController(host, resource).tryExecuteAndNotify<T>(options);
}
