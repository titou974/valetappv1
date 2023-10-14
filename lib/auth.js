import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";
import sanitizePhoneNumber from "@/app/components/sanitizephoneNumber";
import { compare } from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/sign-in'
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phoneNumber: { label: "Numéro de téléphone", type: "tel", placeholder: "06 03 45 87 96" },
        password: { label: "Mot de passe", type: "text" },
        site: { type: "text" }
      },
      async authorize(credentials) {
        let newSession;
        if(!credentials?.phoneNumber || !credentials?.password || !credentials?.site) {
          return null;
        }
          const existingSite = await prisma.restaurant.findFirst({
            where: { id: credentials?.site }
          })
          if (!existingSite) {
            return null;
          };
          const sanitizedPhoneNumber = sanitizePhoneNumber(credentials?.phoneNumber)
          const existingUser = await prisma.user.findFirst({
            where: { phoneNumber: sanitizedPhoneNumber}
          })
          if (!existingUser) {
            return null;
          }
          const passwordMatch = await compare(credentials.password, existingUser.password);
          if (!passwordMatch) {
            return null;
          } else {
            newSession = await prisma.session.create({
              data: {
                userId: existingUser.id,
                restaurantId: credentials.site,
                // You can add other fields here if your `Session` model has them
              },
            });
          }
          console.log(newSession)
        return {
          id: existingUser.id,
          name: existingUser.name,
          siteId: credentials.site,
          sessionId: newSession.id
        }

      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          name: user.name,
          id: user.id,
          siteId: user.siteId,
          sessionId: user.sessionId
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name,
          id: token.id,
          siteId: token.siteId,
          sessionId: token.sessionId
        }
      }

    },
  },
  secret: process.env.SECRET,
}
