import fetch from 'node-fetch';
import { expect } from 'chai';

const BASE_URL = 'https://gorest.co.in';

describe('GoRest API tests', () => {

    const token = '3b987269d5b2d4cbc365c80b12dc09327dbe9911483a6135a24ef966e4d1391f';
    var bearer = `Bearer ${token}`;
    const postUser = import('./payloads/postUser.json');

    it ('Should GET all users', async () => {

        const response = await fetch(`${BASE_URL}/public/v2/users`);

        const jsonBody = await response.json();	
		console.log(`jsonBody: ${JSON.stringify(jsonBody)}`);

        expect(response.status).eq(200);
        expect(jsonBody).to.not.be.null;
        expect(jsonBody).to.be.an('array');
        //expect(jsonBody).deep.contains(
        //    {"id":4040,"name":"Sweta Talwar","email":"sweta_talwar@waelchi.com","gender":"male","status":"active"}
        //)
    });

    it ('Should GET a user by ID', async () =>{

        const response = await fetch(`${BASE_URL}/public/v2/users/2022`,
        {method: 'GET'});

        const jsonBody = await response.json();	
		console.log(`jsonBody: ${JSON.stringify(jsonBody)}`);

        expect(response.status).eq(200);
        expect(jsonBody).to.be.an('object');
        expect(jsonBody).to.have.keys('id', 'name', 'email', 'gender', 'status');
    })

    it ('Should POST a user', async () => {

        const myHeaders = {
            'Content-Type': 'application/json',
            'Authorization': bearer
        };

        const response = await fetch(`${BASE_URL}/public/v2/users`, {
            method: 'POST',
            headers : myHeaders,
            body: JSON.stringify(postUser)
          });

        const jsonBody = await response.json();
        console.log(`jsonBody: ${JSON.stringify(jsonBody)}`);
     
    })

})