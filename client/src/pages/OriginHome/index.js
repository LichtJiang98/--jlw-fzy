import React from "react";
import './index.css'
import '../../assets/iconfont.css'

import { useNavigate } from "react-router-dom";

function OriginHome() {

    const navigate = useNavigate()

  return (
    <div>
      <div className="origin-search">
        <div className="search-1">
          <i className="iconfont icon-fangdajing"></i>
          <span className="value">搜索:目的地/酒店/景点/航班号</span>
        </div>
      </div>
      <div className="top-nav">
        <div className="nav-1">
          <ul>
            <li className="nav-1-1-jd">
              <span className="nav-pic1"></span>
              <span className="nav-title">酒店</span>
            </li>
            <li className="nav-1-1-ms">
              <span className="nav-pic2"></span>
              <span className="nav-title-1">民宿/客栈</span>
            </li>
            <li className="nav-1-1-tj">
              <span className="nav-pic3"></span>
              <span className="nav-title-1">特价/爆款</span>
            </li>
          </ul>
          <ul>
            <li className="nav-1-2-jp">
              <span className="nav-pic4"></span>
              <span className="nav-title">机票</span>
            </li>
            <li className="nav-1-2-jj">
              <span className="nav-pic5"></span>
              <span className="nav-title-1">机+酒</span>
            </li>
            <li className="nav-1-2-jsj">
              <span className="nav-pic6"></span>
              <span className="nav-title-1">接送机/包车</span>
            </li>
          </ul>
          <ul>
            <li className="nav-1-3-hcp">
              <span className="nav-pic7"></span>
              <span className="nav-title">火车票</span>
            </li>
            <li className="nav-1-3-qc">
              <span className="nav-pic8"></span>
              <span className="nav-title-1">汽车/船票</span>
            </li>
            <li className="nav-1-3-zc">
              <span className="nav-pic9"></span>
              <span className="nav-title-1">租车</span>
            </li>
          </ul>
          <ul>
            <li className="nav-1-4-ly">
              <span className="nav-pic10"></span>
              <span className="nav-title">旅游</span>
            </li>
            <li className="nav-1-4-mp">
              <span className="nav-pic11"></span>
              <span className="nav-title-1">门票/活动</span>
            </li>
            <li className="nav-1-4-zby">
              <span className="nav-pic12"></span>
              <span className="nav-title-1">周边游</span>
            </li>
          </ul>
          <ul>
            <li className="nav-1-5-gl">
              <span className="nav-pic13"></span>
              <span className="nav-title">攻略/景点</span>
            </li>
            <li className="nav-1-5-ms">
              <span className="nav-pic14"></span>
              <span className="nav-title-1" onClick={()=>navigate('/home')}>美食</span>
            </li>
            <li className="nav-1-5-gw">
              <span className="nav-pic15"></span>
              <span className="nav-title-1">购物/免税</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="switch">
        <div className="switch-1"></div>
        <div className="switch-2"></div>
      </div>
      <div className="mid-nav">
        <div className="left-nav">
          <div className="product-title-1">
            <img src={require("../../assets/images/0zc71120008g0ha4z93C6.png")} alt="" />
            <span className="right-nav-span1">特价好货直播中</span>
          </div>
          <div className="product-main-1">
          <img src={require("../../assets/images/0222n12000a5myt5e61D8_D_280_280_R5.jpg")} alt=''/>
            <div className="mask"></div>
            <div className="jdtc">酒店套餐</div>
            <div className="hotel-name">千岛湖诺富特酒店1晚</div>
            <div className="money-mark">￥</div>
            <div className="money">599</div>
          </div>
        </div>
        <div className="right-nav">
          <div className="product-title-2">
            <img src={require("../../assets/images/0zc6g120008g0hcb587E5.png")} alt="" />
            <span className="right-nav-span2">权威排行榜</span>
          </div>
          <div className="product-main-2">
            <div className="jingxuan1">
              <img
                src={require("../../assets/images/0103s12000a9z77e0E8BD_R_238_268.jpg")}
                alt=""
              />
              <div className="shanghai1">上海</div>
              <div className="jingxuan-title">上海年度十...</div>
            </div>
            <div className="jingxuan2">
              <img
                src={require("../../assets/images/0203v120008yqinc4E576_D_280_280_R5.jpg")}
                alt=""
              />
              <div className="shanghai2">上海</div>
              <div className="jingxuan-title">上海奢华酒...</div>
            </div>
          </div>
        </div>
      </div>
      <div className="ticket">
        <img src={require("../../assets/images/0zg6z120009hxl5q9CCF7.jpg")} alt="" />
      </div>
      <div className="box">
        <div className="dhyd">
          <i className="iconfont icon-31dianhua"></i>
          <span className="phone">电话预订</span>
        </div>
        <div className="xzxc">
          <i className="iconfont icon-xiazai"></i>
          <span className="download">下载携程</span>
        </div>
      </div>
      <div className="wzdt">
        <span className="map">网站地图</span>
        <span className="line">|</span>
        <span className="computer">电脑版</span>
        <br />
      </div>
      <div className="note">©2023携程旅行 沪ICP备08023580号</div>
      <div className="bottom-nav">
        <div>
          <span></span>
          <span>首页</span>
        </div>
        <div>
          <span></span>
          <span>社区</span>
        </div>
        <div>
          <span></span>
          <span>消息</span>
        </div>
        <div>
          <span></span>
          <span>我的</span>
        </div>
      </div>
      <div className="sign">
        <img className="signimg" src={require("../../assets/images/signin-d.png")} alt="" />
      </div>
    </div>
  );
}

export default OriginHome;
