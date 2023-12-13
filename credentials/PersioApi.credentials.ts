import type {
	ICredentialDataDecryptedObject,
	ICredentialType,
	IHttpRequestOptions,
	INodeProperties,
} from 'n8n-workflow';

export class PersioApi implements ICredentialType {
	name = 'persioApi';

	displayName = 'Persio API';

	documentationUrl = 'https://persio.io/docs/auth';

	properties: INodeProperties[] = [
		{
			displayName: 'Write Key',
			name: 'writekey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	async authenticate(
		credentials: ICredentialDataDecryptedObject,
		requestOptions: IHttpRequestOptions,
	): Promise<IHttpRequestOptions> {
		const base64Key = Buffer.from(`${credentials.writekey}:`).toString('base64');
		requestOptions.headers!.Authorization = `Basic ${base64Key}`;
		return requestOptions;
	}
}
