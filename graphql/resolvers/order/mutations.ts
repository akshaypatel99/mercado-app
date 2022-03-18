import { ApolloError } from "apollo-server-micro";
import { Order, User, Product } from "../../../db/models";
import { checkUserRole } from "../../../lib/api-util";

const orderMutations = {
  createOrder: async (parent, { input, customerId }, { user }) => {
    checkUserRole(user, ["ADMIN", "USER"]);

    try {
      const orderData = Object.assign({}, input, { user: customerId });

      const newOrder = new Order(orderData);
      const orderResult = await newOrder.save();

      const orderCreator = await User.findOneAndUpdate(
        { _id: customerId }, { $addToSet: { userOrders: orderResult._id } }
      );
      await orderCreator.save();

      return {
        message: 'Order created!',
        order: orderResult
      }
    } catch (error) {
      return error
    }
  },
  updateOrder: async (parent, { id, input }, { user }) => {
    checkUserRole(user, ["ADMIN"]);
    try {
      const { product, subTotal, deliveryCost, totalCost, deliveryAddress, paymentResult, isPaid, paidAt } = input

      const order = await Order.findById({ _id: id });

      if (order) {
        order.product = product;
        order.subTotal = subTotal;
        order.deliveryCost = deliveryCost;
        order.totalCost = totalCost;
        order.deliveryAddress = deliveryAddress;
        order.paymentResult = paymentResult;
        order.isPaid = isPaid;
        order.paidAt = paidAt;

        const updatedOrder = await order.save();

        return {
          message: 'Order updated!',
          order: updatedOrder
        }
      } else {
        throw new ApolloError('Order not found')
      }
    } catch (error) {
      return error
    }
  },
  deleteOrder: async (parent, { id }, { user }) => {
    checkUserRole(user, ["ADMIN"]);
    try {
      const order = await Order.findById({ _id: id });

      if (order && user.role === 'ADMIN') {
        const orderCreator = await User.findOneAndUpdate(
          { _id: order.user }, { $pull: { userOrders: order._id } }
        );
        await orderCreator.save();
        
        const product = await Product.findOneAndUpdate(
          { _id: order.product }, { $pull: { orders: order._id } }
        );

        await product.save();

        const foundProduct = await Product.findById(order.product);
        if (foundProduct.orders.length === 0) {
          await foundProduct.updateOne({ $set: { isSold: false, soldOn: null } });
          await foundProduct.save();
        }

        const deletedOrder = await Order.findOneAndDelete({ _id: id });

        return {
          message: 'Order deleted!',
          order: deletedOrder
        }
      } else {
        throw new ApolloError('Order not found');
      }
    } catch (error) {
      return error
    }
  }
}

export default orderMutations;