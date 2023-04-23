import { ClockCircleFill, LocationFill } from 'antd-mobile-icons'
import { Button, Toast } from 'antd-mobile'

function MapRestInfo(props) {
    const { title, score, discussNum, averPrice, type, time, address } = props.shopData;
  
    return (
      <div className='m-restaurant-wrapper'>
        <div className='m-restaurant-info'>
          <div className='m-r-title'>{title}</div>
          <div className="restaurant-score-wrapper view">
            <span className="score">{score}分</span>
            <span className="restaurant-discuss-num">{discussNum}评论 {">"}</span>
            <span className="restaurant-aver-price">{averPrice}元 /人 </span>
            <span className="restaurant-type">{type}</span>
          </div>
          <div className="restaurant-time-wrapper view">
            <ClockCircleFill />
            <span className="view">{time}</span>
          </div>
          <div className="restaurant-address view">
            <span><LocationFill /><span className='address'>{address}</span></span> 
          </div>
        </div>
        <div className='m-time'>
          <div className='pre'><span>预计耗时：</span><span id='plan-time'>无</span></div>
         <div className='m-action'>
            <Button 
              size='middle' 
              onClick={props.handleNav}
              className='btn'
           >
            开始导航
           </Button> 
         </div>
        </div>
      </div>
    );
  }

export default MapRestInfo