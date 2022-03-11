import { gql } from '@apollo/client';
import { GetServerSidePropsContext } from 'next';
import client from './apollo-client';

export interface MyPageContext extends GetServerSidePropsContext {
  user: any | null;
  error: Error | null;
}

const checkUser = async (context: MyPageContext, redirect: boolean, message?: string) => {
  const Cookie = context.req.headers.cookie;

  if (!Cookie && redirect) {
    context.user = null;
    context.res.writeHead(302, {
			Location: message ? `/login?message=${message}` : '/login',
		});
    context.res.end();
    return;
  }
  
  if (!Cookie) {
    context.user = null;
    return;
  }

  const { data, error } = await client.query({
    context: { headers: { Cookie } },
    query: gql`
      query CurrentUser {
        currentUser {
          _id
          name
          email
          role
          userProducts {
            _id
            name
            description
            image
            category
            price
          }
          userOrders {
            _id
            product {
              _id
              name
              price
            }
            subTotal
            deliveryCost
            totalCost
            deliveryAddress {
              name
              street
              city
              postcode
            }
            paymentResult {
              id
              status
              emailAddress
            }
            isPaid
            paidAt
            createdAt
          }
          userWatchList {
            _id
          }
        }
      } 
    `,
  });

  if (data.currentUser) {
    context.user = JSON.stringify(data.currentUser);
  } else {
    context.user = null;
  }

  if (error) {
    context.error = error;
  }

  return context;
}

export default checkUser;