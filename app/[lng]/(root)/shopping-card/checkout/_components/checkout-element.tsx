'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { RootState } from '@/redux/store'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import CheckoutForm from './checkout-form'

function CheckoutElement() {
	const basketProducts = useSelector(
		(state: RootState) => state.basket.basketProducts
	)

	const stripePromise = loadStripe(
		process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
	)
	return (
		<div className='max-w-6xl mx-auto mt-10 max-md:px-3 max-md:mt-6'>
			<div className='grid grid-cols-3 max-md:grid-cols-1 gap-2 items-start'>
				{/* <Card className='md:hidden'>
					<CardContent className='p-4'>
						<div className='flex flex-col gap-2'>
							<div className='flex flex-col'>
								<h1 className='font-bold font-space-grotesk text-xl'>
									Jami To`lov
								</h1>
								<span className='text-sm'>
									Jami to`lovlar super chigirmalar bilan
								</span>
							</div>
							<Separator className='my-1' />
							<div className='flex items-center justify-between'>
								<span className='font-bold'>Jami:</span>
								<span>{formatPrice(total)} so`m</span>
							</div>
						</div>
					</CardContent>
				</Card> */}
				<Card className='col-span-2 max-md:col-span-1'>
					<CardContent className='p-4'>
						<h1 className='font-space-grotesk text-2xl font-bold'>
							Malumotlarni kiriting
						</h1>
						<p className='text-muted-foreground text-sm'>
							Buyurtma berish uchun malumotlaringizni kiriting
						</p>
						<Elements stripe={stripePromise}>
							<CheckoutForm />
						</Elements>
					</CardContent>
				</Card>
				<div className='flex flex-col gap-2'>
					<Card>
						<CardContent className='p-4'>
							<div className='flex flex-col gap-2'>
								<div className='flex flex-col'>
									<h1 className='font-bold font-space-grotesk text-xl'>
										Buyurtmalar
									</h1>
									<span className='text-sm'>Savatdagi barcha mahsulotlar</span>
								</div>
								<Separator className='my-1' />
								<div className='flex flex-col gap-2'>
									{basketProducts.map(product => (
										<div className='flex items-center gap-1' key={product._id}>
											<Image
												src={product.images[0]}
												alt={product.name}
												width={45}
												height={45}
											/>
											<div className='flex items-center gap-1'>
												<span className='font-space-grotesk border-r-2 border-red-600 pr-2'>
													{product.name.slice(0, 17)}
												</span>

												<span className='font-space-grotesk pl-2'>
													{product.soni} ta
												</span>
											</div>
										</div>
									))}
								</div>
							</div>
						</CardContent>
					</Card>
					{/* <div className='max-md:hidden'>
						<Card>
							<CardContent className='p-4'>
								<div className='flex flex-col gap-2'>
									<div className='flex flex-col'>
										<h1 className='font-bold font-space-grotesk text-xl'>
											Jami To`lov
										</h1>
										<span className='text-sm'>
											Jami to`lovlar super chigirmalar bilan
										</span>
									</div>
									<Separator className='my-1' />
									<div className='flex items-center justify-between'>
										<span className='font-bold'>Jami:</span>
										<span>{formatPrice(total)} so`m</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div> */}
				</div>
			</div>
		</div>
	)
}

export default CheckoutElement
