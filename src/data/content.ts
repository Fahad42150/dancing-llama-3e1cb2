import {
  ShoppingCart,
  Settings,
  BookOpen,
  Package,
  ShoppingBag,
  ClipboardList,
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

export const stores: StoreItem[] = [
  {
    id: 'store-1',
    name: 'WU SOFTBALL',
    category: 'InkSoft · Sports team',
    description: 'Product uploads, product design customization and featured product organization for an InkSoft team store.',
    image: '/portfolio/wu-softball.png',
    liveUrl: 'https://stores.inksoft.com/wusoftball/shop/home',
  },
  {
    id: 'store-2',
    name: 'DBG BASKETBALL',
    category: 'InkSoft · Sports team',
    description: 'Basketball product setup, listing updates and featured product organization for an InkSoft team store.',
    image: '/portfolio/dbg-basketball.png',
    liveUrl: 'https://shop.arelistores.com/dbg_basketball/shop/home',
  },
  {
    id: 'store-3',
    name: 'Truker Though',
    category: 'InkSoft · Print-on-Demand',
    description: 'InkSoft store setup support, product catalog management, design studio configuration and wholesale ordering workflow.',
    image: '/portfolio/truck.png',
    liveUrl: 'https://stores.inksoft.com/truck/shop/',
  },
  {
    id: 'store-4',
    name: 'TAYLOR MADE FARM',
    category: 'InkSoft · Corporate',
    description: 'Product setup, catalog organization and storefront content updates for an InkSoft corporate store.',
    image: '/portfolio/taylormadefarm.png',
    liveUrl: 'https://stores.inksoft.com/taylormadefarm/shop/home',
  },
  {
    id: 'store-5',
    name: 'BETH CENTER SKI CLUB',
    category: 'InkSoft · Club',
    description: 'InkSoft store setup assistance and product catalog organization for a club merchandise store.',
    image: '/portfolio/bethcentercheer.png',
    liveUrl: 'https://stores.inksoft.com/bethcentercheer/shop/home',
  },
  {
    id: 'store-6',
    name: 'FALCON GYMNASTICS',
    category: 'InkSoft · Fundraising',
    description: 'InkSoft merchandise store setup and product organization for a gymnastics fundraising store.',
    image: '/portfolio/falcon.png',
    liveUrl: 'https://stores.inksoft.com/FalconGymnastics/shop/home',
  },
];

export const services: ServiceItem[] = [
  {
    id: 'service-1',
    icon: ShoppingCart,
    title: 'InkSoft Store Setup & Management',
    description: 'InkSoft-focused support for apparel decorators, screen printers, team dealers and promotional product businesses. Work can include store setup assistance, catalog preparation, product updates and ongoing storefront maintenance.',
    features: ['Store setup and content updates', 'Product uploads and catalog maintenance', 'Sizes, colors and product options', 'Artwork and listing coordination'],
  },
  {
    id: 'service-2',
    icon: ShoppingBag,
    title: 'eCommerce Product Catalog Management',
    description: 'Keep product information organized across supported online stores with structured uploads, listing edits and approved catalog changes.',
    features: ['Product titles, descriptions and SKUs', 'Product images and attributes', 'Variants, sizes and colors', 'Approved price and inventory updates'],
  },
  {
    id: 'service-3',
    icon: Package,
    title: 'Online Store Data Entry',
    description: 'Accurate product data entry for businesses that need help adding, correcting and maintaining information in their eCommerce catalog.',
    features: ['Product and SKU data entry', 'Bulk product uploads by agreed workflow', 'Product image and description entry', 'Catalog cleanup and consistency checks'],
  },
  {
    id: 'service-4',
    icon: ClipboardList,
    title: 'Order Administration Support',
    description: 'Administrative assistance with assigned order queues, record checks, status tracking and exception reporting under your team’s procedures.',
    features: ['Order detail checks', 'Order status and record updates', 'Queue monitoring and task logs', 'Escalation of exceptions for approval'],
  },
  {
    id: 'service-5',
    icon: BookOpen,
    title: 'eCommerce Virtual Assistant',
    description: 'Recurring remote support for daily or weekly online store tasks, with agreed priorities, access permissions, quality checks and reporting.',
    features: ['Daily store admin checklist', 'Product listing maintenance', 'Catalog and content updates', 'Routine store quality checks'],
  },
  {
    id: 'service-6',
    icon: Settings,
    title: 'Multi-Platform Store Maintenance',
    description: 'Project-scoped operational assistance for Shopify, WooCommerce on WordPress and Chipply, alongside FJX Studio’s primary InkSoft specialty.',
    features: ['Shopify product and catalog updates', 'WooCommerce product and variation maintenance', 'WordPress content updates', 'Chipply store and catalog administration'],
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

];
