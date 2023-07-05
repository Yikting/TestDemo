import ComponentOne from 'components/test01/ComponentOne'
import ComponentTwo from 'components/test01/ComponentTwo'

let routes = [
	{
		path: '/',
		component: ComponentOne,
		exact: true,
	},
	{
		path: '/two',
		component: ComponentTwo,
	},
]

export default routes
