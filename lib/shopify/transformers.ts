import type {ShopifyMoney} from './types'; import type {Money} from '@/types/commerce'; export const toMoney=(m:ShopifyMoney):Money=>({amount:Number(m.amount),currencyCode:'INR'});
