import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { getUserDetails,getUserSpecificDetails } from './service/api';
import './LeftComponent.css'


const LeftComponent = () => {

    const [query,setQuery]=useState('');
    const [data,setData]=useState([]);
    const [userId,setUserId]=useState();
    const [postMan,setPostMan]=useState({});
    const [userTitle,setUserTitle]=useState('');
    const [cont,setCont]=useState();

    useEffect(()=>{
        try{
            getUserDetails().then((response)=>{setData(response.data)})
        }
        catch(err){
            console.log(err);
        }
    },[])

    function handleUser(post){
        setUserId(post.id);
        setUserTitle(post.title);
        setCont(post.userId);
    }

    useEffect(()=>{
        try{
            getUserSpecificDetails(userId).then((response)=>{
                console.log(response.data);
                setPostMan(response.data)})
        }
        catch(err){
            console.log(err);
        }
    },[userId])

  return (
      <div className='ScreenItem'>
      <div className='LeftComponent'>
      <div className='SearchField'>
        <h3>Todos</h3>
        <div>
            <input className="SearchMe" placeholder='Search' onChange={e=>setQuery(e.target.value)}/>
        </div>
      </div>
    <table>
        <tr>
            <th>ToDo id</th>
            <th>Title</th>
            <th>Status</th>
            <th>Action</th>

        </tr>
        {
            
            data.filter(post=>{
                console.log(query);
                if(query===''){
                    return post
                }
                else if(post.id.toString()===query){
                    return post;
                }
            }).map((post,index)=>(
                <tr key={index}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.completed?<p>Complete</p>:<p>Incomplete</p>}</td>
                    <td><button onClick={(e)=>{handleUser({id:post.id,title:post.title,userId:post.userId})}}>View User</button></td>
                </tr>
            ))
        }
    </table>
</div>
<div className='RightComponent'>
    <h3>User Details</h3>
    <div className='boxField'>
        {
            Object.keys(postMan).length!==0?
            <>
        <span><p>ToDo Id:</p><p>{postMan.id}</p></span>
        <span><p>ToDo Title:</p><p>{userTitle}</p></span>
        <span><p>User Id:</p><p>{cont}</p></span>
        <span><p>Name:</p><p>{postMan.name}</p></span>
        <span><p>Email:</p><p>{postMan.email}</p></span>

        </>
        :
        <div></div>
}
    </div>

</div>
</div>
  )
}

export default LeftComponent