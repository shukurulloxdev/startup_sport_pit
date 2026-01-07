'use client'
import { deleteProductById } from '@/actions/product-action'
import { IProduct } from '@/app.types'
import { selectCategories } from '@/components/constants'
import Pagination from '@/components/shared/pagination'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { formUrlQuery } from '@/lib/utils'
import { Plus } from 'lucide-react'
import {
	useParams,
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'
import { toast } from 'sonner'
import TableProducts from './table-products'
interface Props {
	result: {
		adminProducts: IProduct[]
		isNext: boolean
	}
}

export default function UserProducts({ result }: Props) {
	const { adminProducts, isNext } = result
	const { lng } = useParams()
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const page = searchParams.get('page')

	const onDelete = (id: string) => {
		const result = deleteProductById(id, pathname)
		toast.promise(result, {
			loading: 'Loading...',
			success: 'Successfully deleted ✅',
			error: 'Delete Error',
		})
	}
	function filterProducts(value: string) {
		const newUrl = formUrlQuery({
			params: searchParams.toString(),
			key: 'filter',
			value,
		})
		router.push(newUrl)
	}
	return (
		<div className='p-6 h-full'>
			<div className='flex items-center justify-between mb-6'>
				<h1 className='text-2xl font-bold'>Saytdagi barcha mahsulotlar</h1>
				<div className='flex items-center gap-3'>
					<Select onValueChange={filterProducts}>
						<SelectTrigger className='w-[560px]  font-space-grotesk tracking-widest'>
							<SelectValue placeholder='Filter Products' />
						</SelectTrigger>
						<SelectContent className='border'>
							{selectCategories.map(category => (
								<SelectItem value={category.label} key={category.label}>
									{category.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Button
						className='bg-blue-600 hover:bg-blue-700 flex items-center'
						onClick={() => router.push(`/${lng}/admin/create-product`)}
					>
						<Plus />
						<span>Add Product</span>
					</Button>
				</div>
			</div>

			<Card className='shadow rounded-2xl'>
				<CardContent className='p-4'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Product</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Price</TableHead>

								<TableHead>Status</TableHead>
								<TableHead className='text-right'>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{adminProducts.map(product => (
								<TableProducts
									key={product._id}
									product={product}
									onDelete={() => onDelete(product._id)}
								/>
							))}
						</TableBody>
					</Table>
					<Pagination isNext={isNext} pageNumber={page ? +page : 1} />
				</CardContent>
			</Card>
		</div>
	)
}
