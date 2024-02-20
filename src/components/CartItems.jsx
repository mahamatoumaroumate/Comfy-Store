import { useDispatch } from 'react-redux'
import FormatPrice from './FormatPrice'
import { removeItem, updateItem } from '../features/cart/cartSlice'

const CartItems = ({ cartItems }) => {
  const dispatch = useDispatch()
  return (
    <div className='grid gap-4 lg:col-span-4 '>
      {cartItems.map((item, index) => {
        return (
          <div
            key={item.cartID}
            className={
              index > 0
                ? 'flex gap-8 flex-col sm:flex-row border-t-2  border-base-300 pt-4'
                : 'flex gap-8 flex-col sm:flex-row '
            }
          >
            <img
              src={item.image}
              alt={item.title}
              className='w-32 sm:w-48 h-24 object-cover rounded-lg '
            />
            <div className='grid sm:grid-cols-3 w-full'>
              <section>
                <h1 className='text-xl font-bold'>{item.title}</h1>
                <h2>{item.company}</h2>
                <div className='flex items-center gap-2'>
                  <h3>Color: </h3>
                  <span
                    className='badge badge-sm  '
                    style={{ background: `${item.productColor}` }}
                  ></span>
                </div>
              </section>
              <section>
                <h2>Amount</h2>
                <select
                  className='select select-sm w-64 sm:w-auto text-sm select-secondary block my-2 '
                  onChange={(e) =>
                    dispatch(
                      updateItem({
                        cartID: item.cartID,
                        amount: parseInt(e.target.value),
                      })
                    )
                  }
                >
                  {Array.from({ length: item.amount + 5 }, (_, index) => {
                    return (
                      <option
                        key={index}
                        value={index + 1}
                        defaultValue={item.amount}
                      >
                        {index + 1}
                      </option>
                    )
                  })}
                </select>
                <button
                  className='link link-hover link-primary'
                  onClick={() => dispatch(removeItem(item.cartID))}
                >
                  remove
                </button>
              </section>
              <h2 className='text-xl font-bold'>{FormatPrice(item.price)}</h2>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default CartItems
