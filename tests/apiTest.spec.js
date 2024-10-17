const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');

const ajv = new Ajv();

//GET
test('GET Request', async ({request}) => {
    const response = await request.get("https://reqres.in/api/users?page=2")
    console.log(await response.json()) ;
  
    const responseBody = await response.json();
    const schema = {
      type: 'object',
      properties: {
        page: { type: 'number' },
        data: { type: 'array' },
      },
      required: ['page', 'data'],
    };
  
    const validate = ajv.compile(schema);
    const valid = validate(responseBody);
    expect(valid).toBe(true);
  });

//POST
  test('POST Create User', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/users', {
      data: {
        name: 'morpheus',
        job: 'leader'
      },
    });
    expect(response.status()).toBe(201);
  
    const responseBody = await response.json();
    const schema = {
      type: 'object',
      properties: {
        name: { type: 'string' },
        job: { type: 'string' },
        id: { type: 'string' },
        createdAt: { type: 'string' },
      },
      required: ['name', 'job', 'id', 'createdAt'],
    };
  
    const validate = ajv.compile(schema);
    const valid = validate(responseBody);
    expect(valid).toBe(true);
  });

// DELETE
  test('DELETE User', async ({ request }) => {
    const response = await request.delete('https://reqres.in/api/users/2');
    expect(response.status()).toBe(204);
  });
  
  // PUT
  test('PUT Update User', async ({ request }) => {
    const response = await request.put('https://reqres.in/api/users/2', {
      data: {
        name: 'morpheus',
        job: 'zion resident'
      },
    });
    expect(response.status()).toBe(200);
  
    const responseBody = await response.json();
    const schema = {
      type: 'object',
      properties: {
        name: { type: 'string' },
        job: { type: 'string' },
        updatedAt: { type: 'string' },
      },
      required: ['name', 'job', 'updatedAt'],
    };
  
    const validate = ajv.compile(schema);
    const valid = validate(responseBody);
    expect(valid).toBe(true);
  });
  
  

  