const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

// hosted database
mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful!');
  })
  .catch((err) => {
    console.error(err);
  });

/* mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => {
    console.log('DB connection successful!');
  })
  .catch((err) => {
    console.error(err);
  });*/
  
/*try {
  await mongoose.connect(DB);
} catch (err) {
  console.error(err);
}*/

// console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
