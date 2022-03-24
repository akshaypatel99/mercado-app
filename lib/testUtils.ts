function fakeProductListItem() {
  return {
    _id: 'test',
    name: 'Test product',
    price: 1234.56,
    image: 'test.jpg',
    category: 'Other',
    isNew: true,
  }
}

function fakeProduct() {
  return {
    _id: 'test',
    name: 'Test product',
    price: 1234.56,
    image: 'https://www.example.com/test.jpg',
    category: 'Other',
    description: 'This is a test product',
    user: {
      _id: 'testProductCreatorId',
      name: 'Test ProductCreator',
    },
    watchedBy: [
      { _id: 'testUserId' },
    ],
    isSold: false,
  }
}

function fakeUser() {
  return {
    _id: 'testUserId',
    name: 'Test User',
    email: 'user@test.com',
    role: 'USER',
  }
}

function fakeProductCreator() {
  return {
    _id: 'testProductCreatorId',
    name: 'Test ProductCreator',
    email: 'productCreator@test.com',
    role: 'USER',
  }
}

function fakeAdminUser() {
  return {
    _id: 'testAdminId',
    name: 'Test Admin',
    email: 'admin@test.com',
    role: 'ADMIN',
  }
}



export {
  fakeProductListItem,
  fakeProduct,
  fakeUser,
  fakeAdminUser,
  fakeProductCreator
}