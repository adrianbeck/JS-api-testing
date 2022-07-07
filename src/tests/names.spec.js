import fetch from 'node-fetch';
import { expect } from 'chai';

const BASE_URL = 'http://qatools.ro';

describe('Names Test Suite', () => {
	let accessToken;

	it('Should Authenticate', async () => {
		const response = await fetch(
			`${BASE_URL}/api/login.php?username=tester&password=passw0rd`,
			{ method: 'POST' }
		);

		expect(response.status).eq(200);
		accessToken = response.headers.get('access-token');
		expect(accessToken).is.not.undefined;
	});

	it('Should not fetch Names if not authenticated', async () => {
		const response = await fetch(`${BASE_URL}/api/names.php`);
		expect(response.status).eq(401);
	});

	it('Should fetch Names if authenticated', async () => {
		const response = await fetch(`${BASE_URL}/api/names.php`, {
			headers: { 'access-token': accessToken },
		});

		expect(response.status).eq(200);

		const jsonBody = await response.json();
		
		console.log(`jsonBody: ${JSON.stringify(jsonBody)}`);
		
		expect(jsonBody).to.be.an('array').with.lengthOf(4);

		expect(jsonBody).deep.equals([
			'Ford Fiesta',
			'BMW X5',
			'Porsche 911',
			'Lamborghini'
		]);
	});
});