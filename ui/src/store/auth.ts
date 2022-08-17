import { writable } from 'svelte/store';
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
	'181396477895-nasqga0442iok7te8np9m5839tk07bbr.apps.googleusercontent.com',
	'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',
	'http://127.0.0.1:5173/auth/callback'
);

const redirectUrl = oauth2Client.generateAuthUrl({
	access_type: 'offline',
	prompt: 'consent',
	scope: ['email', 'profile']
});

const auth2 = '';
const googleUser = '';

const { subscribe, set, update } = writable(null);

const signin = () => {};

const logout = () => {};

export const user = {
	subscribe,
	signin,
	logout
};
