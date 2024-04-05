const pool = require('../utils/database')

module.exports = class Products {

  constructor(id, name, price, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
  }

  static fetchProducts() {
    return pool.execute('SELECT * FROM products');
  }

  postData() {
    return pool.execute('INSERT INTO products (name, price, img) VALUES (?, ?, ?)', [this.name, this.price, this.image]);
  }
}