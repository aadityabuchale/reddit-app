const UISetterInitial = {
    isDark : false,
    isMessage: false,
    isDownload: false,
    isAuth: false,
    isNotify: false,
    isUser: false,
    isLoading: false,
    isFetching: false,
    isComment: false,
    isChannel: false,
    isAside: true,
    postType: "text",
    isVoted: false, 
    pageNum: 2,
    isFirst: true
}

export const UISetter = (state=UISetterInitial, action)=>{
        switch(action.type){
            case "setTheme":
                return {...state, isDark: action.payload}
            case "openMsg":
                return {...state, isMessage: true}
            case "closeMsg":
                return {...state, isMessage: false}
            case "openDownload":
                return {...state, isDownload: true}
            case "closeDownload":
                return {...state, isDownload: false}
            case "openAuth":
                return {...state, isAuth: action.payload}
            case "closeAuth":
                return {...state, isAuth: false}
            case "openNotify":
                return {...state, isNotify: action.payload}
            case "closeNotify":
                return {...state, isNotify: false}
            case "openUser":
                return {...state, isUser: true}
            case "closeUser":
                return {...state, isUser: false}
            case "startLoading":
                return {...state, isLoading: true}
            case "stopLoading":
                return {...state, isLoading: false}
            case "startFetch":
                return {...state, isFetching: true}
            case "stopFetch":
                return {...state, isFetching: false}
            case "focusComment":
                return {...state, isComment: action.payload}
            case "createCommunity":
                return {...state, isChannel: action.payload}
            case "setAside":
                return {...state, isAside: action.payload}
            case 'setPostType':
                return {...state, postType: action.payload}
            case "isVoted":
                return {...state, isVoted: !state.isVoted}
            case "setPageNum":
                return {...state, pageNum: action.payload}
            case "setRender":
                return {...state, isFirst: action.payload}
            default:
                return state
        }
}

const UserSetterInitial = {
    user: null,
    userToken: null,
    authError: "",
    isOnline: true,
    isPremium: false,
    authType: false
}

export const UserSetter = (state=UserSetterInitial, action)=>{
    switch(action.type){
        case "setUser":
            return {...state, user: action.payload, userToken: action.payloadToken, authError: ""}
        case "removeUser":
            return {...state, user: null, userToken: null, isPremium: false, authType: false}
        case "changePass":
            return {...state, userToken: action.payload.token}
        case "authError":
            return {...state, authError: action.payload}
        case "onlineStatus":
            return {...state, isOnline: action.payload}
        case "setPremium":
            return {...state, isPremium: action.payload}
        case "authType":
            return {...state, authType: true}
        default:
            return state
    }
}

const DateSetterInitial ={
}

export const DataSetter = (state=DateSetterInitial, action)=>{
    switch(action.type){
        case "setPost":
            return {...state, [action.payloadtype] : action.payload}
        default:
            return state
    }
}

const WarningSetterInitial ={
    messages: []
}

export const WarningSettter = (state=WarningSetterInitial, action)=>{
    switch(action.type){
        case "setWarning":
            return {...state, messages: action.payload}
        default:
            return state
    }
}

const SearchSetterInitial = {
    searchType: "Posts",
    searchPosts: null,
    searchComments: null,
    searchCommunities: null,
    searchUsers: null
}

export const SearchSetter = (state=SearchSetterInitial, action)=>{
    switch(action.type){
        case "searchSetter":
            return {...state, [action.payloadtype]: action.payload}
        default:
            return state
    }
}