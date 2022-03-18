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

// const importData = async () => {
//   try {
//     await Product.deleteMany({});
//     await User.deleteMany({});
//     await Order.deleteMany({});

//     const createdUsers = await User.insertMany(users);
//     const adminUser = createdUsers.find(user => user.role === 'ADMIN');

//     const sampleProducts = products.map(product => ({
//       ...product,
//       user: adminUser.id,
//     }));

//     const createdProducts = await Product.insertMany(sampleProducts);
//     createdProducts.forEach(product => {
//       adminUser.userProducts.push(product.id);
//     });

//     await adminUser.save();
    
//     console.log('Data Imported...');
//     process.exit();    

//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// }

// const destroyData = async () => {
//   try {
//     await Product.deleteMany({});
//     await User.deleteMany({});
//     await Order.deleteMany({});

//     console.log('Data Destroyed...');
//     process.exit();

//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

// const addField = async () => {
//   try {
//     await Product.updateMany({}, { $set: { orders: [] } });
//     console.log('Field added...');
//     process.exit();
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

// addField();

// const updateProducts = async () => {
//   try {
//     const products = await Product.find({ isSold: true });
//     const orders = await Order.find({});

//     products.forEach(async (product) => {
//       const foundProduct = await Product.findById(product._id);
//       const order = orders.find(order => order.product.toString() === foundProduct._id.toString());
//       await foundProduct.updateOne({ $addToSet: { orders: order._id } });
//       await foundProduct.save();
//     });
    
//     console.log('Products updated...');
//     process.exit();
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

// updateProducts();

// const updateField = async () => {
//   try {
//     await Product.updateMany({}, { $set: { isSold: false } });
//     console.log('Field updated...');
//     process.exit();
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

// updateField();

const renameField = async () => {
  try {
    await User.updateMany({}, { $rename: { "userWatchList": "userWatchlist" } });
    console.log('Field renamed...');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

renameField();


// const insertProductsToDelete = async () => {
//   try {
//     const adminUser = await User.findOne({ role: 'ADMIN' });
//     const testProducts = products.slice(0, 10);
//     const productsToDelete = testProducts.map(product => ({
//       ...product,
//       user: adminUser.id,
//       name: `DELETE-${product.name}`
//     }))

//     await Product.insertMany(productsToDelete)
//     console.log('Products inserted...');
//     process.exit();
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

// insertProductsToDelete();


// if (process.argv[4] === '-d') {
//   destroyData();
// } else {
//   importData();
// }