import TopBar from '@/components/shared/top-bar'
import CheckoutElement from './_components/checkout-element'

function Page() {
	return (
		<div>
			<TopBar label={'To`lov '} extra={'Buyurtma qilish'} />
			<CheckoutElement />
		</div>
	)
}

export default Page
