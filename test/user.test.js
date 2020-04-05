const request = require('supertest')
const app = require('../src/app')

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name:'Yorguin2',
        email: 'yorguin2@example.com',
        password: 'mypass1111'
    }).expect(201)
})