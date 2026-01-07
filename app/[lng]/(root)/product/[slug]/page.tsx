import { getProductByCategory, getProductById } from '@/actions/product-action'
import TopBar from '@/components/shared/top-bar'
import InfoProduct from './_components/info-product'
import ProductCardActions from './_components/product-card-actions'
// import ProductReviews from './_components/product-reviews'
import RecommendProducts from './_components/recommend-products'
async function Page({ params: { slug } }: { params: { slug: string } }) {
	const productJSON = await getProductById(slug)
	const product = JSON.parse(JSON.stringify(productJSON))
	const productsCategoryJSON = await getProductByCategory(product.category)
	const productsByCategory = JSON.parse(JSON.stringify(productsCategoryJSON))
	// const productReviewsJSON = await getProductReviews(slug)
	// const productReviews = JSON.parse(JSON.stringify(productReviewsJSON))
	console.log(productsByCategory)

	return (
		<>
			<TopBar label={'Products'} extra={product.name} />
			<div className='max-w-6xl mx-auto mt-8  max-md:px-3'>
				<div className='grid grid-cols-3 max-md:grid-cols-1 md:gap-4'>
					<div className='md:col-span-2'>
						<InfoProduct {...product} />
					</div>
					<ProductCardActions {...product} />
				</div>

				{/* <ProductReviews productReviews={productReviews} /> */}

				<div className='flex flex-col gap-6 mt-12'>
					<h1 className='text-2xl max-md:text-xl font-extrabold font-space-grotesk'>
						Shuningdek, tavsiya qilamiz
					</h1>
					<div>
						<RecommendProducts
							productId={product._id}
							products={productsByCategory}
						/>
					</div>
				</div>
			</div>

			{/* onOpenChange={setIsOpen} open={isOpen} */}
		</>
	)
}

export default Page
