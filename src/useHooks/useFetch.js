import { useDispatch, useSelector } from 'react-redux'
import { createCommunity, openAuthentication, setIsVoted, setPageNum, setPosts, setWarningMessages, startLoading, stopFetching } from '../MyStore/action'
import { useNavigate } from 'react-router-dom'

let PROJECT_ID = "2xrb7gmxn2kw"
function useFetch() {
    // ReduxStore
    const { userToken, user } = useSelector((state)=>state.UserSetter)
    const { messages } = useSelector((state)=>state.WarningSetter)
    const { pageNum } = useSelector((state)=>state.UISetter)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchPost = (id, setType)=>{
        fetch(`https://academics.newtonschool.co/api/v1/reddit/post/${id ? id : ""}`, {
            headers:  {
            'projectID': PROJECT_ID
            }
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === "success"){
                dispatch(setPosts(setType,res.data))
            }
            else{
                console.warn(res.message)
            }
        })
        .catch((err)=>console.error(err))
    }

    const fetchPostbyPage = (setType, post)=>{
        fetch(`https://academics.newtonschool.co/api/v1/reddit/post?limit=20&page=${pageNum}`, {
            headers:  {
            'projectID': PROJECT_ID
            }
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === "success"){
                dispatch(setPosts(setType,[...post ,...res.data]))
                if(res.data.length === 20){
                    dispatch(setPageNum(pageNum+1))
                }
                else{
                    dispatch(setPageNum("null"))
                }
            }
            else{
                dispatch(setPageNum("null"))
                console.warn(res.message)
            }
        })
        .catch((err)=>console.error(err))
    }

    const fetchChannel = (id, setType)=>{
        fetch(`https://academics.newtonschool.co/api/v1/reddit/channel/${id ? id : ""}`, {
            headers:  {
            'projectID': PROJECT_ID
            }
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === "success"){
                dispatch(setPosts(setType,res.data))
            }
            else{
                console.warn(res.message)
            }
        })
        .catch((err)=>console.error(err))
    }

    const fetchComment = (id)=>{
        if(!userToken){
            dispatch(startLoading())
            dispatch(openAuthentication("login"))
            return
        }
        fetch(`https://academics.newtonschool.co/api/v1/reddit/post/${id}/comments`, {
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'projectID': PROJECT_ID
            }
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === "success"){
                dispatch(setPosts("comments", res.data))
            }
            else{
                console.warn(res.message)
            }
        })
        .catch((err)=>console.error(err))
    }

    const fetchChannelbyName = (name, setType)=>{
        fetch(`https://academics.newtonschool.co/api/v1/reddit/channel?search={"name":"${name}"}`, {
            headers: {
                'projectID': PROJECT_ID
            }
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === "success"){
                if(setType === "channelVerify"){
                    dispatch(setPosts(setType, res.data[0].name))
                }
                else{
                    dispatch(setPosts(setType, res.data[0]))
                    dispatch(setPosts("channelPosts", null))
                }
            }
            else{
                if(setType === "channelVerify"){
                    dispatch(setPosts(setType, ""))
                }
                console.warn(res.message)
            }
        })
        .catch((err)=>console.error(err))
    }

    const fetchPostbyChannel = (id, setType)=>{
        if(!userToken){
            dispatch(startLoading())
            dispatch(openAuthentication("login"))
            return
        }
        fetch(`https://academics.newtonschool.co/api/v1/reddit/channel/${id}/posts`, {
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'projectID': PROJECT_ID
            }
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === "success"){
                dispatch(setPosts(setType, res.data))
            }
            else{
                console.warn(res.message)
            }
        })
        .catch((err)=>console.error(err))
    }

    const createChannel = (name)=>{
        if(!userToken){
            dispatch(startLoading())
            dispatch(openAuthentication("login"))
            return
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', `Welcome to our ${name}`);
        fetch('https://academics.newtonschool.co/api/v1/reddit/channel', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'projectID': PROJECT_ID
            },
            body: formData
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === "success"){
                dispatch(createCommunity(false))
                navigate(`/r/${res.data.name}`)
            }
            else{
                console.warn(res.message)
            }
        })
        .catch((err)=>console.error(err))
    }

    const updateChannel = (name, desc, id)=>{
        if(!userToken){
            dispatch(startLoading())
            dispatch(openAuthentication("login"))
            return
        }
        const formData = new FormData();
        formData.append("name", name)
        formData.append('description', desc);
        fetch(`https://academics.newtonschool.co/api/v1/reddit/channel/${id}`,{
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'projectID': PROJECT_ID
            },
            body: formData
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === "success"){
               fetchChannel(id, "singleChannel")
            }
            else{
                console.warn(res.message)
            }
        })
        .catch((err)=>console.error(err))
    }

    const deleteChannel = (channel)=>{
        if(!userToken){
            dispatch(startLoading())
            dispatch(openAuthentication("login"))
            return
        }
        fetch(`https://academics.newtonschool.co/api/v1/reddit/channel/${channel}`, {  
            method: "DELETE",  
            headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'projectID': PROJECT_ID
                }
        })
        .then((response)=>response.json())
        .then((res)=>{})
        .catch((err)=>{console.error(err), navigate("/")})
    }

    const fetchUser = (id)=>{
        if(!userToken){
            dispatch(startLoading())
            dispatch(openAuthentication('login'))
            return
        }
        fetch(`https://academics.newtonschool.co/api/v1/reddit/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'projectID': PROJECT_ID
            }
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === "success"){
                dispatch(setPosts('userDetails', res.data))
                dispatch(stopFetching())
            }
            else{
                console.warn(res.message)
            }
        })
        .catch((err)=>console.error(err))
    }

    const followUser = (id)=>{
        if(!userToken){
            dispatch(startLoading())
            dispatch(openAuthentication("login"))
            return
        }
        fetch(`https://academics.newtonschool.co/api/v1/reddit/follow/${id}`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'projectID': PROJECT_ID
            }
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === "success"){
                fetchUser(id)
            }
            else{
                console.warn(res.message)
            }
        })
        .catch((err)=>console.error(err))
    }

    const unFollowUser = (id)=>{
        if(!userToken){
            dispatch(startLoading())
            dispatch(openAuthentication("login"))
            return
        }
        fetch(`https://academics.newtonschool.co/api/v1/reddit/follow/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'projectID': PROJECT_ID
            }
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === "success"){
                fetchUser(id)
            }
            else{
                console.warn(res.message)
            }
        })
        .catch((err)=>console.error(err))
    }

    const createPost = (title, image, description)=>{
        if(!userToken){
            dispatch(startLoading())
            dispatch(openAuthentication("login"))
            return
        }
        const formData = new FormData();
        formData.append('images', image);
        formData.append('title', title);
        formData.append('content', description)
        fetch('https://academics.newtonschool.co/api/v1/reddit/post/', {  
            method: "POST",  
            headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'projectID': PROJECT_ID
                },
            body: formData
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === "success"){
                navigate(`/user/${res.data.title}/${res.data.author}`)
            }
            else{
                console.warn(res.message)
            }
        })
        .catch((err)=>console.error(err))
    }

    const updatePost = (title, description, id)=>{
        if(!userToken){
            dispatch(startLoading())
            dispatch(openAuthentication("login"))
            return
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', description)
        fetch(`https://academics.newtonschool.co/api/v1/reddit/post/${id}`, {  
            method: "PATCH",  
            headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'projectID': PROJECT_ID
                },
            body: formData
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === "success"){
                dispatch(setPosts("userPosts", ""))
                fetchPostbyUser(user._id, "userPosts")
            }
            else{
                console.warn(res.message)
            }
        })
        .catch((err)=>console.error(err))
    }

    const deletePost = (post, author)=>{
        if(!userToken){
            dispatch(startLoading())
            dispatch(openAuthentication("login"))
            return
        }
        fetch(`https://academics.newtonschool.co/api/v1/reddit/post/${post}`, {  
            method: "DELETE",  
            headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'projectID': PROJECT_ID
                }
        })
        .then((response)=>response.json())
        .then((res)=>{})
        .catch((err)=>{console.error(err), fetchPostbyUser(author, "userPosts")})
    }

    const fetchPostbyUser = (id, setType)=>{
        if(!userToken){
            dispatch(startLoading())
            dispatch(openAuthentication("login"))
            return
        }
        fetch(`https://academics.newtonschool.co/api/v1/reddit/user/${id}/posts`, {
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'projectID': PROJECT_ID
            }
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === "success"){
                dispatch(setPosts(setType, res.data))
            }
            else{
                console.warn(res.message)
            }
        })
        .catch((err)=>console.error(err))
    }

    const createComment = (id, input)=>{
        fetch(`https://academics.newtonschool.co/api/v1/reddit/comment/${id}`, {
        method: "POST",    
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
                'projectID': PROJECT_ID
            },
            body: JSON.stringify({
                content: input
            })
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === "success"){
                fetchComment(id)
                dispatch(setWarningMessages([...messages, {message: "Commented successfully.", timestamp: Date.now(), color: "#46d160", emoji: "happy"}]))
                window.scrollTo({top: document.documentElement.scrollHeight ,behavior: 'smooth'})
            }
            else{
                console.warn(res.message)
            }
        })
        .catch((err)=>console.error(err))
    }

    const updateComment = (description, id, author)=>{
        if(!userToken){
            dispatch(startLoading())
            dispatch(openAuthentication("login"))
            return
        }
        const formData = new FormData();
        formData.append('content', description)
        fetch(`https://academics.newtonschool.co/api/v1/reddit/comment/${id}`, {  
            method: "PATCH",  
            headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'projectID': PROJECT_ID
                },
            body: formData
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === "success"){
                fetchComment(author)
            }
            else{
                console.warn(res.message)
            }
        })
        .catch((err)=>console.error(err))
    }

    const deleteComment = (comment, author)=>{
        if(!userToken){
            dispatch(startLoading())
            dispatch(openAuthentication("login"))
            return
        }
        fetch(`https://academics.newtonschool.co/api/v1/reddit/comment/${comment}`, {  
            method: "DELETE",  
            headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'projectID': PROJECT_ID
                }
        })
        .then((response)=>response.json())
        .then((res)=>{})
        .catch((err)=>{console.error(err), fetchComment(author)})
    }

    const addLike = (id, type)=>{
        fetch(`https://academics.newtonschool.co/api/v1/reddit/like/${id}`, {
        method: "POST",    
        headers: {
                'Authorization': `Bearer ${userToken}`,
                'projectID': PROJECT_ID
            }
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === "success"){
                if(type==="singlepost") fetchPost(id, 'singlePost')
                if(type==="mainpost") fetchPost("", "mainPosts")
                if(type==="channel") dispatch(setIsVoted())
                dispatch(setWarningMessages([...messages, {message: res.message, timestamp: Date.now(), color: "#46d160", emoji: "happy"}]))
            }
            else{
                dispatch(setWarningMessages([...messages, {message: res.message, timestamp: Date.now(), color: "#46d160", emoji: "happy"}]))
                console.warn(res.message)
            }
        })
        .catch((err)=>console.error(err))
    }

    const removeLike = (id, type)=>{
        fetch(`https://academics.newtonschool.co/api/v1/reddit/like/${id}`, {
        method: "DELETE",    
        headers: {
                'Authorization': `Bearer ${userToken}`,
                'projectID': PROJECT_ID
            }
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === "success"){
                if(type==="singlepost") fetchPost(id, 'singlePost')
                if(type==="mainpost") fetchPost("", "mainPosts")
                if(type==="channel") dispatch(setIsVoted())
                dispatch(setWarningMessages([...messages, {message: res.message, timestamp: Date.now(), color: "#ff4500", emoji: "sad"}]))
            }
            else{
                dispatch(setWarningMessages([...messages, {message: res.message, timestamp: Date.now(), color: "#ff4500", emoji: "sad"}]))
                console.warn(res.message)
            }
        })
        .catch((err)=>console.error(err))
    }

  return { fetchPost, fetchChannel, fetchComment, fetchChannelbyName, fetchPostbyChannel, createChannel, updateChannel, deleteChannel, fetchUser, followUser, unFollowUser, createPost, fetchPostbyUser, createComment, addLike, removeLike, fetchPostbyPage, deletePost, deleteComment, updatePost, updateComment }
}

export default useFetch