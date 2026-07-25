export const MONEY_FRAGMENT=`fragment MoneyFields on MoneyV2 { amount currencyCode }`;
export const PRODUCT_FRAGMENT=`fragment ProductFields on Product { id handle title description featuredImage { url altText width height } priceRange { minVariantPrice { amount currencyCode } } options { name values } }`;
