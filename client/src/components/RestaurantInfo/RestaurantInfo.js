import React, { useState }from "react";
import { Tag, ActionSheet, Toast } from 'antd-mobile';
import { LocationFill, PhoneFill } from 'antd-mobile-icons'
import { useNavigate,} from 'react-router-dom';


function TelDescription({data}) {
  const [visible, setVisible] = useState(false)
  const actions = [
    { text: '复制', key: 'copy' },
  ]
  return (
    <>
      <PhoneFill onClick={() => setVisible(true)} color='var(--adm-color-danger)'/>
      <ActionSheet
        extra={"电话："+data}
        cancelText='取消'
        visible={visible}
        actions={actions}
        onClose={() => setVisible(false)}
        onAction={action => {
          if (action.key === 'copy') {
            Toast.show(`点击了${action.text}`)
          }
        }}
      />
    </>
  )
}


function RestaurantInfo({shop}) {

  const navigate = useNavigate();
  const handleClick = () => {
   console.log("shopid",shop.id);
   navigate('/mappage?shopId='+`${shop.id}`)
  }
    return (
      <div className="restaurant-wrapper">
        <div className="restaurant-info">
          <div className="restaurant-name">{shop.title}</div>
          <div className="restaurant-score-wrapper">
            <span className="score">{shop.score}分</span>
            <span className="restaurant-discuss-num">{shop.discussNum}评论 {">"}</span>
            <span className="restaurant-aver-price">{shop.averPrice}元 /人 </span>
            <span className="restaurant-type">{shop.type}</span>
          </div>
          <div className="restaurant-time-wrapper">
            <span className="restaurant-time">营业时间</span>
            <span className="view">{shop.time}</span>
          </div>
          <div className="restaurant-address">
            <span>{shop.address}</span> 
            <span className="right">
              <span className="taxi">
              <LocationFill color='#0287d0' onClick={handleClick} />
              </span>
              <span className="tel"><TelDescription data={shop.tel}></TelDescription></span>
           </span>
          </div>
          <div className="restaurant-action">
            {shop.order && (
            <div className="restaurant-order">
                <Tag
                color='success'
                fill='outline'
                style={{ '--background-color': '#c8f7c5' }}
                className="order"
              > <span className="tag-view">外卖</span>
              </Tag>
              <span className="view">提供外卖</span> 
            </div>
            )}
            {shop.queuing.length > 0 && (
              <div className="restaurant-queuing ">
              <Tag
                color='success'
                fill='outline'
                style={{ '--background-color': '#c8f7c5' }}
                className="queuing"
              ><span className="tag-view">排队</span>
              </Tag>
              <span className="view">{shop.queuing}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    
    )
}

export default  RestaurantInfo;