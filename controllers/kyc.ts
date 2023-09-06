import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getUserById, updateUser } from "../service/user";
import { ClientRequest } from "http";
const stripe = require('stripe')(process.env.SK_TEST);
const endpointSecret=process.env.WEBHOOKSECRET_TEST;



export const createVerifySession= async (req:Request,res: Response) => {
try {
   // @ts-ignore
   const prisma = req.prisma as PrismaClient;
   // @ts-ignore
   const USER = req.user as User;
   const user= await getUserById(USER.id,prisma)
   if(!user) return res.json({error: "User no encontrado"})
// Create the session.
const verificationSession = await stripe.identity.verificationSessions.create({
  type: 'document',
  metadata: {
    user_id: user.id,
  },
});

// // Return only the client secret to the frontend.
const clientSecret = verificationSession.client_secret;
console.log(clientSecret)
// // save the clientSecret asociated with an user 
await updateUser(user.id,{clientSecret},prisma);
return res.json({data:clientSecret})
} catch (e) {
  console.log(e)
  res.status(500).json({error:e})
}
}
export const webhookControler= (req:Request, res:Response) => {
  let event;

  // Verify the event came from Stripe
  try {
    const sig = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err:any) {
    // On error, log and return the error message
    console.log(`❌ Error message: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
let ans;
  // Successfully constructed event
  switch (event.type) {
    case 'identity.verification_session.verified': {
      // All the verification checks passed
      const verificationSession = event.data.object;
      ans=verificationSession;
      break;
    }
    case 'identity.verification_session.requires_input': {
      // At least one of the verification checks failed
      const verificationSession = event.data.object;
      ans=verificationSession;

      console.log('Verification check failed: ' + verificationSession.last_error.reason);

      // Handle specific failure reasons
      switch (verificationSession.last_error.code) {
        case 'document_unverified_other': {
          // The document was invalid
          break;
        }
        case 'document_expired': {
          // The document was expired
          break;
        }
        case 'document_type_not_supported': {
          // document type not supported
          break;
        }
        default: {
          // ...
        }
      }
    }
  }

  res.json({received: true,verificationSession:ans});
};


