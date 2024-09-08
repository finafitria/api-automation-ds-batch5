const request = require('supertest');
var chai = require('chai');
chai.use(require('chai-json-schema'));
const fs = require('fs')

const assert = chai.assert
const expect = chai.expect
const should = chai.should


describe('API Test for "resful-api.dev"', () => {
    const BASE_URL = "https://api.restful-api.dev/"

    it('Test - GET All Objects', async () => {
        const response = await request(BASE_URL).get("objects")        

    //assertion
    assert.equal(response.statusCode, 200)
    assert.equal(response.body[0].name, "Google Pixel 6 Pro")

    expect(response.statusCode).to.equal(200)

    });

    it('Test - POST Store Objects', async () => {
        const response = await request(BASE_URL)
        .post("objects")
        .send( 
            {
                "name": "Apple MacBook Pro 16",
                "data": {
                   "year": 2019,
                   "price": 1849.99,
                   "CPU model": "Intel Core i9",
                   "Hard disk size": "1 TB"
                }
             }
        )
        console.log(response.statusCode);
        console.log(response.body)

    //assertion
    should(response.statusCode === 200)
    
    const schemaPath = "resources/jsonSchema/post-object-schema.json"
    const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
    assert.jsonSchema(response.body, jsonSchema)

    });

});