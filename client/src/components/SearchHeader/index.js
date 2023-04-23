import React, { useEffect, useState } from "react";

import {NavBar} from 'antd-mobile'
import { DownOutline, SearchOutline } from "antd-mobile-icons";

import {useNavigate} from 'react-router-dom'

import './index.css'
import {getCurcity} from '../../utils/getCurcity'

function SearchHeader(props){

    const navigate = useNavigate();
    const [curcityName,setCurcityname] = useState('上海')
    const [numbers,setNumbers] = useState([{ id: "1", message: "踏青去哪里", robot: true }, { id: "2", message: "上大欢迎你", robot: false }, { id: "3", message: "宝山美食一览", robot: true }])
    const [animate,setAnimate] = useState(false)

    useEffect(()=>{
      const curCity = getCurcity()
      console.log(curCity.label)
      // setCurcityname(curCity.label)
      setCurcityname(curCity.label)
    },[curcityName])



    return (<NavBar className="nav-search-box-home" onBack={()=>navigate('/')}> 
        <span className="text-title">美食/踏青</span>
        {/* 搜索框 */}
        <div className="search-box">
          {/* 左侧白色区域 */}
          <div className="search-home">
            {/* 位置 */}
            <div className="location" onClick={()=>navigate('/citylist')}>
              <span className="name">{curcityName}</span>
              <DownOutline fontSize={12} />
            </div>

            {/* 搜索表单 */}
            <div className="form">
              <SearchOutline fontSize={13} style={{position:'relative',top:'-48px'}}/>
              <div className={'text'} onClick={()=>navigate('/search')} style={{display:'inline-block'}}>
                {
                  numbers.map((item,index)=>(
                    <div className="text-item" key={item.id}>{item.message}</div>
                  ))
                }
                </div>
            </div>
          </div>
          {/* 右侧地图图标 */}
          <i className="iconfont icon-map" />
        </div>
      </NavBar>)
}

export default SearchHeader