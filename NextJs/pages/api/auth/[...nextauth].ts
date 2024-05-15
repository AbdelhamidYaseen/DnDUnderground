import NextAuth, {  User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {jwtDecode} from "jwt-decode"
import { getJWT } from "lib/utils"

import { Session } from 'next-auth';

// Define a new type by extending the Session type
export interface CustomSession extends Session {
  id?: string; // Define the 'id' property
  access_token?: string; // Define the 'accessToken' property
}


export default NextAuth({
  pages: {
    signIn: "/login",
  },
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Drupal",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const formData = new URLSearchParams();
        formData.append("grant_type", "password");
        formData.append("client_id", process.env.DRUPAL_CLIENT_ID);
        formData.append("client_secret", process.env.DRUPAL_CLIENT_SECRET);
        formData.append("username", credentials.username);
        formData.append("password", credentials.password);

        // Get access token from Drupal.
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/oauth/token`,
          {
            method: "POST",
            body: formData,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        const data = await response.json();
        //console.log(response)
        const test = await fetch(
          `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/oauth/debug?_format=json`,
          {
            method: "GET",
            headers:{
              "Authorization": `Bearer ${data.access_token}`
            }
          }
        );
        const testData = await test.json();
          //console.log(testData)
        if (!response.ok) {
          console.log("response NOT OK, incorrect credentials");
          return null;
        }
        // Return both user data and testData
        return { 
          id: testData.id,
          accessToken: data.access_token
          ,
          ...data // assuming you want to return other user data
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Here we merge the user data including testData into the token
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken
        // add other properties if needed
      }
      return token;
    },
    async session({ session, token, user }) {
      // Here we set testDataId if it's available in the token

      const customSession = session as CustomSession; // Cast session to CustomSession
      customSession.id = token.id as string;
      customSession.accessToken = token.accessToken;
      return customSession;    
    },
  },
});