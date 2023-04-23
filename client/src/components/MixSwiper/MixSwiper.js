import React, { useEffect, useState, useRef} from "react";
import { Swiper} from "swiper"; 
import { SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { PlayOutline} from 'antd-mobile-icons'


function MixSlider  ({ videoUrl, images }) {
  const swiperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const swiper = new Swiper(swiperRef.current, {
      loop: true,
      autoplay: true,
      pagination: {
          el: ".swiper-pagination",
          clickable: true,
      },
      navigation: true,
      modules: [Navigation, Pagination],
      });

      return () => {
      swiper.destroy();
      };
  }, []);

  const handlePlay = () => {
    const video = document.querySelector(".video-element");
      if (video) {
        video.play();
        setIsPlaying(true);
      }
  };
    
  const handlePause = () => {
    const video = document.querySelector(".video-element");
      if (video && isPlaying) {
        video.pause();
        setIsPlaying(false);
      }
  };
      

  return (

    <div className="video-slider-container">
     <div className="swiper-container" ref={swiperRef}>
        <div className="swiper-wrapper">
            {videoUrl && (
              <SwiperSlide>
                <div className="video-wrapper">
                <video className="video-element" onClick={handlePause} src={videoUrl} loop muted />
                 {!isPlaying && <PlayOutline  className="video-btn" onClick={handlePlay}/>}
                </div>
              </SwiperSlide>)}
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={`slide ${index}`} />
              </SwiperSlide>
            ))}
        </div>
        <div className="swiper-pagination"></div>
    </div>
   </div>
      
  );
};

export default MixSlider;