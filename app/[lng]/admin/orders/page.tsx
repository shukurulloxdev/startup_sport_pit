import { getOrders } from '@/actions/order-action'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CompletedOrders from './_components/completed-orders'
import NewOrders from './_components/new-orders'
async function Page() {
	const orders = await getOrders()
	console.log(orders)
	return (
		<div className='p-4'>
			<h1 className='text-2xl font-bold'>Barcha buyurtmalar</h1>
			<div className='mt-4'>
				<Tabs defaultValue='newOrders' className='w-full'>
					<TabsList className='w-full flex justify-start border-b gap-4 bg-transparent p-0'>
						<TabsTrigger
							value='newOrders'
							className='relative rounded-md border-b-2 border-transparent px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:border-blue-500 data-[state=active]:text-black'
						>
							Yangi buyurtmalar
						</TabsTrigger>
						<TabsTrigger
							value='completedOrders'
							className='relative rounded-md border-b-2 border-transparent px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:border-blue-500 data-[state=active]:text-black'
						>
							Yakunlangan buyurtmalar
						</TabsTrigger>
					</TabsList>
					<TabsContent value='newOrders'>
						<NewOrders orders={orders} />
					</TabsContent>
					<TabsContent value='completedOrders'>
						<CompletedOrders orders={orders} />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}

export default Page
