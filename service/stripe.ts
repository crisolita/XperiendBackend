import { PrismaClient } from "@prisma/client";
import { getUserById } from "./user";
const stripe = require('stripe')(process.env.SK_TEST);

  export const createCharge = async (user_id:number,cardNumber:string, exp_month:string,exp_year:string,cvc:string, amount:string,prisma: PrismaClient) => {
    try {
      const user= await getUserById(user_id,prisma)
      const customer = await stripe.customers.create({description:`${user_id}`
      , email:user?.email})
      const paymentMethod = await stripe.paymentMethods.create({
          type: 'card', 
          card: {
            number: cardNumber,
            exp_month: exp_month,
            exp_year: exp_year,
            cvc: cvc,
          },
        });
        const attach= await stripe.paymentMethods.attach(
          paymentMethod.id,
          {customer: customer.id}
        );
        const charge = await stripe.paymentIntents.create({
          amount: amount,
          currency: 'usd',
          payment_method:paymentMethod.id,
          confirm:true,
          customer:customer.id,
          receipt_email:user?.email
        })
        const balance = await stripe.balance.retrieve();
        console.log(balance,"un balance que debria estar bueno")
        return true;
    } catch(e) {
      console.log(e)
      return false
    }
   
    };