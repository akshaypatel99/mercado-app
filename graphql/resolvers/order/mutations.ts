import { ApolloError } from "apollo-server-micro";
import { Order, User } from "../../../db/models";

const orderMutations = {
  createOrder: async (parent, { input }, { user }) => {
    try {
      const orderData = Object.assign({}, input, { user: user._id });

      const newOrder = new Order(orderData);
      const orderResult = await newOrder.save();

      const orderCreator = await User.findOneAndUpdate(
        { _id: user._id }, { $addToSet: { userOrders: orderResult._id } }
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
  updateOrder: async (parent, { id, input }, context) => {
    try {
      const { product, deliveryCost, totalCost, deliveryAddress, deliveryDate, paymentResult, isPaid, paidAt } = input

      const order = await Order.findById({ _id: id });

      if (order) {
        order.product = product;
        order.deliveryCost = deliveryCost;
        order.totalCost = totalCost;
        order.deliveryAddress = deliveryAddress;
        order.deliveryDate = deliveryDate;
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
    try {
      const order = await Order.findById({ _id: id });

      if (order && user.role === 'ADMIN') {
        const orderCreator = await User.findOneAndUpdate(
          { _id: order.user }, { $pull: { userOrders: order._id } }
        );
        await orderCreator.save();

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