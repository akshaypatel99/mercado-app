import { ApolloError } from 'apollo-server-micro';
import { Product, User } from '../../../db/models';
import { uploadFile } from '../../../helpers/util';

const productMutations = {
  createProduct: async (parent, args, { req }) => {
    try {
      const { input } = args;
      const { user } = req;
      console.log('user', user);
      const productData = Object.assign({}, input, { user: user._id });
      const newProduct = new Product(productData);
      const productResult = await newProduct.save();

      const productCreator = await User.findById(user.id);
      if (productCreator) {
        productCreator.userProducts.unshift({ product: productResult._id});
        await productCreator.save();
      }

      return {
        message: 'Product created!',
        product: productResult
      }
    } catch (error) {
      return error
    }
  },
  updateProduct: async (parent, args, { req }) => { 
    try {
      const { id, input } = args;
      const { user } = req;
      const { name, description, category, image, price } = input;

      const product = await Product.findById({ _id: id });
      const loggedInUser = await User.findById({ _id: user._id });

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
  deleteProduct: async (parent, args, { req }) => {
    try {
      const { id } = args;
      const { user } = req;

      const product = await Product.findById({ _id: id });
       const loggedInUser = await User.findById({ _id: user._id });

      if (product) {
        if (product.user === user._id || loggedInUser.role === 'ADMIN') {
          const productCreator = await User.findById(product.user);
          if (productCreator) {
            const productIndex = productCreator.userProducts.indexOf({ product: product._id });
            productCreator.userProducts.splice(productIndex, 1);
            await productCreator.save();
          }
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
  uploadPhoto: async (parent, args, { req }) => {
    try {
      const result = await uploadFile(args.file);
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