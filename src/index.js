require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', productRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
