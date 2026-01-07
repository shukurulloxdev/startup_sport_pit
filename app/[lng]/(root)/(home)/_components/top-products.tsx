'use client'
import { IProduct } from '@/app.types'
import ProductCard from '@/components/cards/product-card'
import Link from 'next/link'

interface Props {
	topProducts: IProduct[]
}
const TopProducts = ({ topProducts }: Props) => {
	return (
		<div className='max-w-6xl mx-auto mt-14 max-md:mt-12 max-md:px-3'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold text-gray-900 self-start'>
					Top mahsulotlar
				</h1>
				<Link href={'/products'}>
					<button className='relative text-sm font-medium text-blue-600 cursor-pointer self-end group underline'>
						Hammsi
					</button>
				</Link>
			</div>

			<div className='grid grid-cols-4 gap-3 max-md:grid-cols-2 mt-4'>
				{topProducts.map(product => (
					<ProductCard key={product._id} {...product} />
				))}
			</div>
		</div>
	)
}

export default TopProducts
