const products = [
  {
    id: 1,
    name: 'Apple',
    price: 1.99,
    img: "apples.jpg"
  },
  {
    id: 2,
    name: 'Banana',
    price: 2.99,
    img: "bananas.jpg"
  },
  {
    id: 3,
    name: 'Orange',
    price: 3.99,
    img: "orange.jpg"
  },
  {
    id: 4,
    name: 'Pineapple',
    price: 4.99,
    img: "pineapple.jpg"
  },
  {
    id: 5,
    name: 'Strawberry',
    price: 5.99,
    img: "strawberry.jpg"
  }
];

const Products = require('../models/products');

exports.renderProducts = (req, res) => {
  Products.fetchProducts()
    .then(([rows, fieldData]) => {
      res.render('home', { products: rows });

    })
    .catch(err => console.log(err));

}

exports.renderAddProduct = (req, res) => {
  res.render('add-product');
}

exports.postAddProduct = (req, res) => {
  const { name, price, image } = req.body;
  const products = new Products(null, name, price, image);
  products.postData()
    .then(() => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
}

exports.renderEditProduct = (req, res) => {
  res.render('edit-product',
    {
      product: products[--req.params.id]
    });
}