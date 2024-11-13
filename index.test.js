const request = require("supertest")
//const { db } = require('./db/connection');
const app = require('./src/app');
const  Restaurant = require('./models/Restaurant.js');
const syncSeed = require('./seed.js');
let quantity 





beforeAll(async () => {
    await syncSeed();
    const restaurants = await Restaurant.findAll();
    quantity = restaurants.length
})

describe('Restuarant API', () => {

   
test('Test GET /restaurants', async () => {
    const response = await request(app).get('/restaurants');
    expect(response.statusCode).toBe(200);
    expect(quantity).toBeGreaterThan(0);
    //expect((response.body[0]).toHaveProperty('cuisine'));
    })
test('Test GET /restaurants/:id', async () => {
    const response = await request(app).get('/restaurants/1');
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('AppleBees');
})
test('Test POST /restaurants', async () => {
    const response = await request(app)
        .post('/restaurants')
        .send({
            id:7,
            name: 'McDonalds',
            location: 'USA',
            cuisine: 'Fast Food'
        });
    expect(response.body.length).toEqual(quantity + 1);
}
    )
test('Test PUT /restaurants/:id', async () => {
    const response = await request(app)
        .put('/restaurants/1')
        .send({
            name: 'AppleBees',
            location: 'USA',
            cuisine: 'American'
        });
    expect(response.status).toBe(200);
    expect(response.body.cuisine).toBe('American');
})
})


