import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Button } from 'antd'

// import routes from './router/routers'

import 'antd/dist/reset.css'
import './index.less'
import './index02.css'

import './assets/01.png'
import './assets/02.png'
import App from './app'


const root = createRoot(document.getElementById('root'));

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
