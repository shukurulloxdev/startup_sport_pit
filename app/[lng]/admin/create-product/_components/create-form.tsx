'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { createProductSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'

import { createProduct } from '@/actions/product-action'
import { chooseCategory } from '@/components/constants'
import { clearImages } from '@/redux/reducers/imagesState'
import { RootState } from '@/redux/store'
import { useAuth } from '@clerk/nextjs'
import { ImagePlus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import z from 'zod'
import UploadCustom from './image-uploader'

function CreateForm() {
	const [isDiscount, setIsDiscount] = useState<boolean>(false)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const dispatch = useDispatch()
	const { userId } = useAuth()
	const images = useSelector((state: RootState) => state.images.images)
	const defaultValues: z.infer<typeof createProductSchema> = {
		name: '',
		category: '',
		description: '',
		brand: '',
		price: '',
		top: false,
		discount: false,
		percent: '',
	}

	const form = useForm<z.infer<typeof createProductSchema>>({
		resolver: zodResolver(createProductSchema),
		defaultValues,
	})
	console.log(userId!)

	function onSubmit(values: z.infer<typeof createProductSchema>) {
		if (images.length === 0) {
			return toast.error('Sorry, you did not upload a picture.')
		}
		if (!userId) {
			toast.error('User Yo`q')
			return
		}

		const result = createProduct(userId!, {
			...values,
			price: +values.price,
			percent: values.percent ? +values.percent : 0,
			images,
		})
		result.then(() => {
			dispatch(clearImages())
			form.reset(defaultValues)
		})
		toast.promise(result, {
			loading: 'Loading...',
			success: 'Mahsulot qo`shildi ✅',
			error: 'Unfortunately, the product could not be loaded.',
		})
	}

	return (
		<>
			<div className='w-full flex gap-3 mt-6'>
				<div className='w-[65%]'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<Card className='shadow rounded-2xl w-full'>
								<CardContent className='p-4 flex flex-col gap-3'>
									<div className='grid grid-cols-2 gap-3'>
										<FormField
											control={form.control}
											name='name'
											render={({ field }) => (
												<FormItem>
													<FormLabel className='font-space-grotesk font-bold'>
														Product name
													</FormLabel>
													<FormControl>
														<Input {...field} placeholder='Product full name' />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='category'
											render={({ field }) => (
												<FormItem>
													<FormLabel className='font-space-grotesk font-bold'>
														Category choose
													</FormLabel>
													<FormControl>
														<Select
															value={field.value}
															onValueChange={field.onChange}
														>
															<SelectTrigger>
																<SelectValue placeholder='Select a category' />
															</SelectTrigger>
															<SelectContent>
																{chooseCategory.map(slect => (
																	<SelectItem
																		value={slect.value}
																		key={slect.value}
																	>
																		{slect.label}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<FormField
										control={form.control}
										name='description'
										render={({ field }) => (
											<FormItem>
												<FormLabel className='font-space-grotesk font-bold'>
													{' '}
													Product description
												</FormLabel>
												<FormControl>
													<Textarea
														{...field}
														placeholder='Complete information about the product'
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<div className='grid grid-cols-2 gap-3 '>
										<FormField
											control={form.control}
											name='brand'
											render={({ field }) => (
												<FormItem>
													<FormLabel className='font-space-grotesk font-bold'>
														Brend
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															placeholder='What brand is the product?'
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='price'
											render={({ field }) => (
												<FormItem>
													<FormLabel className='font-space-grotesk font-bold'>
														Price
													</FormLabel>
													<FormControl>
														<Input
															type='number'
															{...field}
															placeholder='Product price'
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									<div className='flex flex-col gap-3 mt-4'>
										<FormField
											control={form.control}
											name='top'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<div className='flex items-center gap-2'>
															<Checkbox
																onCheckedChange={field.onChange}
																className='data-[state=checked]:bg-blue-700 data-[state=checked]:border-blue-800'
															/>
															<Label className='font-space-grotesk text-muted-foreground mt-[3px]'>
																Should this product be on Top?
															</Label>
														</div>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='discount'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<div className='flex items-center gap-2'>
															<Checkbox
																checked={field.value}
																onCheckedChange={checked => {
																	field.onChange(checked) // formaga yozadi
																	setIsDiscount(!!checked) // local statega yozadi
																	if (!checked) {
																		form.setValue('percent', '')
																	}
																}}
																className='data-[state=checked]:bg-blue-700 data-[state=checked]:border-blue-800'
															/>
															<Label className='font-space-grotesk text-muted-foreground mt-[3px]'>
																Should a discount be given?
															</Label>
														</div>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>
										{isDiscount === true ? (
											<div className='mt-4'>
												<FormField
													control={form.control}
													name='percent'
													render={({ field }) => (
														<FormItem>
															<FormLabel className='font-space-grotesk font-bold'>
																Discount Percent
															</FormLabel>
															<FormControl>
																<Select
																	value={field.value}
																	onValueChange={field.onChange}
																>
																	<SelectTrigger className='w-[50%]'>
																		<SelectValue placeholder='Enter the percentage %' />
																	</SelectTrigger>
																	<SelectContent>
																		<SelectItem value='5'>5%</SelectItem>
																		<SelectItem value='10'>10%</SelectItem>
																		<SelectItem value='15'>15%</SelectItem>
																		<SelectItem value='20'>20%</SelectItem>
																		<SelectItem value='30'>30%</SelectItem>
																		<SelectItem value='40'>40%</SelectItem>
																		<SelectItem value='50'>50%</SelectItem>
																	</SelectContent>
																</Select>
															</FormControl>

															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
										) : null}
									</div>
									<div className='flex items-center justify-between mt-7'>
										<Button type='submit' variant={'outline'}>
											Clear
										</Button>
										<div className='flex items-center gap-2'>
											<Button type='submit' variant={'outline'}>
												Save as Draft
											</Button>
											<Button
												type='submit'
												className='bg-blue-700 hover:bg-blue-800'
											>
												Publish
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						</form>
					</Form>
				</div>
				<div className='w-[35%]'>
					<Card className='shadow rounded-2xl w-full '>
						<CardContent className='p-4'>
							<div>
								<div className='flex items-center justify-between pb-2'>
									<div className='font-space-grotesk font-bold flex items-center gap-1'>
										Preview image <ImagePlus className='!size-5' />
									</div>
									{images.length > 0 ? (
										<Button
											size={'icon'}
											className='self-end bg-red-600 h-6 '
											onClick={() => setIsOpen(true)}
										>
											<Trash2 />
										</Button>
									) : null}
								</div>
								<UploadCustom />
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			<Dialog onOpenChange={setIsOpen} open={isOpen}>
				<DialogContent>
					<div className='flex flex-col gap-4 p-1 pt-3'>
						<div className='grid grid-cols-3 gap-2'>
							{images.map((url, index) => (
								<div
									key={url}
									className='relative w-full h-32 rounded-md overflow-hidden border-2'
								>
									<Image src={url} alt={`upload-${index}`} fill />
								</div>
							))}
						</div>
						<div className='flex justify-between'>
							<h1 className='font-space-grotesk font-bold'>
								Do you want to clean the pictures?
							</h1>
							<Button
								size={'sm'}
								variant={'destructive'}
								onClick={() => {
									dispatch(clearImages())
									setIsOpen(false)
								}}
							>
								Clear all Images
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default CreateForm
