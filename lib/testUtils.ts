function fakeProductListItem() {
  return {
    _id: 'test',
    name: 'Test product',
    price: 1234.56,
    image: 'test.jpg',
    category: 'Test category',
    isNew: true,
  }
}

function fakeProduct() {
  return {
    _id: 'test',
    name: 'Test product',
    price: 1234.56,
    image: 'test.jpg',
    category: 'Test category',
    description: 'This is a test product',
    user: {
      _id: 'testUserId',
      name: 'Test user',
    },
    watchedBy: [
      { _id: '1' } 
    ],
    isSold: false,
  }
}

function fakeUser() {
  return {
    _id: 'test',
    name: 'Test User',
    email: 'user@test.com',
    role: 'USER',
  }
}



export {
  fakeProductListItem,
  fakeProduct,
  fakeUser,
}