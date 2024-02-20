import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'

const OrdersPagination = () => {
  const {
    meta: { pagination },
  } = useLoaderData()
  let { page, pageCount } = pagination
  const { search, pathname } = useLocation()
  const navigate = useNavigate()
  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1
  })
  const handlePage = (newPage) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', newPage)
    navigate(`${pathname}?${searchParams.toString()}`)
  }
  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        className={`btn btn-xs sm:btn-md border-none join-item ${
          activeClass ? 'bg-base-300 border-base-300' : ''
        }`}
        onClick={() => handlePage(pageNumber)}
      >
        {pageNumber}
      </button>
    )
  }
  const renderButtons = () => {
    const pageButtons = []
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }))
    if (page > 2) {
      pageButtons.push(
        <button className='join-item btn btn-xs sm:btn-md' key='dots-1'>
          ...
        </button>
      )
    }
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }))
    }
    if (page < pageCount - 1) {
      pageButtons.push(
        <button className='join-item btn btn-xs sm:btn-md' key='dots-2'>
          ...
        </button>
      )
    }
    pageButtons.push(
      addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    )
    return pageButtons
  }
  return (
    <div className='join float-right my-8'>
      <button
        className='btn btn-xs sm:btn-md join-item'
        onClick={() => {
          let prevPage = page - 1
          if (prevPage < 1) prevPage = pageCount
          handlePage(prevPage)
        }}
      >
        Prev
      </button>
      {renderButtons()}
      <button
        className='btn btn-xs sm:btn-md join-item'
        onClick={() => {
          let nextPage = page + 1
          if (nextPage > pageCount) nextPage = 1
          handlePage(nextPage)
        }}
      >
        Next
      </button>
    </div>
  )
}
export default OrdersPagination
