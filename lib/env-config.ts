let uri: string;

if(process.env.NODE_ENV === 'development') {
  uri = 'http://localhost:3000/api/graphql';
} else {
  uri = 'https://mercado-app.vercel.app/api/graphql';
}

export default uri;