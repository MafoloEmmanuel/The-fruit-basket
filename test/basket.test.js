const {Pool} = require('pg');
const FruitBasket = require('../fruit_basket');

let useSSL =false;
 let local = process.env.LOCAL || false;
 if(process.env.DATABASE_URL && !local){
     useSSL = { rejectUnauthorized: false };
 }
 //choosing a db connection 
 const connectionString = process.env.DATABASE_URL || 'postgresql://coder:201735469@localhost:5432/coderdb'
 //connect with a connection pool
     const pool = new Pool({
         connectionString: connectionString,
       ssl:  useSSL
     });
pool.on('connect', ()=>{
    console.log('connection has started')
});
const mocha = require('mocha');
const assert = require('assert');

describe('Fruit basket ', ()=>{

beforeEach(async()=>{
console.log('*************');
await pool.query('delete from fruit_basket');
})
let fruity = FruitBasket(pool)

    it('show fruits', async()=>{
await fruity.insertFruitName('Apple');
await fruity.insertFruitName('Apple');
await fruity.insertFruitName('Banana');
await fruity.insertFruitName('Mango');


assert.equal(1, await fruity.getFruitList().rows.length)
    })
it('count fruits',async()=>{
    await fruity.insertFruitName('Apple');
    await fruity.insertFruitName('Apple');
    await fruity.insertFruitName('Banana');
    await fruity.insertFruitName('Mango');

    assert.equal(2, await fruity.countFruits('Apple'));
    assert.equal(1, await fruity.countFruits('Banana'));

})
    after(()=>{
        console.log('@@@@@@@@@@@@@@@@@')
        pool.end()
    })
})