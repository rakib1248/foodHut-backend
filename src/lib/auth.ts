import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";

import { Role } from "../../generated/prisma/enums.js";

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,

//   port: Number(process.env.EMAIL_PORT),
//   secure: false, // Use true for port 465, false for port 587
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: Role.CUSTOMER,
        required: false,
      },

      pablicID: {
        type: "string",

        required: false,
      },
      cell: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  session: {
    cookieCache: {
      enabled: true,
    },
  },
  trustedOrigins: [
    "http://localhost:3000",
    "https://foodhub-frontend-tau.vercel.app",
  ],
  advanced: {
    useSecureCookies: true, // মাস্ট
    crossSubdomainCookie: true, // আপনার আগের ভুল স্পেলিংটি এখানে ঠিক করে নিন

    cookies: {
      sessionToken: {
        // ডকস অনুযায়ী 'session_token' অথবা Better-Auth এর ভার্সন অনুযায়ী 'sessionToken'
        attributes: {
          httpOnly: true,
          secure: true,
          sameSite: "none", // আপনার Cross-domain সমস্যার মূল সমাধান
        },
      },
    },

    // Vercel/Render প্রক্সির জন্য এটি যোগ করা ভালো
    ipAddress: {
      ipAddressHeaders: ["x-forwarded-for"],
    },
  },
});
