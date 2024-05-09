import passport from "passport";
import { Strategy } from "passport-google-oauth2";
import Account from "../models/account";
import User from "../models/user";
import bcrypt from "bcryptjs";
import { UserType } from "../shared/types";

passport.serializeUser((user: UserType | any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async function (id: string, done) {
  try {
    const user = (await User.findById(id)) as any;

    if (!user) throw new Error("User not found! (deserializer)");

    done(null, user);
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
        const email =
          profile.emails && profile.emails.length
            ? profile.emails[0].value
            : null;

        if (!email) {
          return done(new Error("Email not provided by Google"), undefined);
        }

        let user = await User.findOne({ email });

        const hashedPwd = await bcrypt.hash("GoogleAuth", 10);

        if (!user) {
          user = new User({
            email,
            fullName: profile.displayName,
            picture: profile.photos?.[0].value,
            password: hashedPwd,
          });
          await user.save();
        }

        let account = await Account.findOne({ googleId: profile.id });

        if (!account) {
          account = new Account({
            email,
            googleId: profile.id,
            userId: user._id,
            picture: profile.photos?.[0].value,
            provider: "google",
            providerAccountId: profile.id,
            refreshToken,
            accessToken,
          });
          await account.save();
        }

        return done(null, user);
      } catch (error) {
        console.error("Error during Google authentication", error);
        return done(error, undefined);
      }
    }
  )
);
