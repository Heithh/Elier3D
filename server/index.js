const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const elierRoutes = require('./routes/elierRoutes');

dotenv.config();

const app = express();
const stripe = require('stripe')(process.env.STRIPE_KEY)
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const storeItems = new Map([
  [1, {priceInCents: 11900, name: 'tshirt'}],
  [2, {priceInCents: 15000, name: 'hoodie'}],
  [3, {priceInCents: 25500, name: 'sneaker'}]
]);


app.use('/api/elier', elierRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello Elier customers' });
});

//Checkout Stripe Session
app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `${process.env.CLIENT_URL}/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})










app.listen(8080, () => console.log('Server has started on port 8080'));

