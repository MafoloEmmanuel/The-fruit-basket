
module.exports = function FruitBasket(pool) {

    // insert fruit type, price and number of fruits
    let setFruitBasket = async (type, price, qty) => {
            var result = await pool.query('insert into fruit_basket (fruit_name,price,quantity) values ($1,$2,$3)', [type, price, qty]);
            return result.rows
        
    }

    //Find all the fruit baskets for a given fruit type. 
    let getFruitBasket = async (type) => {

        var result = await pool.query('select fruit_name,price,quantity  from fruit_basket where fruit_name=$1', [type]);
       // console.log(result.rows)
        return result.rows
    }

    //Update the number of fruits in a given basket.

    let updateNumberOfFruits = async (type, qty) => {
        var sql = ' update fruit_basket set quantity=quantity + $2 where fruit_name=$1'
        var result = await pool.query(sql, [type, qty])
        return result.rows
    }

// Show the total price for a given fruit basket.

let basketTotalPrice =async(type)=>{
    var sql = 'select fruit_name,(price * quantity) as basket_total from fruit_basket where fruit_name= $1';
    var result = await pool.query(sql,[type])
    return result.rows
}

    //  Show the sum of total price for a given fruit basket.
    let SumBasketTotalPrice = async (type) => {
        var sql = 'select fruit_name, sum(price * quantity ) as fruit_total from fruit_basket where fruit_name=$1 group by fruit_name';
        var result = await pool.query(sql, [type]);
     //   console.log(result.rows)
        return result.rows
    }
    
    

    return {
        setFruitBasket,
        getFruitBasket,
        updateNumberOfFruits,
        basketTotalPrice,
        SumBasketTotalPrice
    }

}