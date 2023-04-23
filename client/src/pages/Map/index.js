import React, { useEffect } from "react";
import { NavBar } from "antd-mobile";
import "./index.css";

import { useNavigate } from "react-router-dom";

function Map() {
  const navigate = useNavigate();
  useEffect(() => {
    const { label, value } = JSON.parse(localStorage.getItem("city"));

    const map = new window.BMapGL.Map("container");

    var myGeo = new window.BMapGL.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      label,
      function (point) {
        if (point) {
          map.centerAndZoom(point, 11)
          //添加常用控件
          map.addControl(new window.BMapGL.ZoomControl())
          map.addControl(new window.BMapGL.ScaleControl())
        } else {
          alert("您选择的地址没有解析到结果！");
        }
      },
      label
    );
    // const point = new window.BMapGL.Point(116.404, 39.915);
    // map.centerAndZoom(point, 15);
  }, []);

  return (
    <div className="map">
      <NavBar
        onBack={() => navigate("/addshop")}
        style={{
          backgroundColor: "white",
          position: "fixed",
          width: "95%",
          top: "0",
          zIndex: "1002",
        }}
      >
        地图选点
      </NavBar>

      <div id="container" style={{ width: "375px", marginLeft: "-1px" }} />
    </div>
  );
}

export default Map;
