import React, { useEffect, useRef, useState } from "react";
import { NavBar, Icon, Toast, Divider } from "antd-mobile";
import { List, AutoSizer } from "react-virtualized";

import { useNavigate } from "react-router-dom";

import "./index.css";
import axios from "axios";

//转换数据格式
const formatCityData = (list) => {
  const cityList = {};
  // const cityIndex = []

  list.forEach((element) => {
    const first = element.short.substr(0, 1);
    if (cityList[first]) {
      cityList[first].push(element);
    } else {
      cityList[first] = [element];
    }
  });

  //获取索引
  const cityIndex = Object.keys(cityList).sort();

  return {
    cityList,
    cityIndex,
  };
};

const curCity = {
  label: "上海",
  pinyin: "shanghai",
  short: "sh",
};

const titleHeight = 35;

const nameHeight = 50;

// const list = Array(100).fill("react-virtualized");

//封装处理字母索引
const formatCityIndex = (letter) => {
  switch (letter) {
    case "#":
      return "当前定位";
    case "hot":
      return "热门目的地";
    default:
      return letter.toUpperCase();
  }
};

function CityList() {
  const [cityList, setCitylist] = useState({});
  const [cityIndex, setCityindex] = useState([]);
  const [activeIndex,setActiveindex] = useState(0)
  const topRef = useRef(null)

  const navigate = useNavigate();


    function changeCity({label,value}){
        localStorage.setItem('city',JSON.stringify({label,value}))
        navigate("/home")
    }

  //list组件渲染每一行的方法
  function rowRenderer({ key, index, isScrolling, isVisible, style }) {
    //获取每一行的字母索引
    //   console.log(cityIndex)
    const letter = cityIndex[index];


    return (
      <div key={key} style={style} className="city">
        <div className="title">{formatCityIndex(letter)}</div>
        {cityList[letter].map((item) => (
          <div className="city-name" key={item.value} onClick={() => changeCity(item)}>
            {item.label}
          </div>
        ))}
      </div>
    );
  }

  

  //创建动态计算行高方法
  const getRowHeight = ({ index }) => {
    console.log(index);
    //标题高度+城市数量*城市名称
    return titleHeight * 1.2 + cityList[cityIndex[index]].length * nameHeight;
  };

  //拿到list渲染行信息
  const onRowsRendered = ({startIndex}) => {
    console.log(startIndex)
    if(activeIndex !== startIndex){
        setActiveindex(startIndex)
    }
  }

  useEffect(() => {
    axios.get("/mock/city").then((res) => {
      // console.log(res.data.data.lists)
      const { cityList, cityIndex } = formatCityData(res.data.data.lists);
      axios.get("/mock/hotcity").then((res) => {
        cityList["hot"] = res.data.data.lists;
        //将索引添加到cityIndex里
        cityIndex.unshift("hot");

        cityList["#"] = [curCity];
        cityIndex.unshift("#");
        console.log(cityList, cityIndex);

        setCityindex(cityIndex);
        setCitylist(cityList);

        //提前计算每一行list的高度
        topRef.current.measureAllRows()
      });
    });

  }, []);

  const renderCityIndex = ()=> {
    return cityIndex.map((item,index) => 
      <li className="city-index-item" key={item} onClick={()=>{
        topRef.current.scrollToRow(index)
        console.log('当前索引号',index)
      }}>
        <span className={activeIndex === index ? "index-active" : ''}>{item === 'hot' ? '热' : item.toUpperCase()}</span>
      </li>
    )
  }

  return (
    <div className="citylist">
      <NavBar className="citylist-navbar" onBack={() => navigate("/home")} style={{fontSize:'16px'}}>
        目的地
      </NavBar>
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowCount={cityIndex.length}
            rowHeight={getRowHeight}
            rowRenderer={rowRenderer}
            onRowsRendered={onRowsRendered}
            scrollToAlignment="start"
            ref={topRef}
          />
        )}
      </AutoSizer>

      {/* 右侧索引 */}
      <ul className="city-index">{renderCityIndex()}</ul>
    </div>
  );
}

export default CityList;
