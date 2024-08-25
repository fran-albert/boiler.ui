import axios from "axios";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
var jwt = require("jsonwebtoken");

export default {
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/login`, {
                        email: credentials.email,
                        password: credentials.password,
                    });

                    console.log(response.data);

                    if (!response.data || response.data.error) {
                        throw new Error(response.data?.error || "Autenticación fallida");
                    }

                    const user = response.data;
                    const decoded = jwt.decode(user.token);

                    console.log(decoded, "decoded");

                    if (!decoded) {
                        throw new Error("Error al decodificar el token");
                    }

                    return {
                        email: decoded.email,
                        id: decoded.id,
                        roles: decoded.roles,
                        photo: user.photo,
                        token: user.token,
                    };
                } catch (error) {
                    console.error("Error during authentication", error);
                    return null;
                }
            }

        }),
    ],
    session: { strategy: "jwt", maxAge: 3600 },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.roles = user.roles;
                token.token = user.token;
                token.exp = Math.floor(Date.now() / 1000) + 3600;
            }
            if (token.exp && Date.now() / 1000 > token.exp) {
                token.isExpired = true;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id,
                    email: token.email,
                    roles: token.roles,
                };
                session.token = token.token as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/iniciar-sesion",
    },
} satisfies NextAuthConfig;
