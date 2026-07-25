import {notFound} from 'next/navigation';
const content:Record<string,[string,string,string[]]>={
'measure-your-space':['Measure your space','A few careful measurements help you choose with confidence.',['Wall width and room height','Available depth and skirting projection','Door clearance and doorway width','Lift access and installation notes']],
'wardro-guide':['The Wardro Guide','Practical advice for calmer, better organised homes.',['Choosing the right wardrobe','Small-bedroom storage ideas','Care and maintenance','Planning your room']],
'materials-and-quality':['Materials & quality','Clear details, honest materials and proof you can inspect.',['Premium engineered wood','Hardware and strength testing','Factory images and videos','Care information']],
'inside-our-factory':['Inside our factory','Wardro by HomeCraft: built with process, care and accountable quality.',['Manufacturing process','Strength-test videos','Quality checks','Installation videos']],
'about':['About Wardro','Wardro by HomeCraft creates thoughtfully designed storage for modern Indian homes.',['More space, less chaos','Designed around real homes','Bengaluru launch service','Responsible support']],
'support':['How can we help?','Choose a support topic or use the configured WhatsApp, phone or email channel.',['Delivery & installation','Warranty','Cancellation & replacement','Service request']],
'track-order':['Track your order','Shopify Customer Account connection is required to display live order information.',['Order status','Delivery updates','Installation confirmation']],
'account':['Your Wardro account','Connect Shopify Customer Account API to access live customer information.',['Orders and invoices','Warranty information','Service requests','Saved addresses and wishlist']],
'wishlist':['Your wishlist','Saved products are stored in this browser while shopping as a guest.',['Guest-friendly saving','Sync-ready account architecture']],
'privacy':['Privacy','Wardro only collects information needed to provide the store and fulfil your request.',['Store data','Customer choices','Contact preferences']],
'terms':['Terms & conditions','Purchase terms are confirmed through Shopify checkout.',['Delivery eligibility','Warranty','Cancellation and replacement']]
};
export default async function ContentPage({params}:{params:Promise<{slug:string}>}){const c=content[(await params).slug];if(!c)notFound();return <><section className="content-hero"><div className="shell"><p className="eyebrow">Wardro</p><h1>{c[0]}</h1><p>{c[1]}</p></div></section><section className="shell content-grid">{c[2].map((x,i)=><article key={x}><span>0{i+1}</span><h2>{x}</h2><p>Detailed launch-ready content and connected data can be managed from Shopify and the Wardro content workflow.</p></article>)}</section></>}
