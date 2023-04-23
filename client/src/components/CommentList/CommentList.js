import React, { useState, useCallback, memo } from "react";
import { Avatar, Ellipsis, Image, ImageViewer, Rate}  from 'antd-mobile'
import { PictureOutline } from 'antd-mobile-icons'

const Comment = memo ((comment)  => {

  const handleImageClick = useCallback((e, index, data) => {
    e.preventDefault();
    ImageViewer.Multi.show({
      images:data.total,
      defaultIndex:index,
    })
  }, [])
  console.log("这是",comment);

  return(
    <div className="comment-wrapper">
        <div className="comment-main">
          <div className="comment-box">
            <Avatar src= {comment.avatar} alt={comment.name} className="comment-avatar" style={{ '--border-radius': '50%' }}/>
            <div className="comment-content">
              <div className="comment-name">{comment.name} <span className="rate">
                <Rate 
                  readOnly 
                  value={comment.rate}
                  style={{
                    '--star-size': '12px',
                  }}
                /></span>
              </div>
              <Ellipsis className="comment-text" direction='end' rows={3} content={comment.text} />
              {console.log(comment.imgUrl.length)}
              {comment.imgUrl.length >= 1 && 
                <div className="comment-image">
                  {comment.imgUrl.map((url,index)=>(
                    index < 3 && <div className="food-image" key = {index}>
                      <Image  
                        src={url.pre} 
                        style={{borderRadius: 4}} 
                        onClick={(e)=>{handleImageClick(e, index, url)}}
                        /></div>
                  ))}
                  {comment.imgUrl[0].total.length >3 && 
                    <div className="image-num">
                      <PictureOutline/> {comment.imgUrl[0].total.length }
                    </div>}
                </div>}
              <div className="comment-text-cut">
                <div className="time">发布于 {comment.time}</div>
              </div>
            </div>
          </div>
        </div>
     
    </div>
  )
});


function CommentList({ comments }) {

  const visibleComments = comments.users.slice(0, 3);

  return (
    <div className="comment-list">
      <div className="comment-title">
        <div className="comment-num"> 全部评论 ({comments.count})</div>
        <div className="comment-check"> 查看全部 {">"}</div>
      </div>
      <div className="comment-tags">
        {comments.tags.map((tag) => <div className="comment-tag">{tag}</div> )}
      </div>
      <div className="comment-contents">
        {visibleComments.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </div>
      <div className="comment-bottom">
        <div className="comment-check"> 查看全部 {">"}</div>
      </div>
    </div> 
  
  );
};


export default  CommentList;