import request from 'supertest';

import { app } from '../../app';

it('fails when a email that does not exist is supplied', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({ 
            email: 'test@google.com',
            password: 'test123'
        })
        .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({ 
            email: 'test@google.com',
            password: 'test123'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@google.com',
            password: '45435435'
        })
        .expect(400);
});

it('response with a cookie when given valid credentials', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({ 
            email: 'test@google.com',
            password: 'test123'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@google.com',
            password: 'test123'
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});