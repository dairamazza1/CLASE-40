class DataBaseFactory{
    getConnection(data) {
      if(data == 'firebase'){
        const { ProductoDaoFirebase } = require('../daos/productos/ProductosDaoFirebase');
        return new ProductoDaoFirebase();
      }  
      if(data == 'mongodb'){
        const { ProductoDaoMongoDB } = require('../daos/productos/ProductosDaoMongoDB');
        return  new ProductoDaoMongoDB();
      }  
      if(data == 'file'){
        const { ProductoDaoArchivo } = require('../daos/productos/ProductosDaoArchivo');
        return  new ProductoDaoArchivo();
      } 

    }
}

module.exports = { DataBaseFactory }
