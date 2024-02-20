const FormatPrice = (price) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price / 100)
  return formattedPrice
}
export default FormatPrice
