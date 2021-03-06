////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - If the user types something into shipping, then checks the checkbox, then
//   unchecks the checkbox, ensure the field has the information from
//   before clicking the checkbox the first time
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import serializeForm from 'form-serialize'

function CheckoutForm() {
  const [billingName, setBillingName] = useState('')
  const [billingState, setBillingState] = useState('')
  const [shippingName, setShippingName] = useState('')
  const [shippingState, setShippingState] = useState('')
  const [shippingSameAsBilling, setShippingSameAsBilling] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    const values = serializeForm(event.target, { hash: true })
    console.log(values)
  }

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Billing Address</legend>
          <p>
            <label>
              Billing Name:{' '}
              <input
                type="text"
                name="billingName"
                defaultValue={billingName}
                onChange={event => setBillingName(event.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              Billing State:{' '}
              <input
                type="text"
                size="3"
                name="billingState"
                defaultValue={billingState}
                onChange={event => setBillingState(event.target.value)}
              />
            </label>
          </p>
        </fieldset>

        <br />

        <fieldset>
          <label>
            <input
              type="checkbox"
              onChange={event => setShippingSameAsBilling(event.target.checked)}
            />{' '}
            Same as billing
          </label>
          <legend>Shipping Address</legend>
          <p>
            <label>
              Shipping Name:{' '}
              <input
                type="text"
                name="shippingName"
                value={shippingSameAsBilling ? billingName : shippingName}
                readOnly={shippingSameAsBilling}
                onChange={event => setShippingName(event.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              Shipping State:{' '}
              <input
                type="text"
                size="2"
                name="shippingState"
                value={shippingSameAsBilling ? billingState : shippingState}
                readOnly={shippingSameAsBilling}
                onChange={event => setShippingState(event.target.value)}
              />
            </label>
          </p>
        </fieldset>
        <p>
          <button>Submit</button>
        </p>
      </form>
    </div>
  )
}

ReactDOM.render(<CheckoutForm />, document.getElementById('root'))
