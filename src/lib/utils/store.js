import { writable } from 'svelte/store';

export const pages = writable([]);
export const users = writable([]);
export const user = writable({});
export const scrollPosition = writable(0);
export const isPanelVisible = writable(false);
export const canvasElements = writable([])
export const allPages = writable([])
export const assets = writable([])
export const openFolders = writable([]);
export const folders = writable([])
export const activePage = writable(null);
export const MAX = writable(false);