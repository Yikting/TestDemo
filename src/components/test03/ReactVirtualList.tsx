import React, { useCallback, useRef, useState } from "react"

import { initListData } from "utils/util"

const ReactVirtualList = () => {
  const allListData = useRef(initListData(20))
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleData, setVisibleData] = useState([])
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(0)
  const [scrollOffset, setScrollOffset] = useState(0)
  const itemHeight = 200

  // 返回随机数据
  const getTenListData = useCallback(() => initListData(20), []);

  const data = getTenListData()

  const listHeight = allListData.current.length * itemHeight

  return (<div className="list-container" ref={containerRef}>
    <div className="list-placeholder" style={{ height: listHeight }}></div>
    <div className="list-scroll" >
      {
        data.map((v, idx) => <div key={v.id} className="content">{v.content}</div>)
      }
    </div>
  </div>)
}

export default ReactVirtualList