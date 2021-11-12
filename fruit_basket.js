const {Pool} = require('pg');


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

module.exports = function FruitBasket(pool) {
  
let setFruitBasket= async(type,price)=>{
    var quantity = 1
   var result = await pool.query('insert into fruit_basket (fruit_name,price,quantity) values ($1,$2,$3)', [type,price,quantity]);
   return result.rows
}

//Find all the fruit baskets for a given fruit type. 
let getFruitBasket = async(type)=>{

   var result= await pool.query('select * from fruit_basket where fruit_name=$1',[type]);
  console.log(result.rows)
   return result.rows
}

//Update the number of fruits in a given basket.

let updateNumberOfFruits = async(type)=>{
    var sql =' update fruit_basket set quantity=quantity + 1 where fruit_name=$1'
    var result = await pool.query(sql,[type])
    return result.rows
}

//  Show the total price for a given fruit basket.
let basketTotalPrice =async(type)=>{
    var sql = 'select fruit_name, sum(price) as fruit_total from fruit_basket where fruit_name=$1 group by fruit_name';
var result = await pool.query(sql,[type]);
console.log(result.rows)
return result.rows
}
// count how many fruits in each basket
let countFruits = async(type)=>{
var result = await pool.query('select fruit_name,count(*) as basket_count from fruit_basket where fruit_name=$1 group by fruit_name',[type])

return result.rows

}

return{
    setFruitBasket,
    getFruitBasket,
    countFruits,
    updateNumberOfFruits,
    basketTotalPrice
}

}