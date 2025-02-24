import { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';
import { ManifestDashboard } from '@umbraco-cms/backoffice/extension-registry';

const dashboard: ManifestDashboard = {
	type: 'dashboard',
	alias: 'Umb.Dashboard.UmbracoNews',
	name: 'Umbraco News Dashboard',
	loader: () => import('./umbraco-news-dashboard.element.js'),
	weight: 20,
	meta: {
		label: 'Welcome',
		pathname: 'welcome',
	},
	conditions: {
		sections: ['Umb.Section.Content'],
	},
};

export const onInit: UmbEntryPointOnInit = (_host, extensionRegistry) => extensionRegistry.register(dashboard);
