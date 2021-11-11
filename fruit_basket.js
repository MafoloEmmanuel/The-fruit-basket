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
    /*
let insertFruitType=async(type)=>{
    var quantity = 1;
    var checkFruit = await pool.query('select fruitname from fruit_basket where fruitname =$1 ',[type])

    if(checkFruit.rows.length<1){
    let result = await pool.query('insert into fruit_basket (fruitname,quantity) values ($1,$2)',[type,quantity])
    return result.rows
}else{
    await pool.query('update fruit_basket set quantity = quantity +1 where fruitname=$1',[type])
}
}*/
let insertFruitName = async(type)=>{
    var result = await pool.query('insert into fruit_basket (fruit_name) values ($1)', [type]);
  var checkFruit = await pool.query('select fruit_name from fruit_basket where fruit_name=$1',[type])
    console.log(checkFruit.rows)
    var quantity =1
    if(checkFruit.rows.length<1){
        let result = await pool.query('insert into fruit_basket (fruit_name,quantity) values ($1,$2)',[type,quantity])
        return result.rows
    }else{
        await pool.query('update fruit_basket set quantity = quantity +1 where fruit_name=$1',[type])
    }
    return result.rows
}
let getFruitList = async()=>{

   var result= await pool.query('select * from fruit_basket');
  console.log(result.rows)
   return result.rows
}
let countFruits = async(type)=>{
var result = await pool.query('select * from fruit_basket where fruit_name=$1',[type])

//console.log(result.rows +  "!!!!!!!!!!!!!!!!!!!")
console.log( "             " +result.rowCount  );
return result.rowCount

}
return{
    insertFruitName,
    getFruitList,
    countFruits
}

}