import {
  ShoppingCart,
  Settings,
  BookOpen,
  Share2,
  Package,
  ShoppingBag,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface StoreItem {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  liveUrl: string;
}

export interface ServiceItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}

// To add a new store, copy a block below and update the fields.
// Put screenshots in /public and reference them from the site root (e.g. '/portfolio/store.png'). Leave `image` empty to show a branded placeholder.
// Replace `image` with your screenshot path and `liveUrl` with the real store link.
export const stores: StoreItem[] = [
  {
    id: 'store-1',
    name: 'WU SOFTBALL',
    category: 'Inksoft · Sports team',
    description: 'Completed the WU Softball project by adding products, customizing product designs, and organizing featured products on the InkSoft online store homepage.',
    image: '/portfolio/wu-softball.png',
    liveUrl: 'https://stores.inksoft.com/wusoftball/shop/home',
  },
  {
    id: 'store-2',
    name: 'DBG BASKETBALL',
    category: 'Inksoft · Sports team',
    description: 'Added and customized basketball products, organized product listings, and showcased featured items on the DBG Basketball inksoft online store homepage.',
    image: '/portfolio/dbg-basketball.png',
    liveUrl: 'https://shop.arelistores.com/dbg_basketball/shop/home',
  },
  {
    id: 'store-3',
    name: 'Truker Though',
    category: 'InkSoft · Print-on-Demand',
    description: 'A full InkSoft store setup with product catalog management, custom design studio, and wholesale ordering.',
    image: '/portfolio/truck.png',
    liveUrl: 'https://stores.inksoft.com/truck/shop/',
  },
  {
    id: 'store-4',
    name: 'TAYLOR MADE FARM',
    category: 'Inksoft · Corporate',
    description: 'Completed the Taylor Made Farm project by adding and customizing products, organizing product listings, and designing the InkSoft online store homepage.',
    image: '/portfolio/taylormadefarm.png',
    liveUrl: 'https://stores.inksoft.com/taylormadefarm/shop/home',
  },
  {
    id: 'store-5',
    name: 'BETH CENTER SKI CLUB',
    category: 'Inksoft · Club',
    description: 'Successfully completed the InkSoft online store setup and updated the product catalog, ensuring products are organized and ready for customer browsing and ordering.',
    image: '/portfolio/bethcentercheer.png',
    liveUrl: 'https://stores.inksoft.com/bethcentercheer/shop/home',
  },
  {
    id: 'store-6',
    name: 'FALCON GYMNASTICS',
    category: 'Inksoft · Fund raising',
    description: 'Created and configured the Falcon Gymnastics Charity merchandise webstore using InkSoft, showcasing charity merchandise and enabling customers to browse and place orders online.',
    image: '/portfolio/falcon.png',
    liveUrl: 'https://stores.inksoft.com/FalconGymnastics/shop/home',
  },
];

export const services: ServiceItem[] = [
  {
    id: 'service-1',
    icon: ShoppingCart,
    title: 'Professional InkSoft Store Setup Product Catalog Management Services',
    description: 'We provide professional InkSoft store setup, customization, and product catalog management services. Our services include complete store setup, product uploads, catalog updates, pricing and size management, product images, artwork setup, store maintenance, and ongoing support. We help USA and Canda businesses create professional, organized, and user-friendly InkSoft stores.',
    features: ['Store design & branding', 'Product catalog management', 'Pricing & variant setup' 'Manual Products and Manufacturer additions' 'Much More'],
  },
  {
    id: 'service-2',
    icon: ShoppingBag,
    title: 'Professional Shopify Store Management Services',
    description: 'FJX Studio provides professional Shopify store management services, including product uploads, catalog management, inventory updates, order management, and ongoing eCommerce support for businesses in the USA and Canada.',
    features: ['Shopify virtual assistant', 'Shopify product management', 'Shopify catalog management' 'Shopify eCommerce management'],
  },
  {
    id: 'service-3',
    icon: Package,
    title: 'Data Entry Services for eCommerce Businesses of USA and canada',
    description: 'FJX Studio provides professional data entry services for USA and Canadian businesses, including eCommerce product data entry, bulk uploads, catalog updates, and product information management..',
    features: ['Product Data Entry', 'eCommerce Product Uploads', 'Product Information Management' 'SKU & Inventory Data Entry' 'Product Image & Description Entry' 'Much More'],
  },
  {
    id: 'service-4',
    icon: BookOpen,
    title: 'Bookkeeping & Accounting',
    description: 'Professional e-commerce bookkeeping — sales tracking, expense management, and financial reporting to keep your store profitable.',
    features: ['Sales & expense tracking', 'Monthly financial reports', 'Tax-ready bookkeeping'],
  },
  {
    id: 'service-5',
    icon: Share2,
    title: 'Social Media Management',
    description: 'Grow your brand with strategic social media management — content creation, scheduling, and community engagement.',
    features: ['Content calendar & posting', 'Brand-consistent creatives', 'Community engagement'],
  },
  {
    id: 'service-6',
    icon: Settings,
    title: 'Professional eCommerce Support Services',
    description: 'FJX Studio provides reliable eCommerce support services for USA and Canadian businesses, including store management, product updates, catalog management, and daily online store operations. 24/7.',
    features: ['Order Processing Support', 'Product Catalog Management', 'Inventory Updates' 'eCommerce Administrative Support' 'eCommerce Virtual Assistant'],
  },
];

export const testimonials: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Theo',
    role: 'Owner, Areli Sportswear.',
    avatar: '',
    rating: 5,
    text: 'FJX Studio answered all of my questions and provided professional work and a prompt delivery. Highly recommended.',
  },
  {
    id: 't2',
    name: 'Frederick',
    role: 'Founder, Anchor Design',
    avatar: '',
    rating: 5,
    text: 'Excellent experience working with FJX!. Highly recommended for InkSoft store setup and product upload services.',
  },
  {
    id: 't3',
    name: 'Davis',
    role: 'Vice President, Bee Graphics',
    avatar: '',
    rating: 5,
    text: 'The InkSoft store setup was seamless. They handled everything from product catalog to the design studio. Our wholesale orders have never been easier.',
  },
  {
    id: 't4',
    name: 'April sinclair',
    role: 'Director, April Designs',
    avatar: '',
    rating: 5,
    text: 'Done Great Job on inksoft store setup and catalog.',
  },
  {
    id: 't5',
    name: 'David Thompson',
    role: 'Owner, Luxe Home Decor',
    avatar: 'https://images.pexels.com/photos/6102841/pexels-photo-6102841.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    rating: 5,
    text: 'Working with FJX Studio was the best decision for our business. They understand the USA and Canadian markets perfectly. Highly recommended.',
  },
  {
    id: 't6',
    name: 'Emily Roberts',
    role: 'Founder, ActiveFit Gear',
    avatar: 'https://images.pexels.com/photos/14950779/pexels-photo-14950779.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    rating: 5,
    text: 'Professional, reliable, and incredibly talented. They rebuilt our WooCommerce store and the difference in speed and conversions is night and day.',
  },
];
