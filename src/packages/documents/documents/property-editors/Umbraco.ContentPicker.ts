import type { ManifestPropertyEditorModel } from '@umbraco-cms/backoffice/extension-registry';

export const manifest: ManifestPropertyEditorModel = {
	type: 'propertyEditorModel',
	name: 'Content Picker',
	alias: 'Umbraco.ContentPicker',
	meta: {
		defaultPropertyEditorUiAlias: 'Umb.PropertyEditorUi.ContentPicker',
		settings: {
			properties: [
				{
					alias: 'startNodeId',
					label: 'Start node',
					description: '',
					propertyEditorUiAlias: 'Umb.PropertyEditorUi.TreePicker',
				},
			],
		},
	},
};
