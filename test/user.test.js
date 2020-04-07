const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Sally',
    email: 'sally@example.ca',
    password: 'thiscannotbe132',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name:'Yorguin2',
        email: 'yorguin2@example.com',
        password: 'mytelefon1111'
    }).expect(201)

    //asser that the database was changed correctly 
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //assert about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Yorguin2',
            email: 'yorguin2@example.com',
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('mytelefon1111')
})

test('Should login existing user', async () =>{
    const res = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(user).not.toBeNull()

    expect(user.tokens[1].token).toBe(res.body.token)
})

test('Should not login non-existent user', async () => {
    await request(app).post('/users/login').send({
        name: userOne.email,
        password: 'Nonexistent1'
    }).expect(400)
})

test('Should get profile user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unAuthenticated user', async () =>{
    await request(app).get('/users/me')
        .send()
        .expect(401)
})

test('Should delete user account', async () => {
    const res = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
    
})

test('Should not delete account', async () => {
    await request(app).delete('/users/me').send().expect(401)
})

test('Should upload avatar image', async () => {
     await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'test/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await User.findById(userOneId)
        expect(user.avatar).toEqual(expect.any(Buffer))
    
})

test('Should update valid user fields', async () => {
    const res = await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Yorguin3'
        })
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Yorguin3')
})

test('Should not update invalid user fields', async () => {
    const res = await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Yorguin3'
        })
        .expect(400)
})