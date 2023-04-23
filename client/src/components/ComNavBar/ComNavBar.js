import React, { useEffect, useState } from "react"
import { NavBar, Space, Toast, Popup } from 'antd-mobile'
import { MoreOutline, HeartOutline, HeartFill, CloseOutline } from 'antd-mobile-icons'
import Social from '../../components/Social/Social'


function ComNavBar ({onGoBack}) {
  const [isColor, setIsColor] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 36 && !isColor ) {
        setIsColor(true);
        } else {
          setIsColor(false);
          }
      }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      };
  }, []);
    
    
  const handleLike = () => {
    if(!isLike){
      Toast.show({
        content: '点击了喜欢',
        duration: 1000,
      })
      setIsLike(true);
    }else{
      Toast.show({
        content: '取消了喜欢',
        duration: 1000,
      })
      setIsLike(false);
    }
  }

  const handleMore = () =>{
    setVisible(true);
  }

  const right = (
    <div style={{ fontSize: 24 }}>
      <Space style={{ '--gap': '14px' }}>
        {!isLike ? <HeartOutline onClick={handleLike} />
        : <HeartFill  onClick={handleLike} className={"like"}/>}
        <MoreOutline onClick={handleMore}/>
      </Space>
    </div>
  )
  
  return (
    <div className="restaurant-navbar " >
      <NavBar 
        right={right} 
        style={{
          '--height': '36px',
        }}
        onBack={onGoBack} 
        className={isColor && "navbar-color-change"}
      >
        <Popup
          visible={visible}
          onMaskClick={() => {
          setVisible(false)}}
          bodyStyle={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          minHeight: '25vh',
          }}
        >
          <Social/>
        </Popup>   
      </NavBar>
    </div>    
  )
}

export  default  ComNavBar