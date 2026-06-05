import { filters } from "../customer/components/Product/FilterData"
import Product from "../customer/components/Product/Product"

 export const filterProducts = (products, filters, priceRange) => {
  return products.filter((product) => {

    const matchColor =
      filters.color.length === 0 ||
      filters.color.some(c =>
        product.title.toLowerCase().includes(c)
      )

    const matchStyle =
      filters.category.length === 0 ||
      filters.category.some(s =>
        product.title.toLowerCase().includes(s) ||
        product.subtitle?.toLowerCase().includes(s)
      )

      if (filters.size.length) {
  const match = product.sizes?.some(size =>
    filters.size.includes(size)
  )
  if (!match) return false
}

   // PRICE RANGE (slider)
const matchPriceRange =
  product.price >= priceRange[0] &&
  product.price <= priceRange[1]

// PRICE FILTER (checkbox)
let matchPriceOption = true

if (filters.price.length) {
  matchPriceOption = filters.price.some(range => {
    if (range === "0-999") return product.price <= 999
    if (range === "1000-1999") return product.price >= 1000 && product.price <= 1999
    if (range === "2000-2999") return product.price >= 2000 && product.price <= 2999
    if (range === "3000+") return product.price >= 3000
  })
}

if (!matchPriceRange || !matchPriceOption) return false

   return matchColor && matchStyle && matchPriceRange && matchPriceOption
  })
}