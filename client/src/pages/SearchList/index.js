import React,{ useEffect } from "react";
import { Button, SearchBar, Space, NavBar } from "antd-mobile";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import './index.css'
import SelectBar from "../../components/Select";

const back = () => console.log("点了");

const SearchList = () => {

    const [shopData, setShopdata] = React.useState("");
    const [originData, setOrigindata] = React.useState("");

    const navigate = useNavigate();

    // useEffect(() => {
    //     axios.get("/mock/testList").then((res) => {
    //       setShopdata(res.data.data.lists);
    //       // setOrigindata(res.data.data.lists);
    //     });
    //   }, [JSON.stringify(originData)]);

    useEffect(()=>{
      let shopData = JSON.parse(localStorage.getItem('list'))
      setShopdata(shopData)
      setOrigindata(shopData)
      console.log(shopData,'我是shopdata')
    },[])

      axios.get("/mock/testList").then((res) => {
        setOrigindata(res.data.data.lists);
      });

       //父组件拿到子组件传来的数据,根据不同的val值进行不同的排序
  const getChildSelect = (val) => {
    let tempShopdata = JSON.parse(JSON.stringify(shopData));
    // console.log("我是父组件，我拿到了", val);
    if (val == "人气排序") {
      tempShopdata.sort((a, b) => b.sort[0].value - a.sort[0].value);
    } else if (val == "距离最近") {
      tempShopdata.sort((a, b) => a.sort[1].value - b.sort[1].value);
    } else if (val == "人均最高") {
      tempShopdata.sort((a, b) => b.sort[2].value - a.sort[2].value);
    } else if (val == "人均最低") {
      tempShopdata.sort((a, b) => a.sort[2].value - b.sort[2].value);
    } else if (val == "智能排序") {
      tempShopdata.sort(
        (a, b) =>
          0.5 * b.sort[0].value +
          0.2 * b.sort[1].value +
          0.3 * b.sort[2].value -
          (0.5 * a.sort[0].value +
            0.2 * a.sort[1].value +
            0.3 * a.sort[2].value)
      );
    }
    setShopdata(tempShopdata);

    // console.log(shopData[0].sort)
  };

  //父组件拿到从子组件传来的数据，根据不同的val展示不同的数据
  const getChildPosition = (val) => {
    if (val === "不限") {
      setShopdata(originData);
    } else if (val == "500米以内") {
      let newShopdata = [];
      originData.map((item) => {
        if (
          item.position.find((a) => {
            return a.value == "500米以内";
          })
        ) {
          newShopdata.push(item);
        }
      });
      setShopdata(newShopdata);
    } else if (val == "1公里以内") {
      let newShopdata = [];
      originData.map((item) => {
        if (
          item.position.find((a) => {
            return a.value == "500米以内" || a.value == "1公里以内";
          })
        ) {
          newShopdata.push(item);
        }
      });
      setShopdata(newShopdata);
    } else if (val == "2公里以内") {
      let newShopdata = [];
      originData.map((item) => {
        if (
          item.position.find((a) => {
            return (
              a.value == "500米以内" ||
              a.value == "1公里以内" ||
              a.value == "2公里以内"
            );
          })
        ) {
          newShopdata.push(item);
        }
      });
      setShopdata(newShopdata);
    } 
      let newShopdata = [];
      originData.map((item) => {
        if (
          item.position.find((a) => {
            return a.value == val;
          })
        ) {
          newShopdata.push(item);
        }
      });
      setShopdata(newShopdata);
    }
  
  //筛选方面
  const getChildChoose = (val) => {
    // console.log("父组件的数据", val);
    let newShopdata = [];
    let temp = [];
    for (let i = 0; i < val.length; i++) {
      if (i == 0) {
        originData.map((item) => {
          if (
            item.select[0].level == val[i] ||
            item.select[0].price == val[i] ||
            item.select[0].special == val[i]
          ) {
            // console.log(item);
            newShopdata.push(item);
          }
        });
      } else {
        for (let j = 0; j < newShopdata.length; j++) {
          if (
            newShopdata[j].select[0].level == val[i] ||
            newShopdata[j].select[0].price == val[i] ||
            newShopdata[j].select[0].special[0] == val[i] ||
            newShopdata[j].select[0].special[1] == val[i]
          ) {
            temp.push(newShopdata[j]);
            temp = Array.from(new Set(temp));
          }
        }
      }
    }
    if (val.length == 0) {
      setShopdata(originData);
    } else if (val.length == 1) {
      setShopdata(newShopdata);
    } else {
      setShopdata(temp);
    }
    // console.log(shopData, "999");
    // console.log(newShopdata, "000");
  };
  
  //用于传递数据
  const handleClick = (e, shop) => {
    e.preventDefault();
    navigate("/shoppage?shopId=" + `${shop.id}`);
  };


  return (
    <div className="searchList">
      <NavBar onBack={()=>navigate('/search')}>
        <SearchBar
          placeholder="请输入内容"
          value={localStorage.getItem('history')}
        //   showCancelButton
          style={{
              "display":'inline-block',
            "--border-radius": "100px",
            "--background": "#ffffff",
            "--height": "32px",
            "width":"240px",
            "--padding-left": "12px",
            marginLeft:'-10px'
          }}
        /><span className="search-text">搜索</span>
      </NavBar>
      <SelectBar  getSelect={getChildSelect}
        getPosition={getChildPosition}
        getChoose={getChildChoose}/>
      {/* 美食项目 */}
      <div className="items-search">
        {shopData == ""
          ? null
          : shopData.map((item) => (
              <div className="item" key={item.id} onClick={(e) => handleClick(e, item)}>
                <div className="img-box">
                  <img className="image-img" alt="" src={`${item.images[0]}`}></img>
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
                </div>
              </div>
            ))}
      </div>

      {/* 没有更多了 */}
      <div className="no-more-shop">没有更多了</div>
    </div>
  );
};

export default SearchList;
