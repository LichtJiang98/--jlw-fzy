import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Button, SearchBar, Space, List } from "antd-mobile";
import {
  FireFill,
  LocationFill,
  PhoneFill,
  SmileFill,
  LikeOutline,
} from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import "../../assets/iconfont.css";

import "./index.css";

const history = [];

function Search() {
  const searchRef = useRef("");

  //filterparamList：在原始表数据中筛选后的结果列表
  // associatedvalue：input输入框的值(搜索值)
  const [associatedvalue, setAssociatedValue] = useState();
  const [filterparamList, setFilterParamList] = useState([]);
  const [originparamList, setOriginparamList] = useState([]);
  const [flag, setFlag] = useState(0);
  const [ifConfirm, setIfconfirm] = useState(true);
  const [listData, setListdata] = useState([]);

  const onStart = () => {
    setIfconfirm(false);
  };

  const onEnd = () => {
    setIfconfirm(true);
  };

  //用来渲染原始表格数据
  useEffect(() => {
    axios.get("/mock/shop").then((res) => {
      setFilterParamList(res.data.data.lists);
      setOriginparamList(res.data.data.lists);
      console.log(res.data.data.lists);
    });
  }, []);

  useEffect(() => {
    if (associatedvalue !== "") {
      //当value不为空时
      setFilterParamList([]);
      setFilterParamList(
        filterparamList.filter((item) => {
          if (
            item?.pinyin?.indexOf(associatedvalue) !== -1 ||
            item?.title.indexOf(associatedvalue) != -1
          ) {
            setFlag(1);
            return true;
          }
          return false;
        })
      );
      console.log(filterparamList);
      setListdata(filterparamList);
    } else {
      //为空时将渲染原始表格数据
      setFilterParamList(filterparamList);
    }
  }, [associatedvalue]);

  useEffect(() => {
    console.log(filterparamList)
    localStorage.setItem("list", JSON.stringify(filterparamList));
  }, [filterparamList]);

  useEffect(() => {
    searchRef.current?.focus();
    console.log(searchRef);
  }, []);

  const changeInput = function (value) {
    setAssociatedValue(value);
    console.log(value);
    if (!value) {
      setFilterParamList(originparamList);
      setFlag(0);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="Search">
      <SearchBar
        className="search-bar"
        clearable="true"
        placeholder="请输入内容"
        showCancelButton={() => true}
        onCompositionStart={onStart}
        onCancel={() => navigate("/home")}
        ref={searchRef}
        onSearch={(value) => {
          //用于传递数据
          // e.preventDefault();
          console.log(value, "111");
          // navigate("/shoppage?shopId=" + `${value.id}`);
          navigate("/searchlist");
          localStorage.setItem("history", value);
        }}
        onChange={(e) => {
          changeInput(e);
        }}
        style={{
          "--border-radius": "100px",
          "--background": "#ffffff",
          "--height": "32px",
          "--padding-left": "12px",
          position: "relative",
          top: "10px",
          left: "15px",
          width: "350px",
        }}
      />

      <List className="search-content">
        {flag == 1
          ? filterparamList.map((item) => {
              return (
                <List.Item
                  key={item.id}
                  prefix={item.score ? <LikeOutline /> : null}
                  onClick={() => navigate("/searchlist")}
                >
                  {item.title}
                </List.Item>
              );
            })
          : null}
      </List>

      <div className="everybody">大家都在搜</div>
      {/* 大家都在搜的标签 */}
      <div className="label">
        <div className="label-item-best">
          <span>
            <FireFill />
          </span>
          <span className="label-text">2022美食林榜单餐厅</span>
        </div>
        <div className="label-item">
          <span className="label-text">限时抢购</span>
        </div>
        <div className="label-item">
          <span>
            <LocationFill />
          </span>
          <span className="label-text">附近好店</span>
        </div>
        <div className="label-item">
          <span className="label-text">辛拉面</span>
        </div>
        <div className="label-item">
          <span className="label-text">青团</span>
        </div>
        <div className="label-item">
          <span>
            <PhoneFill />
          </span>
          <span className="label-text">预约订座</span>
        </div>
        <div className="label-item">
          <span className="label-text">特色小吃</span>
        </div>
        <div className="label-item">
          <span>
            <SmileFill />
          </span>
          <span className="label-text">大家都爱吃</span>
        </div>
        <div className="label-item">
          <span className="label-text">猪肚鸡</span>
        </div>
        <div className="label-item">
          <span className="label-text">大额优惠</span>
        </div>
      </div>

      {/* 历史记录标签 */}
      <div className="everybody">历史记录</div>
      <div className="label">
        <div className="label-item">
          <span className="label-text">{localStorage.getItem("history")}</span>
        </div>
      </div>

      {/* 上海热门榜单 */}
      <div className="everybody">热门榜单</div>

      <ul className="hot-lists">
        <li className="hot-list">
          <div className="top-icon">TOP1</div>
          <span>2022美食林榜单餐厅</span>
          <span className="top-number">22974</span>
        </li>

        <li className="hot-list">
          <div className="top-icon">TOP2</div>
          <span>特色风味小吃</span>
          <span className="top-number">7323</span>
        </li>
        <li className="hot-list">
          <div className="top-icon">TOP3</div>
          <span>夏季烧烤当时节</span>
          <span className="top-number">6382</span>
        </li>
        <li className="hot-list">
          <div className="top-icon-after">TOP4</div>
          <span>博主推荐</span>
          <span className="top-number">5909</span>
        </li>
        <li className="hot-list">
          <div className="top-icon-after">TOP5</div>
          <span>外滩风情餐厅</span>
          <span className="top-number">5235</span>
        </li>
      </ul>
    </div>
  );
}

export default Search;
