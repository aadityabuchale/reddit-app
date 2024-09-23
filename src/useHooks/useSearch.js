import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openAuthentication, searchSetter, startLoading } from '../MyStore/action'

let PROJECT_ID = "2xrb7gmxn2kw"

function useSearch() {
    // ReduxStore
    const { userToken } = useSelector((state)=>state.UserSetter)
    const dispatch = useDispatch()

    const searchPost = (value)=>{
        if(!userToken){
            dispatch(startLoading())
            dispatch(openAuthentication("login"))
            return
        }
        fetch(`https://academics.newtonschool.co/api/v1/reddit/post?search={"content":"${value}"}`, {
            headers: {
                'projectID': PROJECT_ID
            }
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === "success"){
                dispatch(searchSetter("searchPosts", res.data))
            }
            else{
                dispatch(searchSetter("searchPosts", []))
                console.warn(res.message)
            }
        })
        .catch((err)=>console.error(err))
    }

    const searchComment = (value)=>{
        if(!userToken){
            dispatch(startLoading())
            dispatch(openAuthentication("login"))
            return
        }
        fetch(`https://academics.newtonschool.co/api/v1/reddit/comment?search={"content":"${value}"}`, {
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'projectID': PROJECT_ID
            }
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === "success"){
                dispatch(searchSetter("searchComments", res.data))
            }
            else{
                dispatch(searchSetter("searchComments", []))
                console.warn(res.message)
            }
        })
        .catch((err)=>console.error(err))
    }
    
    const searchChannel = (value)=>{
        if(!userToken){
            dispatch(startLoading())
            dispatch(openAuthentication("login"))
            return
        }
        fetch(`https://academics.newtonschool.co/api/v1/reddit/channel?search={"name":"${value}"}`, {
            headers: {
                'projectID': PROJECT_ID
            }
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === "success"){
                dispatch(searchSetter("searchCommunities", res.data))
            }
            else{
                dispatch(searchSetter("searchCommunities", []))
                console.warn(res.message)
            }
        })
        .catch((err)=>console.error(err))
    }

    const searchUser = (value)=>{
        if(!userToken){
            dispatch(startLoading())
            dispatch(openAuthentication("login"))
            return
        }
        fetch(`https://academics.newtonschool.co/api/v1/reddit/user?search={"name":"${value}"}`, {
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'projectID': PROJECT_ID
            }
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === "success"){
                dispatch(searchSetter("searchUsers", res.data))
            }
            else{
                dispatch(searchSetter("searchUsers", []))
                console.warn(res.message)
            }
        })
        .catch((err)=>console.error(err))
    }

    return { searchPost, searchComment, searchChannel, searchUser }
}

export default useSearch