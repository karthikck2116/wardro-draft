export type Money = { amount: number; currencyCode: 'INR' };
export type ProductOption = { name: string; values: string[] };
export type Variant = { id: string; colour: string; mirror: string; price: Money; compareAt?: Money; available: boolean };
export type Accessory = { id: string; title: string; price: Money };
export type ProductNeedMetadata = {
  roomSizes?: string[];
  familySizes?: string[];
  storageFeatures?: string[];
};
export type Product = { id:string; handle:string; title:string; description:string; images:string[]; featuredImage:string; secondaryImage?:string; galleryImages:string[]; collection:string; price:Money; compareAt?:Money; doorCount:number; type:string; colours:string[]; mirror:boolean; bestSeller:boolean; ready:boolean; readyToDispatch:boolean; customisable:boolean; dimensions:string; variants:Variant[]; accessories:Accessory[]; needMetadata?:ProductNeedMetadata; publishedAt?:string };
export type CollectionOptions = {
  doors?: number;
  colour?: string;
  mirror?: "with" | "without";
  minPrice?: number;
  maxPrice?: number;
  storageType?: string;
  sort?: string;
};
export interface CommerceRepository { getHomepageData():Promise<Product[]>; getCollection(handle:string, options:CollectionOptions):Promise<Product[]>; getProduct(handle:string):Promise<Product|null>; searchProducts(query:string):Promise<Product[]> }
