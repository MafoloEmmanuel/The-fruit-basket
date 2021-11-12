const { Pool } = require('pg');
const FruitBasket = require('../fruit_basket');

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = { rejectUnauthorized: false };
}
//choosing a db connection 
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:201735469@localhost:5432/coderdb'
//connect with a connection pool
const pool = new Pool({
    connectionString: connectionString,
    ssl: useSSL
});
pool.on('connect', () => {
    console.log('connection has started')
});
const mocha = require('mocha');
const assert = require('assert');

describe('Fruit basket ', () => {

    beforeEach(async () => {
        console.log('*************');
        await pool.query('delete from fruit_basket');
    })
    let fruity = FruitBasket(pool)

    it('show fruits', async () => {
        await fruity.setFruitBasket('Apple', 2.50);
        await fruity.setFruitBasket('Apple', 2.50);
        await fruity.setFruitBasket('Banana', 1.50);
        await fruity.setFruitBasket('Mango', 3.50);


        assert.equal(1, await fruity.getFruitBasket('Apple').length)
    })
    it('Show that there are two apples in an apples basket', async () => {
        await fruity.setFruitBasket('Apple',2.50);
        await fruity.setFruitBasket('Apple',2.50)
      

        assert.deepEqual([
            {
              basket_count: '2',
              fruit_name: 'Apple'
            }
          ]
          , await fruity.countFruits('Apple'));

    });
    it('Show that there are three bananas in a banana basket', async () => {
        await fruity.setFruitBasket('Banana',1.50);
        await fruity.setFruitBasket('Banana',1.50);
        await fruity.setFruitBasket('Banana',1.50);

      

        assert.deepEqual([
            {
              basket_count: '3',
              fruit_name: 'Banana'
            }
          ]
          , await fruity.countFruits('Banana'));

    });
    it('Get the total price for a given fruit basket', async() => {
        await fruity.setFruitBasket('Apple', 2.50);
        await fruity.setFruitBasket('Apple', 2.50);
        await fruity.setFruitBasket('Apple',2.50);
        await fruity.setFruitBasket('Apple',2.50);

        assert.deepEqual([
            {
              fruit_name: 'Apple',
              fruit_total: '10.00'
            }
          ], await fruity.basketTotalPrice('Apple') );
    });


    after(() => {
        pool.end()
    })
})