import FormatPrice from './FormatPrice'
const CartSubTotal = ({
  shipping,
  cartTotal,
  tax,
  orderTotal,
  height,
  marginTop,
}) => {
  return (
    <div
      className={
        height || marginTop
          ? `p-8 bg-base-200 rounded-lg ${height} ${marginTop} `
          : 'p-8 bg-base-200 rounded-lg '
      }
    >
      <section className='flex justify-between border-b-2 border-base-300 pb-2'>
        <h2>Subtotal </h2>
        <h2>{FormatPrice(cartTotal)}</h2>
      </section>
      <section className='flex justify-between border-b-2 border-base-300 pb-2 mt-2'>
        <h2>Shipping </h2>
        <h2>{FormatPrice(shipping)}</h2>
      </section>
      <section className='flex justify-between border-b-2 border-base-300 pb-2 mt-2'>
        <h2>Tax</h2>
        <h2>{FormatPrice(tax)}</h2>
      </section>
      <section className='flex justify-between  mt-4 text-lg font-bold'>
        <h2>Order Total</h2>
        <h2>{FormatPrice(orderTotal)}</h2>
      </section>
    </div>
  )
}
export default CartSubTotal
