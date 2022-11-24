import * as dotenv from 'dotenv';
dotenv.config();

export interface IEnvironment {
  port: number;
  jwtSecret: string;
  jwtExpiresIn: string;
}

export const env: IEnvironment = {
  port: process.env.PORT !== undefined ? parseInt(process.env.PORT) : 3000,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRATION_TIME,
};

console.log(`🚀 ~ environment`, env);
