import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
const setInitial = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
}
const initialState = JSON.parse(localStorage.getItem('cart')) || setInitial
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      const { cartID } = payload
      const item = state.cartItems.find((i) => i.cartID === cartID)

      if (item) {
        item.amount += payload.amount
      } else {
        state.cartItems.push(payload)
      }

      state.numItemsInCart += payload.amount
      state.cartTotal += payload.amount * payload.price
      cartSlice.caseReducers.calculateTotal(state)
      toast.success('successfully added item')
    },
    removeItem: (state, { payload }) => {
      const item = state.cartItems.find((i) => i.cartID === payload)
      state.cartItems = state.cartItems.filter((i) => i.cartID !== payload)
      state.numItemsInCart -= item.amount
      state.cartTotal -= item.amount * item.price
      cartSlice.caseReducers.calculateTotal(state)
      toast.error('successfully item removed')
    },
    updateItem: (state, { payload }) => {
      console.log(payload.cartID, payload.amount)
      const item = state.cartItems.find((i) => i.cartID === payload.cartID)

      state.numItemsInCart += payload.amount - item.amount
      state.cartTotal += item.price * (payload.amount - item.amount)
      item.amount = payload.amount
      cartSlice.caseReducers.calculateTotal(state)
      toast.success('Cart Updated')
    },
    clearCart: () => {
      localStorage.setItem('cart', JSON.stringify(setInitial))
      return setInitial
    },
    calculateTotal: (state) => {
      state.tax = 0.1 * state.cartTotal
      state.orderTotal = state.cartTotal + state.shipping + state.tax
      localStorage.setItem('cart', JSON.stringify(state))
    },
  },
})
export const { addItem, removeItem, updateItem, clearCart } = cartSlice.actions
export default cartSlice.reducer
