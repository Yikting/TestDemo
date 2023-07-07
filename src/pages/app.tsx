import React, { FC } from 'react'

import Home from 'components/test01/Home'
import ImageLazyLoad from 'components/test02/ImageLazyLoad'
import ReactVirtualList from 'components/test03/ReactVirtualList'

const App: FC = () => {

  return (<>
    {/* <Home /> */}
    {/* <ImageLazyLoad /> */}
    <ReactVirtualList />
  </>
  )
}

export default App