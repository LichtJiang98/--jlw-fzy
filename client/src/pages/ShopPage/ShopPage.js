import React, { useEffect, useState} from "react"
import { useThrottleFn } from 'ahooks'
import { Tabs, Button } from 'antd-mobile'
import { useLocation } from 'react-router-dom'
import { getShopData } from '../../api/getData'
import ComNavBar from '../../components/ComNavBar/ComNavBar'
import MixSlider from '../../components/MixSwiper/MixSwiper'
import RestaurantInfo from '../../components/RestaurantInfo/RestaurantInfo'
import CommentList from '../../components/CommentList/CommentList'
import MoreBoard from '../../components/MoreBoard/MoreBoard'
import '../../App.css';
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";


function ShopPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const shopId = searchParams.get('shopId');
  // console.log(shopId);
  const [data, setData] = useState("");
  const [activeKey, setActiveKey] = useState('1')
  

  const tabItems = [
    { key: '1', title: '评价信息'},
    { key: '2', title: '更多推荐'},
  ]
  const tabHeight = 100;

  const handleScroll = useThrottleFn( () => {
      let currentKey = tabItems[0].key
      for (const item of tabItems) {
        const element = document.getElementById(`anchor-${item.key}`)
        if (!element) continue
        const rect = element.getBoundingClientRect()
        if (rect.top <= tabHeight) {
          currentKey = item.key
        } else {
          break
        }
      }
      // console.log("我执行了",activeKey);
      setActiveKey(currentKey);
    },
    {
      leading: true,
      trailing: true,
      wait: 100,
    }
  ).run

  const handleGoBack =()=> {
    console.log("点击了");
    setTimeout(()=> window.history.back(),200)
  }
  async function getData(shopId) {
    try {
      const response = await getShopData(shopId);;
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  useEffect(() => {
    async function getShopData() {
      const data = await getData(shopId);
      // console.log("接收到的数据",data);
      setData(data)
      }
    getShopData()

    document.addEventListener('scroll', handleScroll)
    return () => {
    document.removeEventListener('scroll', handleScroll)
    }
  
  }, []);

 
  return (

    <div className="shop-total-wrapper">
      <div className="shop-total">
      <ComNavBar onGoBack = {handleGoBack} />
      {data == "" ? (
        <p>耐心等候，正在加载中...

        </p>
        
      ) : (
        <>
        <MixSlider videoUrl = {data.videoUrl} 
        images={data.images} 
        />
        <RestaurantInfo shop={data}/>
        <div className="tab-wrapper" >
          <Tabs
            activeKey={activeKey}
            onChange={key => {
              document.getElementById(`anchor-${key}`)?.scrollIntoView()
              window.scrollTo({
                top: window.scrollY - tabHeight,
              })
            }}
          >
            {tabItems.map(item => (
              <Tabs.Tab title={item.title} key={item.key} />
            ))}
          </Tabs>
        </div>
        <div className= "content-wrapper">
          <div id={`anchor-1`}>
            <CommentList comments={data.comments}/>
          </div>
          <div id={`anchor-2`}>
            <MoreBoard d={`anchor-2`} 
              params={data.more}
              delay={2000}
            /> 
          </div>
        </div>
        </>)
      }
         

      </div>
     
     </div>
  
  );
}

export default ShopPage;
