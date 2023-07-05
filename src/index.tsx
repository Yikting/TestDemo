import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Button } from 'antd'

// import routes from './router/routers'
import App from './app'

import 'antd/dist/reset.css'
import './index.less'
import './index02.css'

import icon1 from './assets/icons/3dmark-logo.svg'
import './assets/images/01.png'
import './assets/images/02.png'

console.log('icon1', icon1);
console.log('icon1', icon1);
console.log('icon1', icon1);
console.log('icon1', icon1);
console.log('icon1', icon1);
console.log('icon1', icon1);
console.log('icon1', icon1);
console.log('icon1', icon1);
console.log('icon1', icon1);
console.log('icon1', icon1);
console.log('icon1', icon1);
console.log('icon1', icon1);
console.log('icon1', icon1);
console.log('icon1', icon1);
console.log('icon1', icon1);
console.log('icon1', icon1);
console.log('icon1', icon1);
console.log('icon1', icon1);
console.log('icon1', icon1);
console.log('icon1', icon1);
console.log('icon1', icon1);
console.log('icon1', icon1);
console.log('icon1', icon1);


const root = createRoot(document.getElementById('root') as HTMLElement );

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ReactDom.render(
// 	<Router>
// 		<Link to="/">组件一</Link>
// 		<br />
// 		<Link to="/two">组件二</Link>

// 		{routes.map((value, key) => {
// 			if (value.text) {
// 				return (
// 					<Route
// 						exact
// 						path={value.path}
// 						component={value.component}
// 						key={key}
// 					/>
// 				)
// 			} else {
// 				return <Route path={value.path} component={value.component} key={key} />
// 			}
// 		})}
// 	</Router>,
// 	document.getElementById('root'),
// )
