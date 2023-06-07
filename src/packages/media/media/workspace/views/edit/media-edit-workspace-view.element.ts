import { html, literal } from 'lit/static-html.js';
import { choose } from 'lit/directives/choose.js';
import {when} from 'lit/directives/when.js';
import { yoga1, yoga2, yoga3 } from './assets.js';
import { css, property, customElement, state, ifDefined } from '@umbraco-cms/backoffice/external/lit';
import { UUITextStyles } from '@umbraco-cms/backoffice/external/uui';
import { UmbLitElement } from '@umbraco-cms/internal/lit-element';
import { UmbWorkspaceEditorViewExtensionElement } from '@umbraco-cms/backoffice/extension-registry';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/scale-medium.js';
import '@spectrum-web-components/theme/theme-light.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/switch/sp-switch.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import '@spectrum-web-components/progress-circle/sp-progress-circle.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';

@customElement('umb-media-edit-workspace-view')
export class UmbMediaEditWorkspaceViewElement extends UmbLitElement implements UmbWorkspaceEditorViewExtensionElement {
	@property({type: Boolean})
	umbraco = false;

	@state()
	editing = false;

	@state()
	loading = false;

	@property()
	state: 'raw' | 'pop' | 'removed' = 'raw';

	handleSwitchChange() {
		this.umbraco = !this.umbraco;
	}

	handleOriginal() {
		this.loading = true;
		setTimeout(() => {
			this.state = 'raw';
			this.loading = false;
		}, 2200);
	}

	handlePop() {
		this.loading = true;
		setTimeout(() => {
			this.state = 'pop';
			this.loading = false;
		}, 2750);
	}

	handleBackground() {
		this.loading = true;
		setTimeout(() => {
			this.state = 'removed';
			this.loading = false;
		}, 3550);
	}

	handleEdit() {
		this.editing = true;
	}

	handleSave() {
		this.editing = false;
	}

	render() {
		const actionTag = this.umbraco
			? literal`uui-button`
			: literal`sp-action-button`;
		const buttonTag = this.umbraco
			? literal`uui-button`
			: literal`sp-button`;
		const switchTag = this.umbraco
			? literal`uui-toggle`
			: literal`sp-switch`;
		const loadingTag = this.umbraco
			? literal`uui-loader-circle`
			: literal`sp-progress-circle`;

		return html`
			<sp-theme scale="medium" color="light">
				<div class="container">
					${choose(this.state, [
						['raw', () => html`<img alt="Unedited yoga pose" src=${yoga1} />`],
						['pop', () => html`<img alt="Color popped yoga pose" src=${yoga2} />`],
						['removed', () => html`<img alt="Background removed yoga pose" src=${yoga3} />`]
					])}
					${when(this.loading, () => html`
						<div class="loading">
							<${loadingTag} indeterminate size="l"></${loadingTag}>
						</div>
					`)}
				</div>
				<div class="controls hud">
					${when(this.editing, () => html`
						<${buttonTag} variant="secondary" look="secondary" @click=${this.handleOriginal}>Original</${buttonTag}>
						<${buttonTag} variant="secondary" look="secondary" @click=${this.handlePop}>Color Pop</${buttonTag}>
						<${buttonTag} variant="secondary" look="secondary" @click=${this.handleBackground}>Remove Background</${buttonTag}>
						<${buttonTag} variant="primary" look="primary" @click=${this.handleSave}>Save</${buttonTag}>
					`, 
					() => html`
						<${actionTag} look="secondary" @click=${this.handleEdit} compact pristine>
							<sp-icon-edit slot=${ifDefined(this.umbraco ? undefined : 'icon')}></sp-icon-edit>
							<sp-tooltip self-managed placement="left" delayed>Edit with Adobe Photoshop</sp-tooltip>
						</${actionTag}>
					`)}
				</div>
				<div class="toggle hud">
					<${switchTag} class="switch" @change=${this.handleSwitchChange} ?checked=${this.umbraco}>Umbraco UI</${switchTag}>
				</div>
			</sp-theme>
		`;
	}

	static styles = [UUITextStyles, css`
		:host {
			display: block;
			height: 100%;
			position: relative;
			overflow: hidden;
		}
		.hud {
			padding: 1em;
			background: white;
			border-radius: 5px;
		}
		.toggle {
			position: absolute;
			bottom: 1em;
			right: 1em;
		}
		.controls {
			position: absolute;
			top: 1em;
			right: 1em;
		}
		.container {
			position: absolute;
			inset: 0;
			padding: 2em;
		}
		.loading {
			position: absolute;
			inset: 0;
			background: #00000033;
			display: grid;
			place-content: center;
		}
		uui-loader-circle {
			width: 100px;
			height: 100px;
		}
		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	`];
}

export default UmbMediaEditWorkspaceViewElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-media-edit-workspace-view': UmbMediaEditWorkspaceViewElement;
	}
}
