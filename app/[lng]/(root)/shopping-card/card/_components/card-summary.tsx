'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/lib/utils'
import { selectBasketSummary } from '@/redux/reducers/basketState'
import Link from 'next/link'
import { useSelector } from 'react-redux'

export default function CartSummary() {
	const { total, totalDiscount, deliveryPrice } =
		useSelector(selectBasketSummary)

	return (
		<Card>
			<CardContent className='p-4 space-y-2'>
				{/* Coupon */}
				<div>
					<h2 className='font-semibold mb-2'>Promokodingiz bo`lsa kiriting</h2>
					<Input placeholder='Promokodni kiriting' />
					<Button className='mt-3 w-full' variant='outline'>
						Promokodni yuborish
					</Button>
				</div>
				<div>
					<h2 className='font-semibold mb-2'>Buyurtma xulosasi</h2>
					<div className='space-y-2 text-sm text-gray-600'>
						<div className='flex justify-between'>
							<span>Chegirma</span>
							<span>{formatPrice(totalDiscount)} so`m</span>
						</div>
						<div className='flex justify-between'>
							<span>Yetkazib berish</span>
							<span>
								{deliveryPrice === 0 ? 'Beepul' : formatPrice(deliveryPrice)}{' '}
							</span>
						</div>
					</div>
					<div className='flex justify-between mt-2 text-lg font-bold'>
						<span>Jami:</span>
						<span>{formatPrice(total)}</span>
					</div>
				</div>
				<Separator className='my-3' />
				<div className='flex flex-col gap-1'>
					<Link href={'/shopping-card/checkout'}>
						<Button className='w-full bg-blue-700 hover:bg-blue-800'>
							Rasmilashtirish
						</Button>
					</Link>
				</div>
			</CardContent>
		</Card>
	)
}
