import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import Account from "../models/account";

import "dotenv/config";

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await Account.findById(id);

    if (!findUser) throw new Error("User not found");

    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "/api/auth/callback/google",
      scope: ["email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if profile.emails is defined and not empty
        const email =
          profile.emails && profile.emails.length
            ? profile.emails[0].value
            : null;

        if (!email) {
          // Handle case where email is not provided by Google
          return done(new Error("Email not provided by Google"), undefined);
        }

        const findUser = await Account.findOne({ googleId: profile.id });

        if (!findUser) {
          const newAccount = new Account({
            email,
            googleId: profile.id,
          });
          const newSavedAccount = await newAccount.save();
          return done(null, newSavedAccount);
        }
        return done(null, findUser);
      } catch (error) {
        console.error("Error during Google authentication:", error);
        return done(error as Error | null | undefined, undefined);
      }
    }
  )
);

export default passport;
