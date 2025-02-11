import axios from "@/lib/service/axios";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
  try {
    const res = await axios.post("/auth/refresh-token", {
      refreshToken: token.backendToken.refreshToken,
    });

    return {
      ...token,
      backendToken: {
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        expiresAt: Date.now() + 15 * 60 * 1000,
      },
    };
  } catch (error) {
    return { ...token, error: "RefreshTokenError" };
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        mail: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.mail || !credentials?.password) {
          return null;
        }

        try {
          const res = await axios.post("/auth/login", {
            mail: credentials.mail,
            password: credentials.password,
          });
          return {
            id: res.data.id,
            name: res.data.name,
            mail: res.data.mail,
            backendToken: {
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
              expiresAt: res.data.expiresAt,
            },
          };
        } catch (error) {
          throw new Error("Usuário e/ou Senha Icorreto");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }

      if (Date.now() < token.backendToken.expiresAt) {
        return token;
      }

      return await refreshToken(token);
    },
    async session({ session, token }) {
      session.user = token.user;
      session.backendToken = token.backendToken;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : `${baseUrl}/home`;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
};

export default authOptions;
