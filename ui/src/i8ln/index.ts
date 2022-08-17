import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

export const setupLocale = () => {
	register('en', () => import('./en.json'));

	init({
		fallbackLocale: 'en',
		initialLocale: getLocaleFromNavigator()
	});
};
