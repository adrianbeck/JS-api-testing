import fetch from 'node-fetch';
import { expect } from 'chai';
import { promises as fs } from 'fs';
const { writeFile, readFile } = fs;

const BASE_URL = 'https://gorest.co.in';

describe('GoRest API tests', () => {

    const token = '3b987269d5b2d4cbc365c80b12dc09327dbe9911483a6135a24ef966e4d1391f';
    var bearer = `Bearer ${token}`;

    it ('Should GET all users', async () => {

        const response = await fetch(`${BASE_URL}/public/v2/users`);

        const jsonBody = await response.json();	
		console.log(`jsonBody: ${JSON.stringify(jsonBody)}`);

        expect(response.status).eq(200);
        expect(jsonBody).to.not.be.null;
        expect(jsonBody).to.be.an('array');
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

    it ('Should add a user', async () => {

        const postUser = JSON.parse(await readFile('src/tests/payloads/postUser.json'));

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
        
        expect(response.status).eq(200);
     
    })

    it ('PATCH call - Should return 200', async () => {

        const updateUser = JSON.parse(await readFile('src/tests/payloads/updateUser.json'));

        const myHeaders = {
            'Content-Type': 'application/json',
            'Authorization': bearer
        };
        const response = await fetch(`${BASE_URL}/public/v2/users/157`,{
        method : 'PATCH',
        headers : myHeaders,
        body: JSON.stringify(updateUser)});
        expect(response.status).eq(200);

        const jsonBody = await response.json();
        console.log(`jsonBody: ${JSON.stringify(jsonBody)}`);       
    })

})