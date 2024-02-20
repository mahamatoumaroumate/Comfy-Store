import moment from 'moment'
const OrdersItem = ({
  address,
  name,
  createdAt,
  orderTotal,
  numItemsInCart,
  index,
}) => {
  const date = moment(createdAt).format('lll')
  return (
    <div className='grid grid-cols-5 '>
      <h4
        className={`font-semibold ${
          index % 2 == 1 ? 'bg-base-200 p-2' : 'p-2'
        }`}
      >
        {name}
      </h4>
      <h4
        className={`font-semibold ${
          index % 2 == 1 ? 'bg-base-200 p-2' : 'p-2'
        }`}
      >
        {address}
      </h4>
      <h4
        className={`font-semibold ${
          index % 2 == 1 ? 'bg-base-200 p-2' : 'p-2'
        }`}
      >
        {numItemsInCart}
      </h4>
      <h4
        className={`font-semibold ${
          index % 2 == 1 ? 'bg-base-200 p-2' : 'p-2'
        }`}
      >
        {orderTotal}
      </h4>
      <h4
        className={`font-semibold ${
          index % 2 == 1 ? 'bg-base-200 p-2' : 'p-2'
        }`}
      >
        {date}
      </h4>
    </div>
  )
}
export default OrdersItem
