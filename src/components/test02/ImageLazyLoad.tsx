/**
 * 测试LazyLoadImage
 * 
 */

import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { initListData } from 'utils/util'

const ImageLazyLoad = () => {
  const data = initListData(50)

  return (<>
    {
      data.map(v =>
        <div key={v.id} style={{width: '100%', height: 230}}>
          <LazyLoadImage
            src="https://c1.neweggimages.com/ProductImageCompressAll300/32-074-004-03.png" // use normal <img> attributes as props
            effect="opacity"
            threshold={500}
          />
        </div>
      )
    }
  </>)
}

export default ImageLazyLoad