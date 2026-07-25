import {NextRequest,NextResponse} from 'next/server'; import {checkServiceability} from '@/lib/delivery/check-serviceability';
export async function GET(req:NextRequest){return NextResponse.json(checkServiceability(req.nextUrl.searchParams.get('pincode')||''))}
