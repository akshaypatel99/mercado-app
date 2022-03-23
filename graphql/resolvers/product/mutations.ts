import { ApolloError } from 'apollo-server-micro';
import { Product, User } from '../../../db/models';
import { checkUserRole, uploadFile } from '../../../lib/apiUtils';

const productMutations = {
  createProduct: async (parent, { input }, { user }) => {
    checkUserRole(user, ["ADMIN", "USER"]);
    try {
      const productData = Object.assign({}, input, { user: user._id });
      
      const newProduct = new Product(productData);
      const productResult = await newProduct.save();

      const productCreator = await User.findOneAndUpdate(
        { _id: user._id }, { $addToSet: { userProducts: productResult._id } }
      );
      await productCreator.save();
      
      return {
        message: 'Product created!',
        product: productResult
      }
    } catch (error) {
      return error
    }
  },
  updateProduct: async (parent, { id, input }, { user }) => {
    checkUserRole(user, ["ADMIN", "USER"]);
    try {
      const { name, description, category, image, price } = input;

      const product = await Product.findById(id);
      const loggedInUser = await User.findById(user._id);

      if (product) {
        if (product.user === user._id || loggedInUser.role === 'ADMIN') {
          product.name = name;
          product.description = description;
          product.category = category;
          product.image = image;
          product.price = price;

          const updatedProduct = await product.save();

          return {
            message: 'Product updated!',
            product: updatedProduct
          }
        } else {
          throw new ApolloError('Unauthorized update action')
        }
      } else {
        throw new ApolloError('Product not found')
      }
    } catch (error) {
      return error
    }
  },
  restockProduct: async (parent, { id }, { user }) => {
    checkUserRole(user, ["ADMIN"]);
    try {
      const product = await Product.findById(id);

      if (product) {
        product.isSold = false;
        product.soldOn = null;
        const updatedProduct = await product.save();

        return {
          message: 'Product restocked!',
          product: updatedProduct
        }
      } else {
        throw new ApolloError('Product not found')
      }
    } catch (error) {
      return error
    }
  },  
  deleteProduct: async (parent, { id }, { user }) => {
    checkUserRole(user, ["ADMIN", "USER"]);
    try {
      const product = await Product.findById(id);
      const loggedInUser = await User.findById(user._id);

      if (product) {
        if (product.user === user._id || loggedInUser.role === 'ADMIN') {
          const productCreator = await User.findOneAndUpdate(
            { _id: user._id }, { $pull: { userProducts: product._id } }
          );
          await productCreator.save();

          const deletedProduct = await Product.findOneAndDelete({ _id: id });

          return {
            message: 'Product deleted!',
            product: deletedProduct
          }
        } else {
          throw new ApolloError('Unauthorized delete action')
        }
      } else {
        throw new ApolloError('Product not found')
      }
    } catch (error) {
      return error;
    }
  },
  uploadPhoto: async (parent, { file }, { user }) => {
    checkUserRole(user, ["ADMIN", "USER"]);
    try {
      const result = await uploadFile(file);
      console.log('mutation result', result);

      return {
        message: 'Photo uploaded!',
        url: result.secure_url,
        publicId: result.public_id
      }
        
    } catch (error) {
      return error;
    }
  }
}

export default productMutations;