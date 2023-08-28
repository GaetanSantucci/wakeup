export const getTotal = (cart) => {
  let totalQuantity = 0
  let totalPrice = 0
  cart.forEach(item => {
    totalQuantity += item.quantity
    totalPrice += item.price * item.quantity
  })
  return { totalPrice, totalQuantity }
}

export const getTotalPrice = (order) => {
  let totalQuantity = 0
  let totalPrice = 0
  order.products.forEach(item => {
    totalQuantity += item.total_product_quantity;
    totalPrice += item.total_product_price * item.total_order_quantity
  })
  return { totalPrice, totalQuantity }
}