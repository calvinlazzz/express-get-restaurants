const request = require("supertest")
//execSync('npm run seed'); // Refill data for a clean test

const { db } = require('./db/connection');
const app = require('./src/app');
const  Restaurant = require('./models/Restaurant.js');
const syncSeed = require('./seed.js');
let quantity 





beforeAll(async () => {
    await syncSeed();
    const restaurants = await Restaurant.findAll();
    quantity = restaurants.length
    console.log(quantity)
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
    expect(response.status).toBe(200);
    const restaurants = await Restaurant.findAll();
    expect(restaurants.length).toEqual(quantity + 1);
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
test('Test POST /restaurants with empty name', async () => {
    const response = await request(app)
        .post('/restaurants')
        .send({
            id: 8,
            name: '',
            location: 'USA',
            cuisine: 'Fast Food'
        });
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toContain('Name is required');

});

test('Test POST /restaurants with empty location', async () => {
    const response = await request(app)
        .post('/restaurants')
        .send({
            id: 9,
            name: 'Burger King',
            location: '',
            cuisine: 'Fast Food'
        });
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('Location is required');
});

test('Test POST /restaurants with empty cuisine', async () => {
    const response = await request(app)
        .post('/restaurants')
        .send({
            id: 10,
            name: 'KFC',
            location: 'USA',
            cuisine: ''
        });
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toContain('Cuisine is required');
});
})


