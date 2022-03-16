import dotenv from 'dotenv';
import products from './products';
import users from './users';
import { Order, Product, User } from '../db/models';

import connectDB from '../db/config';

dotenv.config(
  {
    path: __dirname + '/../.env.local',
  }
);

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers.find(user => user.role === 'ADMIN');

    const sampleProducts = products.map(product => ({
      ...product,
      user: adminUser.id,
    }));

    const createdProducts = await Product.insertMany(sampleProducts);
    createdProducts.forEach(product => {
      adminUser.userProducts.push(product.id);
    });

    await adminUser.save();
    
    console.log('Data Imported...');
    process.exit();    

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

const destroyData = async () => {
  try {
    await Product.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});

    console.log('Data Destroyed...');
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const addField = async () => {
  try {
    await Order.updateMany({}, { $set: { platformFee: 0.03 } });
    console.log('Field added...');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

addField();

const updateField = async () => {
  try {
    await Product.updateMany({}, { $set: { isSold: false } });
    console.log('Field updated...');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// updateField();

const insertProductsToDelete = async () => {
  try {
    const adminUser = await User.findOne({ role: 'ADMIN' });
    const testProducts = products.slice(0, 5);
    const productsToDelete = testProducts.map(product => ({
      ...product,
      user: adminUser.id,
      name: `DELETE-${product.name}`
    }))

    await Product.insertMany(productsToDelete)
    console.log('Products inserted...');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// insertProductsToDelete();


// if (process.argv[4] === '-d') {
//   destroyData();
// } else {
//   importData();
// }