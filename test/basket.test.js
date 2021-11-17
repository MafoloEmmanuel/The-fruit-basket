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
  //  console.log('connection has started')
});
const assert = require('assert');
const { describe, it } = require('mocha');

describe('Fruit basket ', () => {

    beforeEach(async () => {
       // console.log('*************');
        await pool.query('delete from fruit_basket');
    })
    let fruity = FruitBasket(pool)
describe('Setting fruit baskets', ()=>{
    it('Should set basket of Apples ',async()=>{
        await fruity.setFruitBasket('Apples',2.50,7);
        assert.deepEqual([
         {
           fruit_name: 'Apples',
           price: '2.50',
           quantity: 7
         }
       ], await fruity.getFruitBasket('Apples'));
     });
     
     
     it('Should set basket of Bananas ',async()=>{
         await fruity.setFruitBasket('Bananas',1.50,6);
      
         assert.deepEqual([
          {
            fruit_name: 'Bananas',
            price: '1.50',
            quantity: 6
          }
        ], await fruity.getFruitBasket('Bananas'));
      });
      
     it('Should set basket of Oranges ',async()=>{
         await fruity.setFruitBasket('Oranges',3.00,10);
      
         assert.deepEqual([
          {
            fruit_name: 'Oranges',
            price: '3.00',
            quantity: 10
          }
        ], await fruity.getFruitBasket('Oranges'));
      });
});
describe('Update the number of fruits in a given basket',()=>{
    it('Update the Apples basket', async()=>{
        await fruity.setFruitBasket('Apples',2.50,7);

        await fruity.updateNumberOfFruits('Apples', 7);
        assert.deepEqual(
            [
              {
                fruit_name: 'Apples',
                price: '2.50',
                quantity: 14
              }
            ], await fruity.getFruitBasket('Apples'))
    });

it('Update the Bananas basket', async()=>{
    await fruity.setFruitBasket('Bananas',1.50,6);

    await fruity.updateNumberOfFruits('Bananas',10);
    assert.deepEqual(
        [
          {
            fruit_name: 'Bananas',
            price: '1.50',
            quantity: 16
          }
        ], await fruity.getFruitBasket('Bananas'))
});
it('Update the basket of Oranges ',async()=>{
    await fruity.setFruitBasket('Oranges',3.00,10);
    await fruity.updateNumberOfFruits('Oranges',15);
    
 
    assert.deepEqual([
     {
       fruit_name: 'Oranges',
       price: '3.00',
       quantity: 25
     }
   ], await fruity.getFruitBasket('Oranges'));
 });
});

describe('Show the total price for a given fruit basket',()=>{
    it('Should show a total for Apples basket', async()=>{
        await fruity.setFruitBasket('Apples',2.50,7);
        assert.deepEqual( [
            {
              fruit_name: 'Apples',
              basket_total: 17.50
            }
          ], await fruity.basketTotalPrice('Apples'));
        
    });

it('Should show a total for Bananas basket', async()=>{
    await fruity.setFruitBasket('Bananas',1.50,10);
    assert.deepEqual( [
        {
          fruit_name: 'Bananas',
          basket_total: 15.00
        }
      ], await fruity.basketTotalPrice('Bananas'));
    
});
it('Should show a total for Oranges basket', async()=>{
    await fruity.setFruitBasket('Oranges',3.00,9);
    assert.deepEqual( [
        {
          fruit_name: 'Oranges',
          basket_total: 27.00
        }
      ], await fruity.basketTotalPrice('Oranges'));
    
});

});
describe('Show the sum of total price for a given fruit basket',()=>{
  it('Should show the sum of total for Apples basket', async()=>{
      await fruity.setFruitBasket('Apples',2.50,7);
      assert.deepEqual( [
          {
            fruit_name: 'Apples',
            fruit_total: 17.50
          }
        ], await fruity.SumBasketTotalPrice('Apples'));
      
  });

it('Should show the sum total for Bananas basket', async()=>{
  await fruity.setFruitBasket('Bananas',1.50,10);
  assert.deepEqual( [
      {
        fruit_name: 'Bananas',
        fruit_total: 15.00
      }
    ], await fruity.SumBasketTotalPrice('Bananas'));
  
});
it('Should show the sum total for Oranges basket', async()=>{
  await fruity.setFruitBasket('Oranges',3.00,9);
  assert.deepEqual( [
      {
        fruit_name: 'Oranges',
        fruit_total: 27.00
      }
    ], await fruity.SumBasketTotalPrice('Oranges'));
  
});

});
    after(() => {
        pool.end()
    })
})