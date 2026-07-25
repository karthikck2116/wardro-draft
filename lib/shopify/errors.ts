export class ShopifyHttpError extends Error{constructor(public status:number,body:string){super(`Shopify HTTP ${status}: ${body.slice(0,300)}`)}}
export class ShopifyGraphQLError extends Error{constructor(public errors:{message:string}[]){super(`Shopify GraphQL: ${errors.map(x=>x.message).join('; ')}`)}}
