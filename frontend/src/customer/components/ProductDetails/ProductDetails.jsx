// ProductDetails.tsx
import { StarIcon } from '@heroicons/react/20/solid'
import { ShoppingBagIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import ProductReviewCard from './ProductReviewCard'

import { useParams } from "react-router-dom";

const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { id: 'white', name: 'White', classes: 'bg-white ring-gray-200' },
    { id: 'gray', name: 'Gray', classes: 'bg-gray-200 ring-gray-300' },
    { id: 'black', name: 'Black', classes: 'bg-gray-900 ring-gray-700' },
  ],
  sizes: [
    { id: 'xxs', name: 'XXS', inStock: false },
    { id: 'xs', name: 'XS', inStock: true },
    { id: 's', name: 'S', inStock: true },
    { id: 'm', name: 'M', inStock: true },
    { id: 'l', name: 'L', inStock: true },
    { id: 'xl', name: 'XL', inStock: false },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}

const reviewsData = {
  href: '#',
  average: 4,
  totalCount: 117,
  list: [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Absolutely love these tees! The fabric is incredibly soft and the fit is perfect. Best basic tees I have ever owned.',
      date: 'March 15, 2024',
      avatar: '',
    },
    {
      id: 2,
      name: 'Michael Chen',
      rating: 4,
      comment: 'Great quality shirts. The colors are exactly as shown. Would recommend sizing up if you prefer a looser fit.',
      date: 'March 10, 2024',
      avatar: '',
    },
    {
      id: 3,
      name: 'Emma Williams',
      rating: 5,
      comment: 'Perfect everyday tees! Washed them multiple times and they still look brand new. No shrinking or fading.',
      date: 'March 5, 2024',
      avatar: '',
    },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

 
export default function ProductDetails() {

  const { id } = useParams();

  console.log(id); // checking purpose


  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes.find(s => s.inStock) || product.sizes[2])

  return (
<div className="bg-[linear-gradient(to_bottom,var(--light-bg),#ecfdf5)]">

        <div className="pt-6 pb-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="border-b border-gray-100/80">
          <ol role="list" className="mx-auto flex max-w-7xl items-center space-x-2 px-4 sm:px-6 lg:px-8 py-3">
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300 ml-2"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <span className="font-medium text-gray-900">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
            
            {/* Image Gallery - Modern Layout */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 lg:col-span-1">
                  <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300">
                    <img
                      alt={product.images[0].alt}
                      src={product.images[0].src}
                      className="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300">
                    <img
                      alt={product.images[1].alt}
                      src={product.images[1].src}
                      className="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-4">
                  <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300">
                    <img
                      alt={product.images[2].alt}
                      src={product.images[2].src}
                      className="aspect-square w-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300">
                    <img
                      alt={product.images[3].alt}
                      src={product.images[3].src}
                      className="aspect-square w-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:pl-8">
              {/* Title & Actions */}
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {product.name}
                  </h1>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            aria-hidden="true"
                            className={classNames(
                              reviewsData.average > rating ? 'text-amber-400' : 'text-gray-200',
                              'h-5 w-5 shrink-0',
                            )}
                          />
                        ))}
                      </div>
                      <p className="sr-only">{reviewsData.average} out of 5 stars</p>
                      <a href="#reviews" className="ml-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        {reviewsData.totalCount} reviews
                      </a>
                    </div>
                    <span className="text-sm text-gray-500">|</span>
                    <span className="text-sm text-emerald-600 font-medium">In Stock</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-full bg-gray-50 text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200">
                    <HeartIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-full bg-gray-50 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">
                    <ShareIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="mt-6">
                <p className="text-4xl font-bold tracking-tight text-gray-900">{product.price}</p>
                <p className="text-sm text-gray-500 mt-1">Free shipping on orders over $50</p>
              </div>

              {/* Form */}
              <form className="mt-8">
                {/* Colors */}
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">Color</h3>
                    <span className="text-xs text-gray-500">{selectedColor.name}</span>
                  </div>
                  <fieldset aria-label="Choose a color" className="mt-3">
                    <div className="flex items-center gap-3">
                      {product.colors.map((color) => (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={classNames(
                            color.classes,
                            selectedColor.id === color.id
                              ? 'ring-2 ring-indigo-600 ring-offset-2 scale-110'
                              : 'ring-1 ring-gray-200',
                            'h-10 w-10 rounded-full transition-all duration-200 hover:scale-105 focus:outline-none'
                          )}
                          aria-label={color.name}
                        />
                      ))}
                    </div>
                  </fieldset>
                </div>

                {/* Sizes */}
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">Size</h3>
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Size guide
                    </a>
                  </div>
                  <fieldset aria-label="Choose a size" className="mt-3">
                    <div className="grid grid-cols-6 gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size.id}
                          type="button"
                          onClick={() => size.inStock && setSelectedSize(size)}
                          disabled={!size.inStock}
                          className={classNames(
                            selectedSize.id === size.id
                              ? 'bg-indigo-600 text-white ring-2 ring-indigo-600 ring-offset-2'
                              : size.inStock
                              ? 'bg-white text-gray-700 hover:border-indigo-300 hover:ring-1 hover:ring-indigo-200'
                              : 'bg-gray-50 text-gray-300 cursor-not-allowed',
                            'rounded-lg py-2.5 px-3 text-sm font-medium transition-all duration-200 border border-gray-200'
                          )}
                        >
                          {size.name}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="submit"
                  className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-200 hover:from-indigo-700 hover:to-indigo-800 hover:shadow-xl hover:shadow-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                >
                  <ShoppingBagIcon className="h-5 w-5" />
                  Add to bag
                </button>
              </form>

              {/* Description */}
              <div className="mt-10 pt-8 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                <p className="mt-3 text-base text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Highlights */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900">Highlights</h3>
                <ul className="mt-3 space-y-2">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Details */}
              <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Details</h3>
                <p className="mt-2 text-sm text-gray-700 leading-relaxed">{product.details}</p>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div id="reviews" className="mt-20 pt-8 border-t border-gray-100">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviewsData.average > rating ? 'text-amber-400' : 'text-gray-200',
                          'h-5 w-5'
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {reviewsData.average} out of 5 stars
                  </span>
                  <span className="text-sm text-gray-500">({reviewsData.totalCount} reviews)</span>
                </div>
              </div>
              <button className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all duration-200 shadow-md shadow-indigo-200">
                Write a review
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-1">
                {reviewsData.list.map((review) => (
                  <ProductReviewCard key={review.id} review={review} />
                ))}
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900">Rate this product</h3>
                <p className="text-sm text-gray-500 mt-1">Share your experience with others</p>
                <div className="flex items-center gap-1 mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} className="h-8 w-8 text-gray-200 cursor-pointer hover:text-amber-400 transition-colors" />
                  ))}
                </div>
                <textarea
                  rows={3}
                  placeholder="Write your review..."
                  className="mt-4 w-full rounded-xl border-gray-200 bg-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all"
                />
                <button className="mt-4 w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-all">
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}