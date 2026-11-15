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
// Replace `image` with your screenshot URL and `liveUrl` with the real store link.
export const stores: StoreItem[] = [
  {
    id: 'store-1',
    name: 'WU SOFTBALL',
    category: 'Inksoft · Sports team',
    description: 'Completed the WU Softball project by adding products, customizing product designs, and organizing featured products on the InkSoft online store homepage.',
    image: 'https://res.cloudinary.com/dtz0urit6/image/upload/q_auto:eco,f_jpg/cloudinary-tools-uploads/dxb6xl2gnbvdh2fonddw',
    liveUrl: 'https://stores.inksoft.com/wusoftball/shop/home',
  },
  {
    id: 'store-2',
    name: 'DBG BASKETBALL',
    category: 'Inksoft · Sports team',
    description: 'Added and customized basketball products, organized product listings, and showcased featured items on the DBG Basketball inksoft online store homepage.',
    image: 'https://res.cloudinary.com/dtz0urit6/image/upload/q_auto:best,f_jpg/cloudinary-tools-uploads/kjeb7ckkzqc1plmi2ju7',
    liveUrl: 'https://shop.arelistores.com/dbg_basketball/shop/home',
  },
  {
    id: 'store-3',
    name: 'Truker Though',
    category: 'InkSoft · Print-on-Demand',
    description: 'A full InkSoft store setup with product catalog management, custom design studio, and wholesale ordering.',
    image: 'https://res.cloudinary.com/dtz0urit6/image/upload/q_auto:eco,f_jpg/cloudinary-tools-uploads/bpmpbrff7siedlpjfhtr',
    liveUrl: 'https://stores.inksoft.com/truck/shop/',
  },
  {
    id: 'store-4',
    name: 'TAYLOR MADE FARM',
    category: 'Inksoft · Corporate',
    description: 'Completed the Taylor Made Farm project by adding and customizing products, organizing product listings, and designing the InkSoft online store homepage.',
    image: 'public/123.jpg',
    liveUrl: 'https://stores.inksoft.com/taylormadefarm/shop/home',
  },
  {
    id: 'store-5',
    name: 'BETH CENTER SKI CLUB',
    category: 'Inksoft · Club',
    description: 'Successfully completed the InkSoft online store setup and updated the product catalog, ensuring products are organized and ready for customer browsing and ordering.',
    image: 'https://res.cloudinary.com/dtz0urit6/image/upload/q_auto:best,f_jpg/cloudinary-tools-uploads/iw4p0rpw9kozrnhwexen',
    liveUrl: 'https://stores.inksoft.com/bethcentercheer/shop/home',
  },
  {
    id: 'store-6',
    name: 'FALCON GYMNASTICS',
    category: 'Inksoft · Fund raising',
    description: 'Created and configured the Falcon Gymnastics Charity merchandise webstore using InkSoft, showcasing charity merchandise and enabling customers to browse and place orders online.',
    image: 'https://res.cloudinary.com/dtz0urit6/image/upload/q_auto:eco,f_jpg/cloudinary-tools-uploads/lrtnuanem3sdbxmc2hby',
    liveUrl: 'https://stores.inksoft.com/FalconGymnastics/shop/home',
  },
];

export const services: ServiceItem[] = [
  {
    id: 'service-1',
    icon: ShoppingCart,
    title: 'InkSoft Store Setup',
    description: 'We provide professional InkSoft store setup, customization, and product catalog management services. Our services include complete store setup, product uploads, catalog updates, pricing and size management, product images, artwork setup, store maintenance, and ongoing support. We help businesses create professional, organized, and user-friendly InkSoft stores.',
    features: ['Store design & branding', 'Product catalog management', 'Pricing & variant setup'],
  },
  {
    id: 'service-2',
    icon: ShoppingBag,
    title: 'Shopify Store Management',
    description: 'End-to-end Shopify store management — from theme customization and product uploads to app integrations and order fulfillment.',
    features: ['Theme customization', 'Product & inventory sync', 'App integration & setup'],
  },
  {
    id: 'service-3',
    icon: Package,
    title: 'WooCommerce Store Management',
    description: 'Full WooCommerce management including plugin configuration, product catalog maintenance, and performance optimization.',
    features: ['Plugin & extension setup', 'Catalog & SEO optimization', 'Performance tuning'],
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
    title: 'Store Maintenance & Support',
    description: 'Ongoing maintenance, security updates, and technical support to keep your store running smoothly 24/7.',
    features: ['Regular security updates', 'Bug fixes & troubleshooting', 'Performance monitoring'],
  },
];

export const testimonials: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Theo',
    role: 'Owner, Areli Sportswear.',
    avatar: 'https://res.cloudinary.com/dtz0urit6/image/upload/q_auto:eco,f_jpg/cloudinary-tools-uploads/mqfk6pycbbqejhimvqw9',
    rating: 5,
    text: 'FJX Studio answered all of my questions and provided professional work and a prompt delivery. Highly recommended.',
  },
  {
    id: 't2',
    name: 'Frederick',
    role: 'Founder, Anchor Design',
    avatar: 'https://res.cloudinary.com/dtz0urit6/image/upload/q_auto:best,f_jpg/cloudinary-tools-uploads/yxfeudkebs1kjyqz6msv',
    rating: 5,
    text: 'Excellent experience working with FJX!. Highly recommended for InkSoft store setup and product upload services.',
  },
  {
    id: 't3',
    name: 'Davis',
    role: 'Vice President, Bee Graphics',
    avatar: 'https://res.cloudinary.com/dtz0urit6/image/upload/q_auto:eco,f_jpg/cloudinary-tools-uploads/upp7qobfgfvegivckoco',
    rating: 5,
    text: 'The InkSoft store setup was seamless. They handled everything from product catalog to the design studio. Our wholesale orders have never been easier.',
  },
  {
    id: 't4',
    name: 'April sinclair',
    role: 'Director, April Designs',
    avatar: 'https://res.cloudinary.com/dtz0urit6/image/upload/q_auto:eco,f_jpg/cloudinary-tools-uploads/ji1jcbpdsqwqcqalgsx5',
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
