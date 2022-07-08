import fetch from 'node-fetch';
import { expect } from 'chai';

const BASE_URL = 'https://reqres.in';

describe('Reqres API Tests', () => {

    const payload = import('.payloads/body.json');
    const updateJson = import('.payloads/updateJson.json');
    const register = import('.payloads/register.json');

    it('GET call - Should get users and return 200', async () => {
		const response = await fetch(`${BASE_URL}/api/users`,
        { method: 'GET' });
		expect(response.status).eq(200);     
    });

    it('GET call - Should return 404', async () => {
        const response = await fetch(`${BASE_URL}/api`,
        {method: 'GET'});
        expect(response.status).eq(404);
    })

    it ('POST call - Should return 201 - Created', async () => {
        const response = await fetch(`${BASE_URL}/api/users`,
        {method : 'POST'},
        {body: JSON.stringify(payload)});
        expect(response.status).eq(201);
    })

    it ('PUT call - Should return 200', async () => {
        const response = await fetch(`${BASE_URL}/api/users/2`,
        {method : 'PUT'},
        {body: JSON.stringify(updateJson)});
        expect(response.status).eq(200);

        const jsonBody = await response.json();
        expect(jsonBody).to.be.an('object');
    })

    it ('PATCH call - Should return 200', async () => {
        const response = await fetch(`${BASE_URL}/api/users/2`,
        {method : 'PATCH'},
        {body: JSON.stringify(updateJson)});
        expect(response.status).eq(200);

        const jsonBody = await response.json();
        expect(jsonBody).to.be.an('object');
    })

    it('DELETE call - Should return 204', async () => {
        const response = await fetch(`${BASE_URL}/api/users/2`,
        {method: 'DELETE'});
        expect(response.status).eq(204);
    })

    it('POST call for Register - Should return 200', async () => {
        const response = await fetch(`${BASE_URL}/api/users/register`,
        {method: 'PUT'},
        {body: JSON.stringify(register.json)});
        expect(response.status).eq(200);
    })

    it('POST call for Register - Should return 400', async () => {
        const response = await fetch(`${BASE_URL}/api/users/register`,
        {method: 'POST'},
        {body: JSON.stringify({ "email": "sydney@fife"})});
        expect(response.status).eq(400);
    })

    it('DELETE call for Register - Should return 204', async () => {
        const response = await fetch(`${BASE_URL}/api/users/2`,
        {method: 'DELETE'});
        expect(response.status).eq(204);
    })   
});