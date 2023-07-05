import React, { FC } from "react";
import { Link } from "react-router-dom";

import { Button } from 'antd'

const ComponentOne: FC = () => {
  return (
    <div>
      <h3>组件1</h3>
      <Button type="primary">button1</Button>
      <Link to='/two'>go two</Link>
    </div>
  )
}

export default ComponentOne