import type { ManifestMenuItem } from '@umbraco-cms/backoffice/extension-registry';

const menuItem: ManifestMenuItem = {
	type: 'menuItem',
	alias: 'Umb.MenuItem.Documents',
	name: 'Documents Menu Item',
	weight: 100,
	loader: () => import('./document-menu-item.element.js'),
	meta: {
		label: 'Documents',
		icon: 'umb:folder',
	},
	conditions: {
		menus: ['Umb.Menu.Content'],
	},
};

export const manifests = [menuItem];
