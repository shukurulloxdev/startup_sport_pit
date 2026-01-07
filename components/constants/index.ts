import {
	BaggageClaim,
	BookCopy,
	Contact,
	CreditCard,
	FileCode,
	GaugeCircle,
	Headphones,
	Home,
	LayoutDashboard,
	MonitorPlay,
	Package,
	ShieldCheck,
	TableOfContents,
	Truck,
} from 'lucide-react'

export const navLinks = [
	{ route: '', name: 'Bosh sahifa', icon: Home },
	{ route: 'categories', name: 'Kategoriyalar', icon: TableOfContents },
	{ route: 'products', name: 'Mahsulotlar', icon: Package },
	{ route: 'blogs', name: 'Bloglar', icon: LayoutDashboard },
	{ route: 'about', name: 'Biz haqimizda', icon: BookCopy },
	{ route: 'contact', name: 'Bog`lanish', icon: Contact },
]

export const coruselBanner = [
	{ img: '/banners/banner4.webp' },
	{ img: '/banners/banner1.jpg' },
	{ img: '/banners/banner7.jpg' },
]

export const allCategories = [
	{ img: '/category/protaine.png', name: 'Protaine', route: 'protaine' },
	{ img: '/category/gainer.png', name: 'Gainer', route: 'gainer' },
	{ img: '/category/bcca.png', name: 'Bcca', route: 'bcaa' },

	{ img: '/category/creatine.png', name: 'Creatine', route: 'creatine' },
	{ img: '/category/vitamin.png', name: 'Vitamins', route: 'vitamin' },
	{ img: '/category/omega.png', name: 'Omega 3', route: 'omega-3' },
	//
	{ img: '/category/bay.png', name: 'Bolalarga', route: 'for-babys' },
	{ img: '/category/women.png', name: 'Ayollarga', route: 'for-womens' },
]

export const services = [
	{
		icon: Truck,
		title: 'Доставка по Узбекистану',
		description: 'Быстрая и надежная доставка по всей стране.',
	},
	{
		icon: ShieldCheck,
		title: 'Денежная гарантия',
		description: 'Обмен и возврат в течение 3 дней.',
	},
	{
		icon: Headphones,
		title: 'Онлайн поддержка',
		description: '24/7 доступ к нашему контактному центру.',
	},
	{
		icon: CreditCard,
		title: 'Гибкий платёж',
		description: 'Оплата разными кредитными картами.',
	},
]
export const lngs = [
	{ route: 'ru', label: 'Русский' },
	{ route: 'uz', label: "O'zbekcha" },
]

export const selectCategories = [
	{ label: 'all', name: 'All' },
	{ label: 'discount', name: 'Discounts' },
	{ label: 'protaine', name: 'Proteins' },
	{ label: 'gainer', name: 'Gainers' },
	{ label: 'creatine', name: 'Creatines' },
	{ label: 'bcaa', name: 'Bcaas' },
	{ label: 'vitamin', name: 'Vitamins' },
	{ label: 'omega-3', name: 'Omega 3' },
	{ label: 'for-babys', name: 'For Babys' },
	{ label: 'for-womens', name: 'For Womens' },
]
export const filyallar = [
	{ label: 'Fargona filial', name: 'fargona' },
	{ label: 'Andijon filial', name: 'andijon' },
	{ label: 'Toshkent filial', name: 'toshkent' },
	{ label: 'Namangan filial', name: 'namangan' },
	{ label: 'Samarqand filial', name: 'samarqand' },
]
export const filyallarChet = [
	{ label: 'Qazagiston filial', name: 'qazagiston' },
	{ label: 'Tojigiston filial', name: 'tojigiston' },
]

