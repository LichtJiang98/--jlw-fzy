import React, { memo, useEffect, useState } from 'react';
import './index.css';
import {UpCircleOutline} from "antd-mobile-icons"




const TopButton = () =>{
  // 显隐状态
  const [show, switchShow] = useState(false);


  useEffect(() => {
    const listener = () => {
        let t = document.documentElement.scrollTop || document.body.scrollTop
      switchShow(t > 150);
    };
    document.addEventListener('scroll', listener,true);
    // 组件销毁后，取消监听
    return () => document.removeEventListener('scroll', listener,true);
  }, [show]);

  return show ? (
    <div className="top-button" onClick={() => document.body.scrollTop = document.documentElement.scrollTop = 0}>
      <span className='top-text'></span>
    </div>
  ) : null;
}

export default TopButton;

