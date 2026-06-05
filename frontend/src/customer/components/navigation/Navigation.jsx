'use client'

import { Fragment, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { Link } from "react-router-dom"
import { useCart } from "../../../context/CartContext";

const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        { name: 'New Arrivals', href: '#', imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg', imageAlt: 'New Arrivals' },
        { name: 'Basic Tees', href: '#', imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg', imageAlt: 'Basic Tees' },
      ],
      sections: [
        { id: 'clothing', name: 'Clothing', items: [{ name: 'Tops' }, { name: 'Dresses' }, { name: 'Pants' }, { name: 'Denim' }, { name: 'Sweaters' }, { name: 'T-Shirts' }, { name: 'Jackets' }, { name: 'Activewear' }, { name: 'Browse All' }] },
        { id: 'accessories', name: 'Accessories', items: [{ name: 'Watches' }, { name: 'Wallets' }, { name: 'Bags' }, { name: 'Sunglasses' }, { name: 'Hats' }, { name: 'Belts' }] },
        { id: 'brands', name: 'Brands', items: [{ name: 'Full Nelson' }, { name: 'My Way' }, { name: 'Re-Arranged' }, { name: 'Counterfeit' }, { name: 'Significant Other' }] },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        { name: 'New Arrivals', href: '#', imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg', imageAlt: 'New Arrivals Men' },
        { name: 'Artwork Tees', href: '#', imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-06.jpg', imageAlt: 'Artwork Tees' },
      ],
      sections: [
        { id: 'clothing', name: 'Clothing', items: [{ name: 'Tops' }, { name: 'Pants' }, { name: 'Sweaters' }, { name: 'T-Shirts' }, { name: 'Jackets' }, { name: 'Activewear' }, { name: 'Browse All' }] },
        { id: 'accessories', name: 'Accessories', items: [{ name: 'Watches' }, { name: 'Wallets' }, { name: 'Bags' }, { name: 'Sunglasses' }, { name: 'Hats' }, { name: 'Belts' }] },
        { id: 'brands', name: 'Brands', items: [{ name: 'Re-Arranged' }, { name: 'Counterfeit' }, { name: 'Full Nelson' }, { name: 'My Way' }] },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
}

export default function ModernNavbar() {
  const [open, setOpen] = useState(false)

  const { cartItems } = useCart();
  const totalItems = cartItems.reduce(
  (sum, item) => sum + item.quantity,
  0
);

 

  return (
    <div className="bg-gradient-to-b from-emerald-50 via-lime-50 to-white sticky top-0 z-50 shadow-sm">
      {/* Top Banner - Kept the same vibrant look */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 py-2.5 text-center text-sm font-medium text-white">
        Get free delivery on orders over 100/- ✨
      </div>

      <header className="border-b border-gray-100">
        <nav className="mx-auto max-w-7xl px-6">
          <div className="flex h-20 items-center justify-between">
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-700 hover:text-black transition-colors"
            >
              <Bars3Icon className="size-7" />
            </button>

            {/* Logo */}
            <div className="flex items-center">
              <a href="#" className="flex items-center gap-x-2">
                <div className="w-9 h-9 bg-gradient-to-br from-emerald-600 to-lime-600 rounded-2xl flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-2xl tracking-tighter">S</span>
                </div>
                <span className="font-semibold text-2xl tracking-tighter text-gray-900">Shoply</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <PopoverGroup className="hidden lg:flex items-center gap-x-10">
              {navigation.categories.map((category) => (
                <Popover key={category.name} className="relative">
                  <PopoverButton className="text-base font-medium text-gray-700 hover:text-gray-900 transition-all duration-200 flex items-center gap-x-1 group">
                    {category.name}
                    <span className="text-[10px] text-gray-400 group-hover:text-emerald-600 transition-colors">▼</span>
                  </PopoverButton>

                  <PopoverPanel
                    transition
                    className="absolute left-1/2 -translate-x-1/2 top-full z-50 w-screen max-w-7xl bg-white shadow-xl rounded-3xl mt-4 overflow-hidden border border-gray-100"
                  >
                    <div className="px-10 py-12">
                      <div className="grid grid-cols-12 gap-x-12">
                        {/* Featured Images */}
                        <div className="col-span-5 grid grid-cols-2 gap-6">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group relative">
                              <div className="overflow-hidden rounded-3xl">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                              <a href={item.href} className="mt-5 block">
                                <p className="font-semibold text-gray-900 text-lg group-hover:text-emerald-600 transition-colors">
                                  {item.name}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">Shop now →</p>
                              </a>
                            </div>
                          ))}
                        </div>

                        {/* Sections */}
                        <div className="col-span-7 grid grid-cols-3 gap-x-12">
                          {category.sections.map((section) => (
                            <div key={section.name}>
                              <h4 className="font-semibold text-gray-900 tracking-wide text-sm uppercase mb-6">
                                {section.name}
                              </h4>
                              <ul className="space-y-4 text-[15px]">
                                {section.items.map((item) => (
                                  <li key={item.name}>
                                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </PopoverPanel>
                </Popover>
              ))}

              {navigation.pages.map((page) => (
                <a
                  key={page.name}
                  href={page.href}
                  className="text-base font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {page.name}
                </a>
              ))}
            </PopoverGroup>

            {/* Right Side Icons */}
            <div className="flex items-center gap-x-6">
              {/* Search */}
              <a href="#" className="p-3 text-gray-600 hover:text-black transition-colors">
                <MagnifyingGlassIcon className="size-6" />
              </a>

              {/* Currency */}
              <a href="#" className="hidden md:flex items-center gap-x-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                <img
                  src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
                  alt="CAD"
                  className="h-5 w-5"
                />
                <span>CAD</span>
              </a>

              {/* Account */}
              <div className="hidden lg:flex items-center gap-x-6 text-sm font-medium">
                <a href="#" className="text-gray-700 hover:text-gray-900">Sign in</a>
                <a href="#" className="text-gray-700 hover:text-gray-900">Create account</a>
              </div>

              {/* Cart */}
              <Link to="/cart" className="group flex items-center gap-x-2 p-3 relative">
              
                <ShoppingBagIcon className="size-6 text-gray-600 group-hover:text-black transition-colors" />
                <span className="text-sm font-semibold text-gray-700 group-hover:text-black">{totalItems}</span>
               </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu - Same functionality, modern look */}
      <Dialog open={open} onClose={setOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="fixed inset-0 z-50 flex">
          <DialogPanel className="relative w-full max-w-xs bg-white shadow-2xl overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-lime-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="font-semibold text-2xl tracking-tighter">Shoply</span>
              </div>
              <button onClick={() => setOpen(false)} className="p-2">
                <XMarkIcon className="size-7 text-gray-500" />
              </button>
            </div>

            <TabGroup className="mt-2">
              <TabList className="flex border-b px-6">
                {navigation.categories.map((cat) => (
                  <Tab
                    key={cat.name}
                    className="flex-1 py-4 text-base font-semibold text-gray-600 data-selected:text-emerald-600 data-selected:border-b-2 data-selected:border-emerald-600 outline-none"
                  >
                    {cat.name}
                  </Tab>
                ))}
              </TabList>

              <TabPanels className="px-6 py-8">
                {navigation.categories.map((category, idx) => (
                  <TabPanel key={idx} className="space-y-10">
                    {/* Featured */}
                    <div className="grid grid-cols-2 gap-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="relative rounded-3xl overflow-hidden">
                          <img src={item.imageSrc} alt={item.imageAlt} className="w-full aspect-square object-cover" />
                          <div className="absolute bottom-4 left-4">
                            <p className="font-semibold text-white text-lg drop-shadow">{item.name}</p>
                            <p className="text-white/90 text-sm">Shop now</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Sections */}
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <h3 className="font-semibold text-gray-900 mb-5">{section.name}</h3>
                        <div className="space-y-4">
                          {section.items.map((item) => (
                            <a key={item.name} href="#" className="block text-gray-600 hover:text-emerald-600 text-lg">
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="border-t px-6 py-8 space-y-6">
              {navigation.pages.map((page) => (
                <a key={page.name} href={page.href} className="block text-lg font-medium text-gray-800">
                  {page.name}
                </a>
              ))}
              <a href="#" className="block text-lg font-medium text-gray-800">Sign in</a>
              <a href="#" className="block text-lg font-medium text-gray-800">Create account</a>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}