import  CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import dbConnect from "../../../lib/dbConnect"
import User from '../../../model/User';
import { compare } from 'bcrypt';

interface IUser {
  id: string
}

export default NextAuth ({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          email: profile.email,
          posts: [],
          username: ''
        }
      }
    }),
    // ...add more providers here
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email"
        },
        password: {
          label: "Password",
          type: "password"
        }
      }, async authorize(credentials) {
        // connect to db
        // find user with email received
        // email doesnt exist
        // email does exist -> check password
        // incorrect password
        // return user

        await dbConnect();

        const user = await User.findOne({
          email: credentials?.email
        })

        if(!user) {
          throw new Error("Email is not registered")
        }

        const isPasswordCorrect = await compare(
          credentials!.password,
          user.hashedPassword
        )

        if(!isPasswordCorrect) {
          throw new Error("Password is incorrect")
        }

        return user

      }
    })
    
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {strategy: "jwt"},
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth',
    signOut: '/'
  },
  callbacks: {
    jwt: async ({token, user}) => {
      user && (token.user = user.id)
      return token
    },
    session: async ({session, token}) => {
      session.user = token.user as IUser
      console.log(session, 'session')
      return session
    }
  }
  
})
