import { ApolloError } from "apollo-server-micro";
import { Order, User } from "../../../db/models";

const orderMutations = {
  createOrder: async (parent, { input }, { user }) => {
    try {
      const orderData = Object.assign({}, input, { user: user._id });
      const newOrder = new Order(orderData);
      const orderResult = await newOrder.save();

      const orderCreator = await User.findById(user.id);
      if (orderCreator) {
        orderCreator.userOrders.unshift({ order: orderResult._id});
        await orderCreator.save();
      }

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
      const { orderItems, orderTotal, deliveryCost, totalCost, deliveryAddress, deliveryDate, paymentResult, isPaid, paidAt } = input

      const order = await Order.findById({ _id: id });

      if (order) {
        order.orderItems = orderItems;
        order.orderTotal = orderTotal;
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
  deleteOrder: async (parent, { id }, context) => {
    try {
      const order = await Order.findById({ _id: id });

      if (order) {
        const orderCreator = await User.findById(order.user);
        if (orderCreator) {
          const orderIndex = orderCreator.userOrders.indexOf({ order: order._id });
          orderCreator.userOrders.splice(orderIndex, 1);
          await orderCreator.save();
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