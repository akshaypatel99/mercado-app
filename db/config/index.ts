import { connect } from 'mongoose';

const connectDB = async () => { 
  try {
    if (!process.env.DATABASE_URL) {
      process.exit(1);
    }
    const connected = await connect(process.env.DATABASE_URL);
    console.log(`MongoDB Connected: ${connected.connection.host}`);
    return connected;
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
}

export default connectDB;