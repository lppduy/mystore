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

  static fetchProductById(id) {
    return pool.execute('SELECT * FROM products WHERE id = ?', [id]);
  }

  static deleteProduct(id) {
    return pool.execute('DELETE FROM products WHERE id = ?', [id]);
  }

  postData() {
    return pool.execute('INSERT INTO products (name, price, img) VALUES (?, ?, ?)', [this.name, this.price, this.image]);
  }

  editData() {
    return pool.execute('UPDATE products SET name = ?, price = ?, img = ? WHERE id = ?', [this.name, this.price, this.image, this.id]);
  }
}