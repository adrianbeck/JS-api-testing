import fetch from 'node-fetch';
import { expect } from 'chai';

const BASE_URL = 'https://reqres.in';

describe('Reqres API Tests', () => {

    const body = import('.payloads/body.json');
    const updateJson = import('.payloads/updateJson.json');
    const register = import('.payloads/register.json');

    it('GET call - Should get users and return 200', async () => {
		const response = await fetch(`${BASE_URL}/api/users`,
        { method: 'GET' });
		expect(response.status).eq(200);
        const jsonBody = await response.json();	
		console.log(`jsonBody: ${JSON.stringify(jsonBody)}`);

        
        expect(jsonBody).to.not.be.null;
        //assert by propery and value
        expect(jsonBody).to.have.property('page', 1);

    });

    it('GET call - Should return 404', async () => {
        const response = await fetch(`${BASE_URL}/api`,
        {method: 'GET'});
        expect(response.status).eq(404);
    })

    it ('POST call - Should return 201 - Created', async () => {
        const response = await fetch(`${BASE_URL}/api/users`,
        {method : 'POST'},
        {body: JSON.stringify(body)});
        expect(response.status).eq(201);

        const jsonBody = await response.json();
        console.log(`jsonBody: ${JSON.stringify(jsonBody)}`);

        expect(jsonBody).to.not.be.null;
        //assert by keys
        expect(jsonBody).to.have.keys('id', 'createdAt')
    })

    it ('PUT call - Should return 200', async () => {
        const response = await fetch(`${BASE_URL}/api/users/2`,
        {method : 'PUT'},
        {body: JSON.stringify(updateJson)});
        expect(response.status).eq(200);

        const jsonBody = await response.json();
        console.log(`jsonBody: ${JSON.stringify(jsonBody)}`);
        //assert by single key
        expect(jsonBody).to.have.key('updatedAt');
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

    it('POST call for Register - Should return 201', async () => {
        const response = await fetch(`${BASE_URL}/api/users/register`,
        {method: 'PUT'},
        {body: JSON.stringify(register.json)});
        expect(response.status).eq(201);
    })

    // it('POST call for Register - Should return 400', async () => {
    //     const response = await fetch(`${BASE_URL}/api/users/register`,
    //     {method: 'POST'},
    //     {body: JSON.stringify({ "email": "sydney@fife"})});
    //     const jsonBody = await response.json();
    //     console.log(`jsonBody: ${JSON.stringify(jsonBody)}`);
    //     expect(response.status).eq(400);
    //     expect(response.statusText).eq('Bad Request');
    // })

    it('DELETE call for Register - Should return 204', async () => {
        const response = await fetch(`${BASE_URL}/api/users/2`,
        {method: 'DELETE'});
        expect(response.status).eq(204);
    })   
});