import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

//Transformando o  Readble em uma string
async function buffer(readable: Readable) {
  const chunks = [];
  //Aguarda novos chunks
  for await (const chunk of readable) {
    chunks.push(typeof chunk == "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
//Desabilitando o entendimento padrão do next sobre o que tá vindo da requisição que é uma Stream, que por padrão vem em json ou como um envio de um form

//Quais são os eventos importantes para a nossa aplicação
const releventEvents = new Set(["checkout.session.completed"]);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if ((req.method = "POST")) {
    const buf = await buffer(req);
    //Aqui estão todos os dados da minha requisição

    const secret = req.headers["stripe-signature"];
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        secret,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    const { type } = event;

    if (releventEvents.has(type)) {
      //como no futuro a aplicação vai precisar de outros eventos...
      try {
        switch (type) {
          case "checkout.session.completed":
            // Tipando para descobrir o que tem dentro dela
            const checkoutSession = event.data
              .object as Stripe.Checkout.Session;

            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString()
            );

            break;
          default:
            throw new Error("Unhandled event");
        }
      } catch (error) {
        return res.json({ error: "Webhook handler filed" });
      }
    }

    res.json({ received: true });
  } else {
    // Se não for um metodo de requição http POST...
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};