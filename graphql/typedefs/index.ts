import { gql } from 'apollo-server-micro'

const typeDefs = gql`
scalar Date
scalar Upload

type Query {
	# Product
	products(params: QueryParams): Products!
	product(id: ID!): Product
	userProducts: [Product]!
	userWatchList: [Product]!

	# User
	users(params: QueryParams): Users!
	user(id: ID!): User
	currentUser: User

	# Order
	orders(params: QueryParams): Orders!
	order(id: ID!): Order
	userOrders: [Order]!
}

type Mutation {
	# Product
	createProduct(input: ProductInput): ProductResult
	updateProduct(id: ID!, input: ProductInput): ProductResult
	deleteProduct(id: ID!): ProductDeleteResult
	uploadPhoto(file: Upload!): UploadedFileResponse

	# User
	signup(input: SignupInput): AuthenticationResult
	login(input: LoginInput): AuthenticationResult
	logout: Boolean
	updateUserRole(id: ID!, role: String!): UserUpdateResult
	deleteUser(id: ID!): UserDeleteResult
	toggleWatchList(id: ID!): UserUpdateResult

	# Order
	createOrder(input: OrderInput): OrderResult
	updateOrder(id: ID!, input: OrderInput): Order!
	deleteOrder(id: ID!): String!
}

## Common ##

# Interface
interface Timestamps {
	createdAt: Date!
	updatedAt: Date!
}

# Types
type Address {
	name: String
	street: String!
	city: String!
	postcode: String!
}

input AddressInput {
	name: String
	street: String!
	city: String!
	postcode: String!
}

type Info {
	count: Int
	pages: Int
	next: Int
	prev: Int
}

# Inputs
input QueryParams {
	pageSize: Int!
	page: Int!
}

# Auth Directive
directive @auth(requires: [Role] = [ADMIN]) on OBJECT | FIELD_DEFINITION


## Product ##

# Types
type Product implements Timestamps {
	_id: ID!
	user: User!
	name: String!
	description: String!
	image: String
	category: String!
	price: Float!
	isSold: Boolean!
	watchedBy: [User]

	# Interface required
	createdAt: Date!
	updatedAt: Date!
}

type Products {
	info: Info!
	results: [Product]!
}

type ProductResult {
	message: String!
	product: Product!
}

type ProductDeleteResult {
	message: String!
	product: Product
}

type UploadedFileResponse {
	message: String!
	publicId: String
	url: String
}

# Inputs
input ProductInput {
	name: String!
	description: String!
	image: String
	category: String!
	price: Float!
}

## User ##

# Enum
enum Role {
	ADMIN
	USER
}

# Types
type User implements Timestamps {
	_id: ID!
	name: String!
	email: String!
	password: String
	role: String!
	userProducts: [Product!]
	userOrders: [Order!]
	userWatchList: [Product!]

	# Interface required
	createdAt: Date!
	updatedAt: Date!
}

type Users {
	info: Info!
	results: [User]!
}

type AuthenticationResult {
	message: String
	user: User
}

type UserUpdateResult {
	message: String!
	user: User!
}

type UserDeleteResult {
	message: String!
	user: User
}

# Inputs
input SignupInput {
	name: String!
	email: String!
	password: String!
}

input LoginInput {
	email: String!
	password: String!
}

## Order ##

# Types
type Order implements Timestamps {
	_id: ID!
	user: User!
	product: Product!
	subTotal: Float!
	deliveryCost: Float!
	totalCost: Float!
	deliveryAddress: Address!
	paymentResult: PaymentResult
	isPaid: Boolean!
	paidAt: Date

	# Interface required
	createdAt: Date!
	updatedAt: Date!
}

type Orders {
	info: Info!
	results: [Order]!
}

type PaymentResult {
	id: String
	status: String
	emailAddress: String
}

type OrderResult {
	message: String!
	order: Order
}

input OrderInput {
	product: ID!
	subTotal: Float!
	deliveryCost: Float!
	totalCost: Float!
	deliveryAddress: AddressInput!
	paymentResult: PaymentResultInput
	isPaid: Boolean!
	paidAt: Date
}

input PaymentResultInput {
	id: String
	status: String
	emailAddress: String
}

`

export default typeDefs;