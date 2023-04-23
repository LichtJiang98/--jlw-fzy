import { Icon } from '@iconify/react';

function Social() {
    return(
        <div className="social">
          <div className="social-title">分享至 </div>
          <div className="social-aciton">
            <div className="box"><div className="view" id="weixin"><Icon icon="uiw:weixin" className="social-icon" /></div>微信</div>
            <div className="box"><div className="view" id="weixin2"><Icon icon="uiw:picasa" className="social-icon"/></div>朋友圈</div>
            <div className="box"><div className="view" id="weibo"><Icon icon="uiw:weibo" className="social-icon"/></div>微博</div>
            <div className="box"><div className="view" id="qq"><Icon icon="uiw:qq"  className="social-icon"/></div>QQ</div>
          </div>
        </div>
    )
    
}

export default Social