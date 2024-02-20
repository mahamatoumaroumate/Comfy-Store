import { useState } from 'react'
import { Form, useLoaderData, useLocation, useNavigate } from 'react-router-dom'
const Pagination = () => {
  const {
    meta: { pagination },
  } = useLoaderData()
  const { search, pathname } = useLocation()
  const navigate = useNavigate()
  let { page, pageCount } = pagination
  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1
  })
  if (pageCount < 2) {
    return
  }
  const handlePage = (newPage) => {
    page = newPage
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', newPage)
    navigate(`${pathname}?${searchParams.toString()}`)
  }
  return (
    <div className='join my-24 float-right'>
      <button
        className='btn join-item btn-sm md:btn-md'
        onClick={() => {
          if (page !== 1) {
            handlePage(page - 1)
          } else {
            handlePage(pageCount)
          }
        }}
      >
        Prev
      </button>
      {pages.map((item, index) => {
        return (
          <button
            type='submit'
            key={index}
            className={`join-item btn btn-sm md:btn-md ${
              item === page ? 'btn-active' : ''
            }`}
            onClick={() => handlePage(item)}
          >
            {item}
          </button>
        )
      })}
      <button
        className='btn join-item btn-sm md:btn-md'
        onClick={() => {
          if (page !== pageCount) {
            handlePage(page + 1)
          } else {
            handlePage(1)
          }
        }}
      >
        Next
      </button>
    </div>
  )
}
export default Pagination
