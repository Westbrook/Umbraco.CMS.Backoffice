import { Meta, Story } from '@storybook/web-components';
import type { UmbPropertyEditorUITinyMceElement } from './property-editor-ui-tiny-mce.element.js';
import { html } from '@umbraco-cms/backoffice/external/lit';

import './property-editor-ui-tiny-mce.element.js';

export default {
	title: 'Property Editor UIs/Tiny Mce',
	component: 'umb-property-editor-ui-tiny-mce',
	id: 'umb-property-editor-ui-tiny-mce',
} as Meta;

export const AAAOverview: Story<UmbPropertyEditorUITinyMceElement> = () =>
	html`<umb-property-editor-ui-tiny-mce></umb-property-editor-ui-tiny-mce>`;
AAAOverview.storyName = 'Overview';
