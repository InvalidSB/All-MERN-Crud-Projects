import React, { useEffect, useState } from 'react'
import axios from "axios"



function PostDetails(props) {
    const [post,setPost]=useState({})

    useEffect(()=>{
        const id = props.match.params.id
        console.log(id)
            axios.get(`http://localhost:8080/api/posts/details/${id}`).then((res)=>{
                
                if(res.data.success){
                        setPost(res.data.post)
                }
            })
    },[])
    console.log(post)
    return (
        <div style={{width:"60%",margin:"auto"}}>
            <div style={{backgroundColor:"#576574",padding:30,marginTop:30,borderRadius:10}}>
                <p style={{fontSize:25,color:"orchid",textTransform:"uppercase"}}>{post.postCategory}</p>
                <h1 style={{color:"white",textAlign:"center"}}>
{post.title}
                </h1>
                
            </div>

            <div style={{backgroundColor:"#576574",padding:30,color:"white" ,fontSize:20,marginTop:30}} dangerouslySetInnerHTML={{__html:post.description}}>
            </div>
        </div>
    )
}

export default PostDetails
