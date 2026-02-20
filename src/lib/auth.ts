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
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24 ,
    // cookieCache: {
    //   enabled: true,
    //   maxAge: 5 * 60, // 5 minutes
    // },
  },
  trustedOrigins: async (request) => {
    const origin = request?.headers.get("origin");

    const allowedOrigins = [
      "http://localhost:3000",
      "https://foodhub-frontend-tau.vercel.app",
      "https://foodhub-frontend.netlify.app",
    ].filter(Boolean);

    // Check if origin matches allowed origins or Vercel pattern
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      /^https:\/\/.*\.vercel\.app$/.test(origin)
    ) {
      return [origin];
    }

    return [];
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false,
    },
    disableCSRFCheck: true, // Allow requests without Origin header (Postman, mobile apps, etc.)
  },

  // advanced: {
  //   useSecureCookies: true,
  //   crossSubDomainCookies: {
  //     enabled: true,
  //   },
  //   defaultCookieAttributes: {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: "none",
  //   },

  //   // cookies: {
  //   //   sessionToken: {
  //   //     attributes: {
  //   //       httpOnly: true,
  //   //       secure: true,
  //   //       sameSite: "none",
  //   //     },
  //   //   },
  //   //   session_token: {
  //   //     attributes: {
  //   //       // partitioned: true,
  //   //       httpOnly: true,
  //   //       secure: true,
  //   //       sameSite: "none",
  //   //     },
  //   //   },
  //   // },
  //   // ipAddress: {
  //   //   ipAddressHeaders: ["x-forwarded-for"],
  //   // },
  // },
});
