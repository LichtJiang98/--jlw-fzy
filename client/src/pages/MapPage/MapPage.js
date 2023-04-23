import React, { Component } from 'react';
import { LeftOutline } from 'antd-mobile-icons'
import { useLocation } from 'react-router-dom';
import { getShopData } from '../../api/getData'
import { Button, Toast } from 'antd-mobile'
import ErrorPage from '../../pages/ErroPage/ErrorPage'
import MapRestInfo from '../../components/MapRestInfo/MapRestInfo'
var BMapGL = window.BMapGL

class MyMap extends Component {
   
  constructor(props) {
    super(props);
    this.state = {
      shopData: null
    }
  }
  
  async componentDidMount(){
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const shopId = params.get('shopId');
    console.log("这是shopid", shopId);
    if (shopId) {
      try {
        // 发送请求获取数据
        const response = await getShopData(shopId); 
        const data = response.data;
        this.setState({ shopData: data });
        this.showShopOnMap(data);
      } catch (error) {
        console.error(error);
      }
    }
  }
  
  //地图初始化
  showShopOnMap(shopData) {
    const { lng, lat } = shopData.coordinates;

    this.map = new BMapGL.Map("bdmap");
    this.point = new BMapGL.Point(lng, lat);
    this.map.centerAndZoom(this.point, 14);   
    this.map.enableScrollWheelZoom(); 
    var scaleCtrl = new BMapGL.ScaleControl(); 
    this.map.addControl(scaleCtrl);
 
    const marker = new BMapGL.Marker(this.point);
    this.map.addOverlay(marker);
 
    var opts = {
      width: 100,     
      title:` <div style="max-width:200px; overflow: hidden; white-space:nowrap; text-overflow:ellipsis; font-size:16px; font-weight:600" > ${shopData.title} </div>`,
      content: `<div style="width:200px height: 150px">
                 <img src=${shopData.images[0]} style="max-width:100%;max-height:100%;">
                </div>`
    }
    const infoWindow = new BMapGL.InfoWindow(opts.content, opts);
    this.map.openInfoWindow(infoWindow, this.point);

  }

  handleGoBack =()=> {
    setTimeout(()=> window.history.back(),200)
  }

  handleNav =()=> {
    if(this.state.shopData.coordinates){
      console.log("开始导航");
      Toast.show({
        icon: 'loading',
        content: '加载导航中…',
        duration: 1000,
      })
      document.getElementById('plan-time').innerText = "计算中";
    }
    this.map = new BMapGL.Map("bdmap");
    this.map.enableScrollWheelZoom();
    var scaleCtrl = new BMapGL.ScaleControl();  
    this.map.addControl(scaleCtrl);
    const { lng, lat } = this.state.shopData.coordinates;
    var p1 = new BMapGL.Point(121.395866,31.325999); // 起点
    var p2 = new BMapGL.Point(lng, lat); // 终点
    var driving = new BMapGL.DrivingRoute(this.map, 
      { 
        renderOptions: {
          map: this.map,
          panel: "taxi-result",
          autoViewport: true,
        }
    });
    driving.search(p1, p2);
    console.log( driving);
    driving.setSearchCompleteCallback((results) => {
      if (driving.getStatus() === 0) {
        const plan = results.getPlan(0);
        const duration = plan.getDuration(); // 获取总时间
        if (duration) {
        const timeElement = document.getElementById('plan-time');
        timeElement.innerText = duration;
        timeElement.classList.add('time-fade-in');
        }
      } else {
        console.log("驾车路线规划失败：", driving.getStatus());
      }
    });

  }
    
  render() {
    return (
      <>
        <div className='map-wrapper'>
          <div className="bdmap" id="bdmap" 
            style={{ 
              width: "100vw", 
              height: "80vh",
            }}>   
          </div>
          <div className='map-left' onClick={this.handleGoBack} >
            <LeftOutline />
          </div>
        </div>
        <div className='map-restaurant-info'>
          {this.state.shopData && 
            <MapRestInfo 
              shopData={this.state.shopData} 
              handleNav={this.handleNav}
            />
          }
        </div>
      </>
        )
    }
} 

export default function MapPage() {
  const location = useLocation();
  return <MyMap location={location} />;
}