const express = require('express')
const cors = require('cors')

require('dotenv').config()

// MIDDLEWARE
const app = express()
const API_KEY = process.env.STRIPE_API_KEY
const stripe = require('stripe')(API_KEY)
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.static('public'))
app.use(express.json())

app.post('/checkout', async (req, res) => {
  // format line items for stripe
  const items = req.body.items
  let lineItems = []
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    })
  })

  // create payment session
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  })

  // send payment session to user for checkout
  res.send(
    JSON.stringify({
      url: session.url,
    }),
  )
})

app.listen(port, () => console.log(`Listening on port: ${port}`))
