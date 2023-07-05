import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import App from './pages/app'

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
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
