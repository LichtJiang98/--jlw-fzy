import React, { useEffect, useRef, useState, memo } from "react";
import {
  NavBar,
  Space,
  Swiper,
  Dropdown,
  Selector,
  Button,
  CheckList,
  TreeSelect,
} from "antd-mobile";
import { DownOutline, SearchOutline } from "antd-mobile-icons";
import axios from "axios";

import TopButton from "../../components/TopButton";
import SelectBar from "../../components/Select";

import './index.css'

const More = () => {

    const [moreData,setMoredata] = useState('')

    useEffect(() => {
        axios.get("/mock/more").then((res) => {
          setMoredata(res.data.data.lists);
          console.log('111')
          // setOrigindata(res.data.data.lists);
        });
      },[]);

      const renderDiscounts = (shop) => {
        return (
          <div className="right-content-event">
            <span className="right-content-cheap-icon">惠</span>
            <span className="right-content-cheap-description">
              {shop.discounts}
            </span>
          </div>
        );
      };

    return (
        <div className="items">
        {moreData == ""
          ? null
          : moreData.map((item) => (
              <div className="item" key={item.id}>
                <div className="img-box">
                  <img alt="" className="image-img" src={`${item.images}`}></img>
                </div>
                <div className="right-content">
                  <div className="right-content-name">{item.title}</div>
                  <span className="right-content-score">{item.score}</span>
                  <span className="right-content-score-danwei">分</span>
                  <span className="right-content-comments">3条点评</span>
                  <span className="right-content-average">
                    ￥{item.averPrice}/人
                  </span>
                  <div className="right-content-details">
                    <span className="right-content-description">
                      {item.type} {item.area}
                    </span>
                    <span className="right-content-distance">
                      {item.distance}
                    </span>
                  </div>
                  <div className="right-content-events">
                    {item.discounts ? renderDiscounts(item) : null}
                  </div>
                </div>
              </div>
            ))}
      </div>
    )
}

export default More