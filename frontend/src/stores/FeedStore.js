import { writable } from 'svelte/store';

let feed = writable([
	{
		id: 1
	}
]);

export default feed;
