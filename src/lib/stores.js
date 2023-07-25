import { writable } from "svelte/store";
//import type { Writable } from "svelte/store";

export const loading = writable(false)
export let priceStore = writable({});
