<script lang="ts">
	import { variables } from '../variables';
	import 'papercss/dist/paper.min.css';
	import { CognitoIdentityClient, GetIdCommand, GetOpenIdTokenCommand } from '@aws-sdk/client-cognito-identity';
	import jwt_decode from 'jwt-decode';
	import { _, isLoading } from 'svelte-i18n';
	import { setupLocale } from '../i8ln';

	setupLocale();

	(<any>globalThis).handleCredentialResponse = async (googleUser: {
		credential: string;
	}): Promise<void> => {
		const decoded: {
			sub: string; // User's google account id.
			email: string;
			firstName: string;
			lastName: string;
			exp: number; // token expiration time.
		} = jwt_decode(googleUser.credential);

		debugger;
		console.log(decoded);

		const client = new CognitoIdentityClient({ region: 'us-east-1' });
		const getIdCommand = new GetIdCommand({
			AccountId: variables.awsId,
			IdentityPoolId: variables.identityId,
			Logins: { 'accounts.google.com': googleUser.credential }
		});

		const getIdResponse = await client.send(getIdCommand);

		const getOpenIdTokenCommand = new GetOpenIdTokenCommand({
			IdentityId: getIdResponse.IdentityId,
			Logins: { 'accounts.google.com': googleUser.credential }
		})

		const response  = await client.send(getOpenIdTokenCommand);

		console.log(response);
		// response.IdentityId
	};
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

{#if $isLoading}
	<div>Loading...</div>
{:else}
	<div class="row site">
		<div class="sm-12 md-3 lg-3 col">
			<div class="paper">
				<li>{$_('menu.home')}</li>
				<li>{$_('menu.articles')}</li>
				<li>{$_('menu.externalResources')}</li>
				<div
					id="g_id_onload"
					data-client_id="181396477895-mif6hcekhvhi32up28g49hve07vlvchm.apps.googleusercontent.com"
					data-callback="handleCredentialResponse"
				/>
				<div class="g_id_signin" data-type="standard" />
			</div>
		</div>
		<div class="sm-12 md-9 lg-9 col">
			<div class="paper">
				<slot />
			</div>
		</div>
	</div>
{/if}

<style>
	.site {
		max-width: 1440px;
	}
</style>
