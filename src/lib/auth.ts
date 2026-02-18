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
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["x-client-ip", "x-forwarded-for"],
      disableIpTracking: false,
    },
    useSecureCookies: true,
    disableCSRFCheck: false,
    disableOriginCheck: false,
    crossSubDomainCookies: {
      enabled: true,
      additionalCookies: ["custom_cookie"],
      domain: "example.com",
    },

    cookies: {
      session_token: {
        name: "custom_session_token",
        attributes: {
          httpOnly: true,
          secure: true,
        },
      },
    },
    trustedOrigins: [
      "http://localhost:3000",
      "https://foodhub-frontend-tau.vercel.app",
    ],
    defaultCookieAttributes: {
      httpOnly: true,
      secure: true,
    },
    // OAuth state configuration has been moved to account option
    // Use account.storeStateStrategy and account.skipStateCookieCheck instead
    cookiePrefix: "myapp",

  },
});
