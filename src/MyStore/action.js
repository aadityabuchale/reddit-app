export const setTheme = (type)=>{
    return  {
        type: "setTheme", 
        payload: type
    }
}

export const openMessage = ()=>{
    return {
        type: "openMsg"
    }
}

export const closeMessage = ()=>{
    return {
        type: "closeMsg"
    }
}

export const openDownload = ()=>{
    document.getElementById("reddit_portal").style.display = "flex"
    return {
        type: "openDownload"
    }
}

export const closeDownload = ()=>{
    document.getElementById("reddit_portal").style.display = "none"
    return {
        type: "closeDownload"
    }
}

export const openAuthentication = (type)=>{
    document.getElementById("reddit_portal").style.display = "flex"
    return {
        type: "openAuth", payload: type
    }
}

export const closeAuthentication = ()=>{
    document.getElementById("reddit_portal").style.display = "none"
    return {
        type: "closeAuth"
    }
}

export const openNotification = (pos)=>{
    return {
        type: "openNotify",
        payload: pos
    }
}

export const closeNotification = ()=>{
    return {
        type: "closeNotify"
    }
}

export const openUserContainer = ()=>{
    return {
        type: "openUser"
    }
}

export const closeUserContainer = ()=>{
    return {
        type: "closeUser"
    }
}

export const startLoading = ()=>{
    return {
        type: "startLoading"
    }
}

export const stopLoading = ()=>{
    return {
        type: "stopLoading"
    }
}

export const setUser = (user, token)=>{
    return {
        type: "setUser",
        payload: user,
        payloadToken: token
    }
}

export const removeUser = ()=>{
    return {
        type: "removeUser"
    }
}

export const changePass = (token)=>{
    return {
        type: "changePass",
        payload: token
    }
}

export const authError = (err)=>{
    return {
        type: "authError",
        payload: err
    }
}

export const startFetching = ()=>{
    return {
        type: "startFetch"
    }
}

export const stopFetching = ()=>{
    return {
        type: "stopFetch"
    }
}

export const setPosts = (type,data)=>{
    return {
        type: "setPost",
        payload: data,
        payloadtype: type
    }
}

export const setcommentFocus = (type)=>{
    return {
        type: "focusComment",
        payload: type
    }
}

export const createCommunity = (type)=>{
    if(type){
        document.getElementById("reddit_portal").style.display = "flex"
    }
    else{
        document.getElementById("reddit_portal").style.display = "none"
    }
    return {
        type: "createCommunity",
        payload: type
    }
}

export const setOnlineStatus = (type)=>{
    return {
        type: "onlineStatus",
        payload: type
    }
}

export const setWarningMessages = (message)=>{
    return {
        type: "setWarning",
        payload: message
    }
}

export const setPremium =  (message)=>{
    return {
        type: "setPremium",
        payload: message
    }
}

export const setAside = (status)=>{
    return{
        type: "setAside",
        payload: status
    }
}

export const setPostType = (type)=>{
    return {
        type: "setPostType",
        payload: type
    }
}

export const searchSetter = (type, data)=>{
    return {
        type: "searchSetter",
        payload: data,
        payloadtype: type
    }
}

export const setIsVoted = ()=>{
    return {
        type: "isVoted"
    }
}

export const setAuthType = ()=>{
    return{
        type: "authType"
    }
}

export const setPageNum = (page)=>{
    return {
        type: "setPageNum",
        payload: page
    }
}

export const setFirstRender = (type)=>{
    return {
        type: "setRender",
        payload: type
    }
}