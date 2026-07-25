import {describe,expect,it} from 'vitest'; import {formatMoney} from '@/lib/money'; describe('formatMoney',()=>{it('formats INR',()=>expect(formatMoney(22990)).toContain('22,990'))});
