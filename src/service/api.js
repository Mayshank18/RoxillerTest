import axios from 'axios'

const url='https://jsonplaceholder.typicode.com';

 export const getUserDetails=async()=>{
    try{
        return await axios.get(`${url}/todos`)
    }
    catch(err){
        console.log('error calling getUserDetails Api');
    }
}

export const getUserSpecificDetails=async(userId)=>{
    try{
        return await axios.get(`${url}/users/${userId}`)
    }
    catch(err){
        console.log('error calling getUserDetails Api');
    }
}