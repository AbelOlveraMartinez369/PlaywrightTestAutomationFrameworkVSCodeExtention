

import { test, expect } from '@playwright/test'

//How to run a GET API Request
test('API Get Request', async ({ request }) => {

    //Get method
    const response = await request.get('https://reqres.in/api/users/2')

    //Validate 200 status response ok
    expect(response.status()).toBe(200)

    //Validate text contained in the json file
    const text = await response.text()
    expect(text).toContain('Janet')

    //Show response json message
    console.log(await response.json())

})

//How to run a POST API Request
test('API Post Request', async ({ request }) => {

    //Post method
    const response = await request.post('https://reqres.in/api/users', {
        data: {
            "name": "Abel",
            "job": "QA"
        }
    })
    //Validate 201 status response ok
    expect(response.status()).toBe(201)

    //Validate text contained in the json file
    const text = await response.text()
    expect(text).toContain('Abel')

    //Show response json message
    console.log(await response.json())

})

//How to run a PUT API Request
test('API Put Request', async ({ request }) => {

    //Put method
    const response = await request.put('https://reqres.in/api/users/2', {
        data: {
            "name": "Abel",
            "job": "QA"
        }
    })
    //Validate 200 status response ok
    expect(response.status()).toBe(200)

    //Validate text contained in the json file
    const text = await response.text()
    expect(text).toContain('Abel')

    //Show response json message
    console.log(await response.json())

})

//How to run a DELETE API Request
test('API Delete Request', async ({ request }) => {

    //Delete method
    const response = await request.delete('https://reqres.in/api/users/2')

    //Validate 204 status response ok
    expect(response.status()).toBe(204)

})