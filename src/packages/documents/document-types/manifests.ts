import { manifests as entityActionsManifests } from './entity-actions/manifests.js';
import { manifests as menuItemManifests } from './menu-item/manifests.js';
import { manifests as modalManifests } from './modals/manifests.js';
import { manifests as repositoryManifests } from './repository/manifests.js';
import { manifests as treeManifests } from './tree/manifests.js';
import { manifests as workspaceManifests } from './workspace/manifests.js';

export const manifests = [
	...entityActionsManifests,
	...menuItemManifests,
	...modalManifests,
	...repositoryManifests,
	...treeManifests,
	...workspaceManifests,
];
