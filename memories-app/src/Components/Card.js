import firestore from '../firebase_conf';
import React,{useState,useEffect} from 'react';

function Card() {
  const [posts,setPosts]=useState([])
  const fetchPosts=async()=>{
    const response=firestore.collection('NotesData');
    const data=await response.get();
    data.docs.forEach(item=>{
     setPosts([...posts,item.data()])
    })
  }
  useEffect(() => {
    fetchPosts();
  }, [])
  return (
    <div className="Card">
      {
        posts && posts.map(post=>{
          return(
            <div className="post-container">
              <h4>{post.Title}</h4>
              <p>{post.Caption}</p>
            </div>
          )
        })
      }
    </div>
  );
}

export default Card;