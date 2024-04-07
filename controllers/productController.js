const DUMMY_PRODUCTS = [
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
  // const cookie = req.get('Cookie')
  // .split(';')[0].split('=')[1];
  const cookie = req.session.isLoggedIn;

  Products.fetchProducts()
    .then(([rows, fieldData]) => {
      res.render('home', {
        products: rows,
        isLoggedIn: cookie
      });

    })
    .catch(err => console.log(err));
}

exports.renderAddProduct = (req, res) => {
  const cookie = req.session.isLoggedIn;

  res.render('add-product', { isLoggedIn: cookie });
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
  Products.fetchProductById(req.params.id)
    .then(([productData, fieldData]) => {
      console.log(productData[0])
      res.render('edit-product', { product: productData[0] });
    })
    .catch(err => console.log(err));
}

exports.editProduct = (req, res) => {
  const { name, price, image } = req.body;
  const product = new Products(req.params.id, name, price, image);

  product.editData()
    .then(() => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
}

exports.deleteProduct = (req, res) => {
  Products.deleteProduct(req.params.id)
    .then(() => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
}