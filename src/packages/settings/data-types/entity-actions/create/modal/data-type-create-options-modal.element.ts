import { DATA_TYPE_REPOSITORY_ALIAS } from '../../../repository/manifests.js';
import { UmbDataTypeCreateOptionsModalData } from './index.js';
import { html, customElement, property } from '@umbraco-cms/backoffice/external/lit';
import { UUITextStyles } from '@umbraco-cms/backoffice/external/uui';
import {
	UmbModalManagerContext,
	UmbModalContext,
	UMB_FOLDER_MODAL,
	UMB_MODAL_MANAGER_CONTEXT_TOKEN,
} from '@umbraco-cms/backoffice/modal';
import { UmbLitElement } from '@umbraco-cms/internal/lit-element';

@customElement('umb-data-type-create-options-modal')
export class UmbDataTypeCreateOptionsModalElement extends UmbLitElement {
	@property({ attribute: false })
	modalContext?: UmbModalContext<UmbDataTypeCreateOptionsModalData>;

	@property({ type: Object })
	data?: UmbDataTypeCreateOptionsModalData;

	#modalContext?: UmbModalManagerContext;

	constructor() {
		super();
		this.consumeContext(UMB_MODAL_MANAGER_CONTEXT_TOKEN, (instance) => {
			this.#modalContext = instance;
		});
	}

	#onClick(event: PointerEvent) {
		event.stopPropagation();
		const folderModalHandler = this.#modalContext?.open(UMB_FOLDER_MODAL, {
			repositoryAlias: DATA_TYPE_REPOSITORY_ALIAS,
		});
		folderModalHandler?.onSubmit().then(() => this.modalContext?.submit());
	}

	// close the modal when navigating to data type
	#onNavigate() {
		this.modalContext?.submit();
	}

	#onCancel() {
		this.modalContext?.reject();
	}

	render() {
		return html`
			<umb-body-layout headline="Create Data Type">
				<uui-box>
					<!-- TODO: construct url -->
					<uui-menu-item
						href=${`section/settings/workspace/data-type/create/${this.data?.parentKey || null}`}
						label="New Data Type..."
						@click=${this.#onNavigate}>
						<uui-icon slot="icon" name="umb:autofill"></uui-icon>}
					</uui-menu-item>
					<uui-menu-item @click=${this.#onClick} label="New Folder...">
						<uui-icon slot="icon" name="umb:folder"></uui-icon>}
					</uui-menu-item>
				</uui-box>
				<uui-button slot="actions" id="cancel" label="Cancel" @click="${this.#onCancel}">Cancel</uui-button>
			</umb-body-layout>
		`;
	}

	static styles = [UUITextStyles];
}

export default UmbDataTypeCreateOptionsModalElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-data-type-create-options-modal': UmbDataTypeCreateOptionsModalElement;
	}
}
