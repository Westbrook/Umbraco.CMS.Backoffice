import { css, html, LitElement, customElement } from '@umbraco-cms/backoffice/external/lit';
import { UUITextStyles } from '@umbraco-cms/backoffice/external/uui';

/**
 * @element umb-footer-layout
 * @description
 * @slot default - Slot footer items
 * @slot actions - Slot actions
 * @export
 * @class UmbFooterLayout
 * @extends {UmbLitElement}
 */
@customElement('umb-footer-layout')
export class UmbFooterLayoutElement extends LitElement {
	render() {
		return html`
			<slot></slot>
			<slot id="actions" name="actions"></slot>
		`;
	}

	static styles = [
		UUITextStyles,
		css`
			:host {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: var(--umb-footer-layout-height);
				border-top: 1px solid var(--uui-color-border);
				background-color: var(--uui-color-surface);
				box-sizing: border-box;
			}

			#actions {
				display: flex;
				gap: var(--uui-size-space-2);
				margin: 0 var(--uui-size-layout-1);
				margin-left: auto;
			}
		`,
	];
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-footer-layout': UmbFooterLayoutElement;
	}
}
