import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import { app } from '../app';

declare global {
    namespace NodeJS {
        interface Global {
            signin(): string[];
        }
    }
}

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'asd';
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async () => { 
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => { 
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = () => {
    // const email = 'test@google.com';
    // const password = 'test123';

    // const response =  await request(app)
    //     .post('/api/users/signup')
    //     .send({ email, password })
    //     .expect(201);

    // const cookie = response.get('Set-Cookie');
    // return cookie;

    // Build a JWT payload, { id, email }
    const payload = {
        id: 'lsdfsf123233',
        email: 'test@test.com'
    }

    // Create the JWT 
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // Build session object, { jwt: MY_JWT }
    const session = { jwt: token };

    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session);

    // Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // return a string thats the cookie with the encoded data
    return [`express:sess=${base64}`];
}