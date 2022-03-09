import * as jwt from "jsonwebtoken";

export const APP_SECRET = "bRc52pstWVEr7aVLAj2n3W88H8Z8Eg2bGS4B6726N8pgaAusmU36yrA2";

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