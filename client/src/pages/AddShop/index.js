import React, { ReactNode, useEffect, useRef, useState } from "react";
import { NavBar, Space, Toast, ImageUploader, Input, Checkbox,TextArea } from "antd-mobile";
import { SearchOutline, MoreOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";

import "../../assets/iconfont.css";

import "./index.css";

const right = (
  <div style={{ fontSize: 24 }}>
    <Space style={{ "--gap": "16px" }}>
      <SearchOutline />
      <MoreOutline />
    </Space>
  </div>
);

const back = () =>
  Toast.show({
    content: "点击了返回区域",
    duration: 1000,
  });

function AddShop() {
  const [fileList, setFileList] = useState([
    {
      url: "../../assets/0.jpg",
    },
  ]);

  const navigate = useNavigate();

  const [value, setValue] = useState([])

  useEffect(() => {
    const map = new window.BMapGL.Map("main-container");
    const point = new window.BMapGL.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
  }, []);

  return (
    <div className="AddShop">
      <NavBar right={right} onBack={() => navigate("/home") }style={{backgroundColor:'white',position:'fixed',width:'95%',top:'0',zIndex:'1002'}}>
        添加商户
      </NavBar>

      <div style={{marginTop:'60px'}}>
        {/* 上传图片 */}
      <div className="upload-image">
        <div className="upload-image-title">
          <span className="upload-text-1">上传图片</span>
          <span className="upload-text-2">（必填）</span>
        </div>
        <div className="upload-text-3">上传商户清晰图片，请勿上传自拍照哦~</div>
        <ImageUploader className="imageUpload" />
      </div>

      {/* 填写名称 */}
      <div className="upload-name">
        <div className="upload-image-title">
          <span className="upload-text-1">名称</span>
          <span className="upload-text-2">（必填）</span>
        </div>
        <Input
          placeholder="官方招牌/宣传图等上的名称"
          clearable
          className="upload-input"
          style={{ "--font-size": "12px" }}
        />
      </div>

      {/* 填写类型 */}
      <div className="upload-type">
        <div className="upload-image-title">
          <span className="upload-text-1">类型</span>
          <span className="upload-text-2">（必填）</span>
        </div>
        <Input
          placeholder="请选择类型"
          clearable
          className="upload-input"
          style={{ "--font-size": "12px" }}
        />
      </div>

      {/* 联系电话 */}
      <div className="upload-type">
        <div className="upload-image-title">
          <span className="upload-text-1">联系电话</span>
        </div>
        <Input
          placeholder="请提供官方的座机/手机号"
          clearable
          className="upload-input"
          style={{ "--font-size": "12px" }}
        />
      </div>

      {/* 城市 */}
      <div className="upload-type">
        <div className="upload-image-title">
          <span className="upload-text-1">城市</span>
          <span className="upload-text-2">（必填）</span>
        </div>
        <Input
          defaultValue="上海"
          clearable
          className="upload-input"
          style={{ "--font-size": "12px" }}
        />
      </div>

      {/* 详细地址 */}
      <div className="upload-type" onClick={()=>navigate('/map')}>
        <div className="upload-image-title">
          <span className="upload-text-1">详细地址</span>
          <span className="upload-text-2">（必填）</span>
        </div>
        <Input
          defaultValue="上海市宝山区西外环路"
          clearable
          className="upload-input"
          style={{ "--font-size": "12px" }}
        />
        <div className="main-map">
          <div id="main-container"></div>
        </div>
        <div className="map-mask"></div>
        <div className="map-text">地图选点&gt;</div>
      </div>

      {/* 营业状态 */}
      <div className="upload-status">
        <div className="upload-image-title">
          <span className="upload-text-1"  style={{display:'block'}}>营业状态</span>
          <Checkbox.Group
          className='checkbox-group'
          value={value}
          onChange={val => {
            setValue(val)
          }}
        >
          <Space direction='horizontal' style={{marginTop:'10px'}}>
            <Checkbox value='apple' className="checkbox" style={{'--font-size':'12px'}}>营业中</Checkbox>
            <Checkbox value='orange' className="checkbox" style={{'--font-size':'12px'}}>尚未营业</Checkbox>
            <Checkbox value='banana' className="checkbox" style={{'--font-size':'12px'}}>暂停营业</Checkbox>
          </Space>
        </Checkbox.Group>
        </div>
      </div>

      {/* 营业时间 */}
      <div className="upload-type">
        <div className="upload-image-title">
          <span className="upload-text-1">营业时间</span>
        </div>
        <Input
          placeholder="请输入营业时间"
          clearable
          className="upload-input"
          style={{ "--font-size": "12px" }}
        />
      </div>

      {/* 其他说明 */}
      <div className="upload-type">
        <div className="upload-image-title">
          <span className="upload-text-1">其他说明</span>
        </div>
        <TextArea
          className="textarea"
          style={{"--font-size":'12px'}}
          placeholder="请提供更多参考信息供我们核实"
          showCount
          maxLength={30}
        />
      </div>
      <div style={{'height':'30px'}}></div>
      </div>
      
    </div>
  );
}

export default AddShop;
