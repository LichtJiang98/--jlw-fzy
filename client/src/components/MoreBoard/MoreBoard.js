import React, { useEffect, useState,useRef } from "react"
import axios from 'axios';
import { Image, Avatar } from 'antd-mobile'
import { LikeOutline, EyeOutline } from 'antd-mobile-icons'
import { InfiniteScroll } from 'antd-mobile'
import { getMoreData,  getSelectData } from "../../api/getData"

function parseType(item, itemindex, onUpdate){
  const { text, type } = item
   switch (type) {
    case "shop":
      const [newPrice, discount, eat] = item.prices;
      return(
          <div className="card-bottom">
            <div className="m-name line-cut">{text.name}</div> 
            <div className="m-title line-cut">{text.title}</div>
            <div className="tags">
              {item.tags.map((tag,index)=>(
                <div key={index}>{tag}</div>
            ))}
            </div>
            <div className="prices">
              <div className="new-price view"><span>￥</span>{newPrice}</div>
              <div className="discount view">{discount} 折</div>
              <div className="eat view">{eat} 吃过</div>
            </div>
          </div>
      )
    case "person":
      const { content, avatar, name, username, likeNum, eyeNum } = text;
      return(
        <div className="card-bottom">
          <div className="m-title line-cut">{content}</div>
          <div className="bottom-info">
            <div className="user-info">
              <div className="avastar aview">
                <Avatar 
                  src={avatar} 
                  alt={name} 
                  style={{ '--border-radius': '50%', '--size' : '18px'}}
                />
                <div className="username">{username}</div>
              </div>
              <div className="action aview">
                <div className="like aview"><LikeOutline /><span>{likeNum}</span></div>
                <div className="eye aview"> <EyeOutline /><span>{eyeNum}</span></div>
              </div>
            </div>
          </div>
        </div>
      )
    case "select":
      const {title, choices} = text;
      const getData = async (choice, count) => {
        try {
          console.log("发送请求",choice, count);
          const response = await getSelectData(choice, count);
          return response.data;
        } catch (error) {
          console.log(error);
        }
      };
      const handleClick= async (item, index) => {
        console.log("点击了",item);
        console.log("继承的函数", index);
        const data = await getData(item, 10);
        console.log("等待后的",data);
        onUpdate(data, index);
      }

      return(
        <div className="select-wrapper">
          <div className="select-title">{title}</div>
          <div className="selections">
            {choices.map((item, index) => (
               <div className="selection" key={index} onClick={() => handleClick(Object.keys(item)[0], itemindex)}>
                   🔥 {Object.values(item)[0]}
               </div>
            ))}
         </div>
       </div>
      )
   
    default:
      break;
   }
}

function parseHeight(item, width) {
  const type = item.type
  switch (type) {
    case "shop":
      return [width, 90]
    case "person":
      return [width, 50]
    case "ranking":
      return [width * 1.618, 0]
    case "select":
        return [0, 120]
    default:
      break;
  }
}


function MoreBoard({params}) {

  var [listState, setListState] = useState(params);
  const [page, setPage] = useState(0); 
  const [loading, setLoading] = useState(false); 
  const [hasMore, setHasMore] = useState(true); 
  const containerRef = useRef(null);
  var updataHeight = [0 , 0]
  var columnHeights = [0 , 0];
  const PAGE_SIZE = 10; 
 
  useEffect(() => {
    handleTraverseComplete(Math.max(...columnHeights).toFixed(2))
  },[containerRef, listState]);

  // 加载数据
  const getData = async (pageNum) => {
    setLoading(true);
    try {
      const res = await getMoreData(pageNum,PAGE_SIZE);
      if (res.data.length < PAGE_SIZE) {
        setHasMore(false);
      }
      setListState((prevData) => [...prevData, ...res.data]);
      console.log("接受后的数据listState",listState);
      setLoading(false);
      columnHeights = [0 , 0];
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  // 监听滚动事件
  const loadMore = () => {
    if (!loading && hasMore) {
      getData(page + 1);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleTraverseComplete = (h) => {
    if (containerRef.current) {
      containerRef.current.style.height = h + "px";
      console.log( containerRef.current.style.height);
    }
  };

  const handleUpdate = (newData, index) => {
    const slicedData = listState.slice(0, index);
    const updatedData = slicedData.concat(newData);
    columnHeights = updataHeight;
    setListState(updatedData);
  };
  
  const renderItemList = (item, index) => {
    var screen = document.documentElement.clientWidth || document.body.clientWidth;
    var padding = 24; 
    var margin = 8; 
    var col = 2;
    var width = (screen - padding - margin ) / col;  
    var [imgHeight, textHeight] = parseHeight(item, width);
    var totalHeight = imgHeight +  textHeight;
    let columIndex = columnHeights[0] > columnHeights[1] ? 1 : 0; 
    let top = columnHeights[columIndex];
    let left = columIndex * (margin +  width) + 0;
    if( item.type =="select"){
      updataHeight = columnHeights;
    }
    columnHeights[columIndex] += totalHeight +  margin ;
   
    return (
       <div className="more-card" key={item.id} 
          style={{
          width:width,
          top:top,
          left:left,
          height:totalHeight,
          position:"absolute",
          }}>
          {item.imgUrl && <div className="m-img-box" >
          <Image src={item.imgUrl}  style={{ height:imgHeight }}></Image>
          {item.dis && <div className="dis">距餐厅{item.dis}</div>} 
          </div>}
          {parseType(item, index, handleUpdate)}
        </div>
      )
  }
  
  return(
    <div className="more-wrapper">
      <div className="more-title">更多推荐</div>
      <div className="more-box"  ref={containerRef} style={{ "minHeight": 100 }}>
        { Array.isArray(listState) && listState.map((item, index)=>(
          renderItemList(item, index, listState.length)
          )) 
        }
         
      </div>
      <InfiniteScroll 
        threshold={40}
        loadMore={loadMore} 
        hasMore={hasMore}
      > 
      </InfiniteScroll> 
    </div>

  )
} 

export default  MoreBoard;