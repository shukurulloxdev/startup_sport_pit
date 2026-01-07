import TopBar from '@/components/shared/top-bar'
import { Button } from '@/components/ui/button'
import { GaugeCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

function Page() {
	return (
		<>
			<TopBar label={'Tashrif buyurish'} extra={'Muvaffaqiyatli!'} />

			<div className='container mx-auto mt-12 flex max-w-4xl flex-col items-center justify-center space-y-2'>
				<Image src={'/success.png'} alt='success' width={200} height={200} />

				<div className='text-center'>
					<h1 className='font-space-grotesk text-2xl font-bold'>
						{'Sizning buyurtmangiz yakunlandi!'}
					</h1>
					<p className='text-sm text-muted-foreground'>
						{'Rahmat, Tez orada sizga aloqaga chiqamiz'}
					</p>

					<Button
						className='mt-4 rounded-lg bg-blue-600 hover:bg-blue-700'
						size={'lg'}
						asChild
					>
						<Link href={'/'}>
							<span>Bosh sahifa</span>
							<GaugeCircle className='ml-1 size-4' />
						</Link>
					</Button>
				</div>
			</div>
		</>
	)
}

export default Page
