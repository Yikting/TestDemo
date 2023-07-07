import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { initListData } from "utils/util"
import { IListData } from "types/util"

import './ReactVirtualList.scss'

const ReactVirtualList = ({ bufferRadio = 1 }) => {
  const allListData = useRef(initListData(50))
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerOffsetHeight, setContainerOffsetHeight] = useState<number>(0)
  const [visibleData, setVisibleData] = useState<IListData[]>([])
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState<number>(0)
  const [scrollOffset, setScrollOffset] = useState(0)

  const itemHeight = 50
  const listHeight = useMemo(() => allListData.current.length * itemHeight, [allListData.current])
  const visibleCount = useMemo(() => visibleData.length, [visibleData])

  const handleScrollEvent = async () => {
    const scrollTop = containerRef.current?.scrollTop || 0
    const scrollSize = Math.floor(scrollTop / itemHeight)
    const newEndIndex = scrollSize + visibleCount
    setStartIndex(scrollSize)
    if (newEndIndex >= allListData.current.length) {
      const fetchData = await getInitialData()
      allListData.current = allListData.current.concat(fetchData)
    }
    setEndIndex(newEndIndex)
    setScrollOffset(scrollSize * itemHeight)
  }

  // 模拟请求 增加数据
  const getInitialData = async () => {
    const fetchNewData: any = await new Promise((resolve, reject) => {
      setTimeout(() => resolve(initListData(50, allListData.current.length)), 3000)
    })
    return fetchNewData
  }

  const changeHeight = () => {
    setContainerOffsetHeight(containerRef.current?.offsetHeight || 0)
  }

  useEffect(() => {
    const count = Math.ceil(containerOffsetHeight / itemHeight)
    setEndIndex(endIndex - visibleCount + count)
  }, [containerOffsetHeight])

  useEffect(() => {
    const newVisibleData = allListData.current.slice(startIndex, endIndex)
    setVisibleData(newVisibleData)
  }, [startIndex, endIndex])

  useEffect(() => {
    changeHeight()
    window.addEventListener('resize', changeHeight)

    return () => window.removeEventListener('resize', changeHeight)
  }, [])

  return (<div className="list-container" ref={containerRef} onScroll={handleScrollEvent}>
    <div className="list-placeholder" style={{ height: listHeight }}></div>
    <div className="list-scroll-content" style={{ transform: `translate3d(0, ${scrollOffset}px, 0)` }}>
      {
        visibleData.map((v, idx) => <div key={v.id} data-id={v.number} className="list-item" style={{ height: itemHeight }}>{v.content}</div>)
      }
    </div>
  </div>)
}

export default ReactVirtualList