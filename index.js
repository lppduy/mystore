const express = require('express');
const app = express();
const session = require('express-session');
const MysqlStore = require('express-mysql-session')(session);
const multer = require('multer')

const home = require('./routes/home');
const addProduct = require('./routes/addProduct');
const editProduct = require('./routes/editProduct');
const deleteProduct = require('./routes/deleteProduct');
const tryCookie = require('./routes/tryCookie');
const userAuth = require('./routes/userAuth');

const options = {
  connectionLimit: 10,
  port: 3306,
  host: 'localhost',
  database: 'mystore',
  user: 'root',
  password: '1234',
  createDatabaseTable: true
  /**
   * if set  createDatabaseTable: false
   * =>
   * schema: {
   * tableName:...,
   * columNames: {
   * session_id:...,
   * expires:...,
   * data:...
   * }}
   */
}

const sessionStore = new MysqlStore(options);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(session({
  secret: 'lppduy',
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

app.use(multer({ storage }).single('image'));

app.use('/', home);
app.use('/add-product', addProduct);
app.use('/edit-product', editProduct);
app.use('/delete-product', deleteProduct);
app.use('/tryCookie', tryCookie)
app.use('/', userAuth);


app.use(express.static(__dirname));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});