// locations
export const mapData: Record<string, string> = {
	toshkent:
		'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2504.245166738438!2d71.4254531764457!3d51.122385671728274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42458578eae5c671%3A0x94cdc6a51e38e504!2sBody-pit-life!5e0!3m2!1sru!2s!4v1757401791735!5m2!1sru!2s',
	fargona:
		'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.2792505263956!2d69.29141947587766!3d41.36801727130233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef3b33d4c6a67%3A0x4ea83952e9d353b1!2sBODY_PIT_UZ!5e0!3m2!1sru!2s!4v1757401717316!5m2!1sru!2s',
	tojigiston:
		'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.2792505263956!2d69.29141947587766!3d41.36801727130233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef3b33d4c6a67%3A0x4ea83952e9d353b1!2sBODY_PIT_UZ!5e0!3m2!1sru!2s!4v1757401717316!5m2!1sru!2s',
	namangan:
		'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d767092.5669795347!2d68.06182157812499!3d41.32071100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b315c6e82d5%3A0xeac27dbdf823ea13!2sSportshopintashkent!5e0!3m2!1sru!2s!4v1757400558792!5m2!1sru!2s',
	andijon:
		'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193441.15829689446!2d72.04126599453124!3d40.75062819999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bcedd6940f4665%3A0xe1b7a5cabf4e9979!2sOlimp-nutrition!5e0!3m2!1sru!2s!4v1757400641391!5m2!1sru!2s',
	samarqand:
		'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d786348.1154949096!2d66.24171440242124!3d39.65708838812287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4d19fbd26391b5%3A0xfde06b6db8ae74ec!2zUFJPIFNQT1JUINC80LDQs9Cw0LfQuNC9INGB0L_QvtGA0YLRgtC-0LLQsNGA0L7Qsg!5e0!3m2!1sru!2s!4v1757400748959!5m2!1sru!2s',
	qazagiston:
		'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d786348.1154949096!2d66.24171440242124!3d39.65708838812287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4d19fbd26391b5%3A0xfde06b6db8ae74ec!2zUFJPIFNQT1JUINC80LDQs9Cw0LfQuNC9INGB0L_QvtGA0YLRgtC-0LLQsNGA0L7Qsg!5e0!3m2!1sru!2s!4v1757400748959!5m2!1sru!2s',
}

export const instructorNavLinks = [
	{
		label: 'Statistika',
		route: '/admin',
		icon: GaugeCircle,
	},
	{
		label: 'Buyurtmalar',
		route: '/admin/orders',
		icon: BaggageClaim,
	},
	{
		label: 'Mahsulotlar',
		route: '/admin/my-products',
		icon: MonitorPlay,
	},
	{
		label: 'Mahsulot kiritish',
		route: '/admin/create-product',
		icon: FileCode,
	},
	// {
	// 	label: 'Reviews',
	// 	route: '/admin/reviews',
	// 	icon: MessageSquareMore,
	// },
	// {
	// 	label: 'Settings',
	// 	route: '/admin/settings',
	// 	icon: Settings2,
	// },
]

export const chooseCategory = [
	{ value: 'protaine', label: 'Protaine' },
	{ value: 'bcaa', label: 'Bcaa' },
	{ value: 'creatine', label: 'Creatine' },
	{ value: 'gainer', label: 'Gainer' },
	{ value: 'omega-3', label: 'Omega-3' },
	{ value: 'vitamin', label: 'Vitamin' },
	{ value: 'for-babys', label: 'For-babys' },
	{ value: 'for-womens', label: 'For-womens' },
]

// <nav className='flex flex-col gap-3 text-gray-700 flex-1'>
// 						<div className='flex items-center gap-2 font-medium text-blue-600'>
// 							<LayoutDashboard className='w-5 h-5' /> Bosh sahifa
// 						</div>
// 						<div className='flex items-center gap-2'>
// 							<Package className='w-5 h-5' /> Mahsulotlar
// 						</div>
// 						<div className='flex items-center gap-2'>
// 							<Mail className='w-5 h-5' /> Mail
// 						</div>
// 						<div className='flex items-center gap-2'>
// 							<Flag className='w-5 h-5' /> Campaigns
// 						</div>
// 						<div className='flex items-center gap-2'>
// 							<Calendar className='w-5 h-5' /> Calendar
// 						</div>
// 						<div className='flex items-center gap-2'>
// 							<Contact className='w-5 h-5' /> Contacts
// 						</div>
// 					</nav>
