'use client'
import { IProduct } from '@/app.types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '@/components/ui/drawer'
import { formatPrice } from '@/lib/utils'
import { addToCard, removeCard } from '@/redux/reducers/basketState'
import { toggleFavorite } from '@/redux/reducers/favoriteState'
import { RootState } from '@/redux/store'
import { Check, CircleAlert, Handbag, Heart, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

function ProductCardActions(product: IProduct) {
	const router = useRouter()
	const dispatch = useDispatch()
	const [open, setOpen] = useState<boolean>(false)

	const handleAddToCart = () => {
		dispatch(addToCard(product))
		toast.success(`Savatga ${product.name}, qoshildi ✅`)
	}
	const handleRemoveToCart = () => {
		dispatch(removeCard(product._id))
		toast.success(`Mahsulot savatdan olindi! ✅`)
	}

	const basketProducts = useSelector(
		(state: RootState) => state.basket.basketProducts
	)
	const isBasket = basketProducts.find(card => card._id === product._id)
	const favoriteProducts = useSelector(
		(state: RootState) => state.favorite.favoriteProducts
	)

	const isFavorite = favoriteProducts.find(card => card._id === product._id)

	return (
		<>
			<div className='my-14 max-md:my-5 flex flex-col gap-4 w-full top-10'>
				<Card>
					<CardContent className='p-4 flex flex-col gap-6'>
						{product.discount ? (
							<div className='flex flex-col'>
								<h1 className='font-extrabold font-space-grotesk tracking-[2px] text-2xl'>
									{formatPrice(
										product.price - (product.price * product.percent) / 100
									)}{' '}
									so`m
								</h1>
								<span className='line-through text-red-500'>
									{formatPrice(product.price)}
								</span>
							</div>
						) : (
							<h1 className='font-extrabold font-space-grotesk tracking-[2px] text-2xl'>
								{formatPrice(product.price)}
								so`m
							</h1>
						)}
						<div className='flex flex-col gap-6'>
							<div className='grid grid-cols-4  gap-2'>
								<Button
									className='max-md:col-span-3 col-span-2 font-space-grotesk text-md bg-blue-300 hover:bg-blue-400'
									variant={'outline'}
									onClick={() => dispatch(addToCard(product))}
								>
									<Link href={'/shopping-card/card'}>Hozir sotib olish</Link>
								</Button>
								{isBasket ? (
									<Button
										variant={'outline'}
										className='bg-blue-500 hover:bg-blue-600 max-md:hidden'
										onClick={handleRemoveToCart}
									>
										<ShoppingCart className='!size-5 text-white' />
									</Button>
								) : (
									<Button
										variant={'outline'}
										onClick={handleAddToCart}
										className='max-md:hidden'
									>
										<ShoppingCart className='!size-5' />
									</Button>
								)}
								{isFavorite ? (
									<Button
										variant={'destructive'}
										onClick={() => dispatch(toggleFavorite(product))}
									>
										<Heart className='!size-5' />
									</Button>
								) : (
									<Button
										variant={'outline'}
										onClick={() => dispatch(toggleFavorite(product))}
									>
										<Heart className='!size-5' />
									</Button>
								)}
							</div>
							<div className='flex flex-col gap-2'>
								<div className='flex items-center gap-2'>
									<Button
										variant={'outline'}
										size={'icon'}
										className='bg-teal-100'
									>
										<Check />
									</Button>
									<h1>19 dona xarid qilish mumkin</h1>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className='p-4'>
						<div className='flex flex-col gap-2'>
							<h1 className='font-extrabold font-space-grotesk  text-xl'>
								2 Kun ichida yetkazib beramiz
							</h1>
							<span className=' font-space-grotesk text-sm text-muted-foreground'>
								BTS po`chta orqali ishonchli yetkazib beramiz, hohlasangaz
								uyingizga, yoki BTS o`zingizga yaqin BTS punktlariga
							</span>
						</div>
					</CardContent>
				</Card>
				{/*  */}
			</div>
			{/*  */}
			<div
				className='fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 
    shadow-[0_-4px_10px_rgba(0,0,0,0.1)] 
    p-4 flex justify-between items-center z-50 md:hidden h-20'
			>
				<div className=' font-bold text-pink-600 text-xl'>
					{product.discount ? (
						<div className='flex flex-col'>
							<h1 className='font-extrabold font-space-grotesk tracking-[2px] text-xl'>
								{formatPrice(
									product.price - (product.price * product.percent) / 100
								)}{' '}
								<span className='text-sm text-black tracking-tighter'>
									{' '}
									so`m
								</span>
							</h1>
							<span className='line-through text-black text-muted-foreground text-[12px] '>
								{formatPrice(product.price)}{' '}
								<span className='text-[10px] tracking-tighter'> so`m</span>{' '}
							</span>
						</div>
					) : (
						<h1 className='font-extrabold font-space-grotesk tracking-[2px] text-2xl'>
							{formatPrice(product.price)}
							so`m
						</h1>
					)}
				</div>
				{isBasket ? (
					<Button
						variant={'outline'}
						size={'lg'}
						className='bg-gray-200 '
						onClick={() => router.push('/shopping-card/card')}
					>
						<Handbag className='!size-5 text-violet-600' />{' '}
						<h1 className='text-violet-600'>O`tish</h1>
					</Button>
				) : (
					<Button
						size={'lg'}
						onClick={handleAddToCart}
						className='bg-violet-600 hover:bg-violet-500'
					>
						Savatga
					</Button>
				)}
			</div>
			<div className='md:hidden flex flex-col gap-6 mt-4'>
				<div className='flex items-center gap-2 px-1'>
					<CircleAlert className='!size-5' />
					<h1 className='font-semibold text-xl'> Mahsulot Tavsifi</h1>
				</div>
				<div className='flex justify-center items-center'>
					<Button
						className='w-[97%] bg-gray-200 text-black hover:bg-gray-300 text-muted-foreground'
						size={'lg'}
						onClick={() => setOpen(true)}
					>
						To`liq malumotni ko`rish
					</Button>
				</div>
			</div>
			<Drawer onOpenChange={setOpen} open={open}>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Mahsulotni to`liq malumoti</DrawerTitle>
						<DrawerDescription className='line-clamp-1'>
							{product.name}
						</DrawerDescription>
						<div className='mt-2'>
							{' '}
							{product.description.slice(0, 600) + '...'}
						</div>
					</DrawerHeader>
					<DrawerFooter>
						<DrawerClose>
							<Button
								variant='outline'
								className='w-full bg-violet-200 font-space-grotesk text-md'
							>
								Oynani yopish
							</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	)
}

export default ProductCardActions
