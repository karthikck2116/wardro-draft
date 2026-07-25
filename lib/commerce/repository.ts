import { products } from '@/data/mock/products'; import type { CollectionOptions, CommerceRepository, Product } from '@/types/commerce';
class MockCommerceRepository implements CommerceRepository {
 async getHomepageData(){return products.slice(0,5)}
 async getCollection(_handle:string,o:CollectionOptions){
  let out=[...products];
  if(o.doors)out=out.filter(p=>p.doorCount===o.doors);
  if(o.colour)out=out.filter(p=>p.colours.some(c=>c.toLowerCase()===o.colour?.toLowerCase()));
  if(o.mirror)out=out.filter(p=>p.variants.some(v=>v.mirror===(o.mirror==='with'?'With Mirror':'Without Mirror')));
  if(o.minPrice)out=out.filter(p=>p.price.amount>=o.minPrice!);
  if(o.maxPrice)out=out.filter(p=>p.price.amount<=o.maxPrice!);
  if(o.storageType)out=out.filter(p=>p.type.toLowerCase().includes(o.storageType!.toLowerCase()));
  if(o.sort==='price-low')out.sort((a,b)=>a.price.amount-b.price.amount);
  if(o.sort==='price-high')out.sort((a,b)=>b.price.amount-a.price.amount);
  return out
 }
 async getProduct(handle:string){return products.find(p=>p.handle===handle)??null}
 async searchProducts(query:string){const q=query.toLowerCase();return products.filter(p=>`${p.title} ${p.type} ${p.doorCount} ${p.colours.join(' ')}`.toLowerCase().includes(q))}
}
export const commerce:CommerceRepository=new MockCommerceRepository();
export const getRelated=(p:Product)=>products.filter(x=>x.id!==p.id).slice(0,4);
