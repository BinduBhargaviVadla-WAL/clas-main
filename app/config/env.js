import dotenv from 'dotenv';

dotenv.config();

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

export const baseURL = process.env.REACT_APP_BASEURL;
export const env = process.env.NODE_ENV;
export const rollbarAccessToken = process.env.ROLLBAR_ACCESS_TOKEN;
export const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
export const serverAddress = new URL(process.env.REACT_APP_BASEURL);
