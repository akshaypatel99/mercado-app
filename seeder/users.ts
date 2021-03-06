import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({
  path: __dirname + '/../.env.local',
});

type UserData = {
  name: string;
  email: string;
  password: string;
  role: string;
  userProducts: object[];
  userOrders: object[];
  userWatchlist: object[];
}

const genPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(12);
  return bcrypt.hashSync(password, salt);
};

const users: UserData[] = [
  {
    name: "Akshay Patel",
    email: "akshaypatel99@gmail.com",
    password: genPassword(process.env.ADMIN_PASSWORD),
    role: "ADMIN",
    userProducts: [],
    userOrders: [],
    userWatchlist: [],
  },
  {
    name: "Lolly P",
    email: "lolly@example.com",
    password: genPassword(process.env.ADMIN_PASSWORD),
    role: "USER",
    userProducts: [],
    userOrders: [],
    userWatchlist: [],
  },
  {
    name: "Kaskae G",
    email: "kaskae@example.com",
    password: genPassword(process.env.ADMIN_PASSWORD),
    role: "USER",
    userProducts: [],
    userOrders: [],
    userWatchlist: [],
  }
];


export default users;