import { manifests as repositoryManifests } from './package/repository/manifests.js';
import { manifests as packageBuilderManifests } from './package-builder/manifests.js';
import { manifests as packageRepoManifests } from './package-repo/manifests.js';
import { manifests as packageSectionManifests } from './package-section/manifests.js';
import type { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';

export const manifests = [
	...repositoryManifests,
	...packageBuilderManifests,
	...packageRepoManifests,
	...packageSectionManifests,
];

export const onInit: UmbEntryPointOnInit = (_host, extensionRegistry) => {
	extensionRegistry.registerMany(manifests);
};
