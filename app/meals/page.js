import Link from 'next/link'
import React from 'react'

const MealPage = () => {
  return (
    <h1>
      meals 
      <Link href='/meals/product-1'>Product 1</Link>
    </h1>
  )
}

export default MealPage
