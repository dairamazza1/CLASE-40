class ProductDTO{
    constructor(data){

        this.name = data.name,
        this.price = data.price,
        this.thumbnail = data.thumbnail
                
    }
} 
module.exports = { ProductDTO };