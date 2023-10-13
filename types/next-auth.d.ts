import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string,
    name: string
  }
  interface Session {
    user: User & {
      id: string,
      name: string
    }
    token: {
      id: string,
      name: string
    }
  }
}
