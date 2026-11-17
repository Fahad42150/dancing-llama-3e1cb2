import { ArrowRight, BookOpen, Newspaper } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const latestArticles = [
  { category: 'USA & Canada · Small Business', title: "Small Business Owners Overwhelmed with Daily Tasks in the USA and Canada", description: "Practical ways for small business owners in the USA and Canada to manage daily tasks, reduce admin overload, delegate work and use virtual assistant support.", href: '/blog/small-business-owners-overwhelmed-daily-tasks-usa-canada/' },
  { category: 'USA & Canada · Small Business', title: "Cost of Hiring Employees in the USA and Canada: A Small Business Budget Guide", description: "Understand the real cost of hiring employees in the USA and Canada, including payroll obligations, benefits, recruitment, training and alternatives such as outsourcing.", href: '/blog/cost-of-hiring-employees-usa-canada/' },
  { category: 'USA & Canada · Small Business', title: "Outsourcing Administrative Work in Canada and the USA: A Practical Guide for Small Businesses", description: "Learn how Canadian and U.S. small businesses can outsource administrative work safely, choose tasks, protect customer information and work with remote assistants.", href: '/blog/outsourcing-administrative-work-canada-usa/' },
  { category: 'USA & Canada · Small Business', title: "Customer Service Outsourcing for Small Businesses in the USA and Canada: What to Know", description: "A practical guide to customer service outsourcing for small businesses in the USA and Canada, including email support, response standards, privacy, escalation and virtual assistant help.", href: '/blog/customer-service-outsourcing-small-business-usa-canada/' },
  { category: 'USA & Canada · Small Business', title: "Remote Administrative Support in the USA and Canada: How Small Businesses Can Work Smarter", description: "Explore remote administrative support for small businesses in the USA and Canada, including virtual assistants, task delegation, secure workflows and performance measures.", href: '/blog/remote-administrative-support-usa-canada/' },
  { category: 'USA & Canada · Small Business', title: "How to Reduce Business Operating Costs in the USA and Canada Without Hurting Service", description: "A practical cost-control guide for small businesses in the USA and Canada: audit recurring expenses, streamline admin, improve customer service and use outsourcing carefully.", href: '/blog/reduce-business-operating-costs-small-business-usa-canada/' },

  { category: 'USA & Canada · Small Business', title: "Small Business Owners Overwhelmed with Daily Tasks in the USA and Canada: How to Get Back in Control", description: "Practical ways for small business owners in the USA and Canada to manage daily tasks, reduce admin overload, delegate work and use virtual assistant support.", href: '/blog/small-business-owners-overwhelmed-daily-tasks-usa-canada/' },
  { category: 'USA & Canada · Small Business', title: "Cost of Hiring Employees in the USA and Canada", description: "Understand the real cost of hiring employees in the USA and Canada, including payroll obligations, benefits, recruitment, training and alternatives such as outsourcing.", href: '/blog/cost-of-hiring-employees-usa-canada/' },
  { category: 'USA & Canada · Small Business', title: "Outsourcing Administrative Work in Canada and the USA", description: "Learn how Canadian and U.S. small businesses can outsource administrative work safely, choose tasks, protect customer information and work with remote assistants.", href: '/blog/outsourcing-administrative-work-canada-usa/' },
  { category: 'USA & Canada · Small Business', title: "Customer Service Outsourcing for Small Businesses in the USA and Canada", description: "A practical guide to customer service outsourcing for small businesses in the USA and Canada, including email support, response standards, privacy, escalation and virtual assistant help.", href: '/blog/customer-service-outsourcing-small-business-usa-canada/' },
  { category: 'USA & Canada · Small Business', title: "Remote Administrative Support in the USA and Canada", description: "Explore remote administrative support for small businesses in the USA and Canada, including virtual assistants, task delegation, secure workflows and performance measures.", href: '/blog/remote-administrative-support-usa-canada/' },
  { category: 'USA & Canada · Small Business', title: "How to Reduce Business Operating Costs in the USA and Canada Without Hurting Service", description: "A practical cost-control guide for small businesses in the USA and Canada: audit recurring expenses, streamline admin, improve customer service and use outsourcing carefully.", href: '/blog/reduce-business-operating-costs-small-business-usa-canada/' },

  { category: 'USA & Canada · Small Business', title: 'Virtual Assistant vs Employee: Managing Costs and Workload in 2026', description: 'Research-backed advice on hiring pressure, outsourcing, remote admin support and when a virtual assistant may help.', href: '/blog/virtual-assistant-vs-employee-small-business-usa-canada-2026/' },

  { category: 'U.S. Industry News · November 2026', title: '2026 U.S. eCommerce and Printing Industry News', description: 'Latest U.S. developments in inventory, delivery, AI, freight, apparel decoration and print-shop operations.', href: '/blog/2026-us-ecommerce-printing-industry-news-operations-trends/' },

  { category: 'InkSoft · Chipply', title: 'InkSoft vs Chipply: Apparel Team Store Management Guide', description: 'Compare apparel-store workflows, supplier catalogs, product data and team-store order coordination.', href: '/blog/inksoft-chipply-apparel-team-store-management-guide/' },
  { category: 'Printavo · Screen Printing', title: 'Printavo for Screen Printing Shops', description: 'Organize quotes, artwork approvals, production schedules, job tracking and customer updates.', href: '/blog/printavo-screen-printing-shop-workflow-management/' },
  { category: 'Print on Demand', title: 'Printful vs Printify: Choosing a POD Partner', description: 'Compare POD fulfillment models, product samples, supplier choices and store operations.', href: '/blog/printful-printify-print-on-demand-supplier-comparison/' },
  { category: 'United States', title: '2026 U.S. Small Business Challenges: Rising Costs, Tariffs and Online Store Operations', description: 'Practical ways to manage cost pressure, tariff uncertainty, customer expectations and the day-to-day workload of an online store.', href: '/blog/2026-usa-small-business-cost-tariff-and-ecommerce-operations/' },
  { category: 'Canada', title: '2026 Canadian Small Business Challenges: Hiring, Employee Retention and Workload', description: 'Explore how better task organization and dependable operational support can help businesses manage staffing and workload pressures.', href: '/blog/2026-canada-small-business-hiring-retention-and-workforce-pressure/' },
  { category: 'USA & Canada', title: 'U.S.–Canada Business Uncertainty in 2026: Protecting Operations and Customer Service', description: 'A practical look at trade uncertainty, changing customer expectations and resilient eCommerce operations.', href: '/blog/2026-usa-canada-company-operations-trade-uncertainty-and-customer-service/' },
];
const blogGuides = [
  { category: 'eCommerce · USA', title: '2026 E-Commerce Trends in the USA', description: 'Improve product information, mobile shopping, social discovery, delivery details and customer support.', href: '/blog/2026-ecommerce-trends-usa/' },
  { category: 'eCommerce · Canada', title: '2026 E-Commerce Trends in Canada', description: 'Build customer trust with clear product data, shipping information, privacy practices and store operations.', href: '/blog/2026-ecommerce-trends-canada/' },
  { category: 'Apparel · Team Stores', title: '2026 Apparel and Team Store Operations', description: 'Guidance for apparel decorators, screen printers and team dealers managing catalogs and store launches.', href: '/blog/2026-apparel-team-store-trends-usa-canada/' },
  { category: 'Operations · Customer Care', title: 'E-Commerce Customer Support and Order Management', description: 'Organize customer enquiries, order updates, returns questions and routine store administration.', href: '/blog/2026-ecommerce-customer-support-order-management/' },
];
type InsightItem = { category: string; title: string; description: string; href: string };
function InsightCard({ item }: { item: InsightItem }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-charcoal-100 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-parrot-200 hover:shadow-card-hover">
      <span className="mb-4 inline-flex w-fit rounded-full bg-parrot-50 px-3 py-1.5 text-xs font-semibold text-parrot-700">{item.category}</span>
      <h3 className="font-display text-xl font-bold leading-snug text-charcoal-900">{item.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-500">{item.description}</p>
      <a href={item.href} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-charcoal-900 transition-colors group-hover:text-parrot-700">Read Article <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></a>
    </article>
  );
}
export default function Insights() {
  const { ref: articlesRef, isVisible: articlesVisible } = useReveal();
  const { ref: blogRef, isVisible: blogVisible } = useReveal();
  return (
    <>
      <section id="articles" className="bg-charcoal-50 py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div ref={articlesRef} className={`reveal mb-12 max-w-3xl ${articlesVisible ? 'is-visible' : ''}`}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-parrot-100 px-4 py-2 text-sm font-medium text-parrot-700"><Newspaper size={16} />Latest Articles</div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-charcoal-900 sm:text-4xl">Business Challenges in the USA & Canada</h2>
            <p className="mt-4 text-lg text-charcoal-500">Clear, practical perspectives on issues affecting growing businesses—and how organized eCommerce operations and reliable remote support can help.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{latestArticles.map(item => <InsightCard key={item.href} item={item} />)}</div>
          <div className="mt-10 flex justify-center"><a href="/blog/" className="inline-flex items-center gap-2 rounded-xl border border-charcoal-200 bg-white px-6 py-3.5 text-sm font-semibold text-charcoal-800 transition-colors hover:border-parrot-400 hover:bg-parrot-50">Explore All Articles <ArrowRight size={17} /></a></div>
        </div>
      </section>
      <section id="blog" className="bg-white py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div ref={blogRef} className={`reveal mb-12 max-w-3xl ${blogVisible ? 'is-visible' : ''}`}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-parrot-50 px-4 py-2 text-sm font-medium text-parrot-700"><BookOpen size={16} />FJX Studio Blog</div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-charcoal-900 sm:text-4xl">eCommerce Guides & Store Management Insights</h2>
            <p className="mt-4 text-lg text-charcoal-500">Useful guides for online retailers, apparel decorators, team dealers and businesses that want smoother store operations.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{blogGuides.map(item => <InsightCard key={item.href} item={item} />)}</div>
          <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-3xl bg-charcoal-900 px-8 py-10 text-center sm:flex-row sm:text-left">
            <div><h3 className="font-display text-2xl font-bold text-white">Need help putting these ideas into action?</h3><p className="mt-2 text-charcoal-300">Talk with FJX Studio about eCommerce operations, product management and customer support.</p></div>
            <a href="#contact" onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-parrot-400 px-7 py-4 text-sm font-bold text-charcoal-900 transition-colors hover:bg-parrot-300">Contact Us – Hire Us <ArrowRight size={18} /></a>
          </div>
        </div>
      </section>
    </>
  );
}
