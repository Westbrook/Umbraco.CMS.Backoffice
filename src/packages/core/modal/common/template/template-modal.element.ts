import type { UmbCodeEditorElement } from '@umbraco-cms/backoffice/code-editor';
import { css, html, ifDefined, customElement, query, state } from '@umbraco-cms/backoffice/external/lit';
import { UUITextStyles, UUIInputEvent } from '@umbraco-cms/backoffice/external/uui';
import { UmbTemplateModalData, UmbTemplateModalResult } from '@umbraco-cms/backoffice/modal';
import { UmbInputEvent } from '@umbraco-cms/backoffice/events';
import { TemplateResource, TemplateResponseModel } from '@umbraco-cms/backoffice/backend-api';
import { UmbModalBaseElement } from '@umbraco-cms/internal/modal';
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';

//TODO: make a default tree-picker that can be used across multiple pickers
// TODO: make use of UmbPickerLayoutBase
@customElement('umb-template-modal')
export class UmbTemplateModalElement extends UmbModalBaseElement<UmbTemplateModalData, UmbTemplateModalResult> {
	@state()
	_id = '';

	@state()
	_template?: TemplateResponseModel;

	@query('umb-code-editor')
	_codeEditor?: UmbCodeEditorElement;

	connectedCallback() {
		super.connectedCallback();

		if (!this.data?.id) return;

		// TODO: use the template workspace instead of a custom modal. This is still to be made available as infinite editors(Modals).
		alert('This should be using the Template Workspace instead of a custom build modal.');
		this._id = this.data.id;
		this.#getTemplate();
	}

	async #getTemplate() {
		const { data } = await tryExecuteAndNotify(this, TemplateResource.getTemplateById({ id: this._id }));
		if (!data) return;

		this._template = data;
	}

	async #saveTemplate() {
		const { error } = await tryExecuteAndNotify(
			this,
			TemplateResource.putTemplateById({ id: this._id, requestBody: this._template })
		);
		if (!error) {
			console.log(`template (${this._id}) saved successfully`);
		}
	}

	private _submit() {
		if (!this._template?.id) return;

		this.#saveTemplate();
		this.modalContext?.submit({ id: this._template.id });
	}

	private _close() {
		this.modalContext?.reject();
	}

	#codeEditorInput(e: UmbInputEvent) {
		e.stopPropagation();
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		this._template.code = this._codeEditor?.code;
	}

	#templateNameInput(e: UUIInputEvent) {
		if (!this._template) return;
		this._template.name = e.target.value as string;
	}

	render() {
		return html`
			<umb-body-layout>
				<div id="layout-header" slot="header">
					<uui-input
						.value="${this._template?.name}"
						id="template-name"
						@input="${this.#templateNameInput}"
						label="template name">
						<div slot="append">${this._template?.alias}</div>
					</uui-input>
				</div>

				<uui-box>
					<div slot="headline" id="button-group">
						<uui-button look="secondary" label="To be continued">Master template: To be continued</uui-button>
						<div id="secondary-group">
							<uui-button label="To be continued" look="secondary">To be continued</uui-button>
							<uui-button label="To be continued" look="secondary">To be continued</uui-button>
							<uui-button label="To be continued" look="secondary">To be continued</uui-button>
						</div>
					</div>
					<umb-code-editor
						language="${ifDefined(this.data?.language)}"
						.code="${this._template?.content ?? ''}"
						@input="${this.#codeEditorInput}"></umb-code-editor>
				</uui-box>
				<div slot="actions">
					<uui-button label="Close" @click=${this._close}></uui-button>
					<uui-button label="Submit" look="primary" color="positive" @click=${this._submit}></uui-button>
				</div>
			</umb-body-layout>
		`;
	}

	static styles = [
		UUITextStyles,
		css`
			uui-box {
				position: relative;
				display: block;
				height: 100%;
				margin: var(--uui-size-layout-1);
			}

			#layout-header {
				display: flex;
				width: 100%;
				align-items: center;
				margin: 0 var(--uui-size-layout-1);
			}

			#template-name {
				align-items: center;
				padding: 0 var(--uui-size-space-3);
				flex-grow: 1;
			}

			umb-code-editor {
				position: absolute; /** Umb-code-editor has issues with height, this is the temp solution on this case */
				top: 75px;
				left: 0;
				bottom: 0;
				width: 100%;
			}

			#button-group {
				display: flex;
				justify-content: space-between;
			}

			#secondary-group {
				display: flex;
				gap: var(--uui-size-space-4);
			}
		`,
	];
}

export default UmbTemplateModalElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-template-modal': UmbTemplateModalElement;
	}
}
