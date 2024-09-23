import React, { useEffect } from 'react'
import styles from './Home.module.css'
import { memo } from 'react'
import AsideMenu from '../AsideMenu/AsideMenu'
import Main from '../Main/Main'
import CreatePost from "../CreatePost/CreatePost"
import { Route, Routes } from 'react-router-dom'
import PostDetail from '../Posts/PostDetail/PostDetail'
import Channel from '../Channel/Channel'
import { useDispatch, useSelector } from 'react-redux'
import User from '../User/User'
import Premium from '../Premium/Premium'
import Error from '../Error/Error'
import Popular from '../Popular/Popular'
import Search from '../Search/Search'
import { setFirstRender } from '../../MyStore/action'

function Home() {
  const { isDark, isAside, isFirst } = useSelector((state)=>state.UISetter)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(isFirst){
      dispatch(setFirstRender(false))
    }
  },[])

  return (
    <div className={styles.Home} style={{backgroundColor: isDark.backgroundColor}}>
        {isAside && window.innerWidth>=700 && <AsideMenu />}
        <Routes>
          <Route path='*' element={<Error />}></Route>
          <Route path='/' element={<Main />}></Route>
          <Route path='/r/popular' element={<Popular popular="popular"/>}></Route>
          <Route path='/submit' element={<CreatePost />}></Route>
          <Route path='/r/:channelName' element={<Channel />}></Route>
          <Route path='/r/:channelname/comments/:id' element={<PostDetail />}></Route>
          <Route path='/user/:userName/:userId' element={<User />}></Route>
          <Route path='/premium' element={<Premium /> }></Route>
          <Route path='/search' element={<Search />}></Route>
        </Routes>
    </div>
  )
}

export default memo(Home)