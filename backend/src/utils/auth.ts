import * as jwt from "jsonwebtoken";
require('dotenv').config();

export const APP_SECRET = `${process.env.APP_SECRET_ENV}`;

export interface AuthTokenPayload {
    userId: number
}

export function decodeAuthHeader(authHeader: String): AuthTokenPayload {
    const token = authHeader.replace("Bearer ", "");

    if(!token) {
        throw new Error("Not token found")
    }

    return jwt.verify(token, APP_SECRET) as AuthTokenPayload;
}