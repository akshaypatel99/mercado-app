# Mercado

### **_A full-stack ecommerce website built with GraphQL and Next.js_**

#### Check out the live site [**here**](https://tinyurl.com/mercado-app).

## Project Overview

Mercado is an e-commerce site that allows users to buy and sell second-hand items.

Users can browse all products and product pages, but must
create a profile to upload a product they wish to sell. They
can also add and remove items to their watchlist and buy them
via a Stripe checkout. Users can keep an eye on how much
they've spent and earnt on the site via the dashboard.

Admin users can view all users, products and orders. They are
also able to add, edit, and delete products and orders.

### Stack

- React
- GraphQL
- Next.js
- MongoDB
- TypeScript
- ChakraUI

## Purpose and Goal

To build a full stack web app with CRUD functionality, utilising
the power of GraphQL for client-server interactions, and the
Next.js framework for its many benefits such as SSR, file-system
routing, API Routes and a lot of other cool features.

## Implementation & Features

#### STACK

The frontend and backend is built with the Next.jsframework. Next.js API Routes allows us to extend a Next.js frontend app by adding a backend to it. We can use Next.js API Routes to create API endpoints as a Node.js serverless function. The GraphQL server is built on an endpoint using Apollo Server, and application data is managed in the frontend with [Apollo Client](https://www.apollographql.com/docs/react/). The project was written entirely in TypeScript, which combined with GraphQL offers a high level of code introspection and type safety.

I decided to use a noSQL database, **MongoDB**, for its flexible document schemas to store the data for the application. The data is stored in a MongoDB Atlas cloud database, whilst the site is hosted on Vercel.

#### DESIGN & ACCESSIBILITY

My main focus on this project was the functionality of the front and backend, and so I used [Chakra UI](https://chakra-ui.com/) to build out the frontend much more quickly. It is a great tool, providing accessible and customisable React components, which made the UI much more user friendly.

#### AUTHENTICATION

Instead of using a ready-made authentication system, such as [NextAuth.js](https://next-auth.js.org/), I built a custom one using **Http-only cookies**, **bcryptjs** and **JWT** access and refresh tokens.

After a user signs up or logs in, the server sends an access token and a refresh token in a cookie to the user's browser. The tokens store just the user id and user role only, all other sensitive data is stored in the database. The cookies are sent with each HTTP request and checked for validation before any query or mutation is undertaken. The access token has a short lifespan and can be renewed with a valid refresh token. Once the refresh token expires the user must login again. As most sensitive data is fetched server-side, via `getServerSideProps`, authentication checks are made during this request. If the user is unauthenticated, they are redirected before they can access the page and see unauthenticated content..

#### FILE UPLOAD

Users are able to upload photos when they create a product. To upload a photo is fairly straightforward with a REST API, and a bit more challenging with GraphQL. The [graphql-upload](https://github.com/jaydenseric/graphql-upload) library allowed me to create a custom middleware for the Apollo server to handle multipart requests, i.e. uploading photos in the frontend using [apollo-upload-client](https://github.com/jaydenseric/apollo-upload-client).

#### PAYMENTS

I chose the popular payments provider [Stripe](https://stripe.com/gb) to take online payments for the site. If using the Next.js framework, Stripe suggests using their prebuilt checkout page, which is what I opted for, alternatively, a custom one can be built using the Stripe Elements API.

A Next.js API endpoint, `/api/checkout-sessions`, is added that will create a Checkout Session when the user decides to purchase a product and clicks the 'Proceed To Checkout' button. This is a Stripe API call that will create a session for the user to pay. Once the session is created, with the product and user details included, the user is redirected to the Stripe checkout page. Once the user has paid, the session is closed and the payment is processed.

After successful payment, the user is redirected back to the site and shown a success message. A webhook listens for successful completion of the payment and updates the database with the order details.

## Lessons Learned

Having only built REST APIs with Node.js prior to this
project, I've learned a lot about GraphQL, Apollo (client
and server side), and how to use it with React and Next.js. I
appreciate how powerful it is to query data from a GraphQL
API, and how it can be used to build a more robust and
scalable application.

There are several features that could be added to the app,
such as pagination and a search bar, or a filter bar. Further
the app could be made more user friendly, such as notifying
users when their product has sold, or if a product in their
watchlist has been sold. I would also like to synchronise the
apollo caches on client and server, as currently there could
be inconsistencies between the two and avoid unnecessary
refetching.
