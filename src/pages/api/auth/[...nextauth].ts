import { query as q} from 'faunadb';

import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import { Fauna } from '../../../services/fauna';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user'
    }),
  ],
  
  callbacks: {
    // async session(session){
    //   const userActiveSubscription = await Fauna.query(
    //     q.Get(
    //       q.Match(
    //         q.Index('subscription_by_user_ref'),
    //         q.Select()
    //       )
    //     )
    //   )
    //   return session
    // }
      async signIn(user, account, profile) {
        const { email } = user;
        try{
            await Fauna.query(
               q.If(
                   q.Not(
                       q.Exists(
                        q.Match(
                            q.Index('user_by_email'),
                           q.Casefold(email)
                        )
                       )
                   ),
                   q.Create(
                       q.Collection('users'), 
                       {data: { email }}
                   ),
                    q.Get(
                        q.Match(
                            q.Index('user_by_email'),
                           q.Casefold(email)
                        ) 
                    )
               )
            )

            return true
        }catch{
            return false
        }
 
      }
  }

})