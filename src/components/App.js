import { useDispatch, useSelector } from "react-redux";
import "../styles/App.css";
import Login from "./Authentication/Login";
import SignUp from "./Authentication/SignUp";
import Download from "./Download/Download";
import Home from "./Home/Home";
import Message from "./Messages/Message";
import NavBar from "./NavBar/NavBar";
import Notification from "./Notification/Notification";
import UserContainer from "./UserContainer/UserContainer";
import CreateChannel from "./Channel/CreateChannel";
import Warning from "./Warning/Warning";
import AsideDrawer from "./AsideMenu/AsideDrawer";
import { useEffect } from "react";
import { setAside, setPosts, setTheme, setUser } from "../MyStore/action";
import ChangePassword from "./Authentication/ChangePassword";

function App() {
  const { isDark, isMessage, isDownload, isAuth, isNotify, isUser, isChannel, isAside } = useSelector((state)=>state.UISetter)
  const { user } = useSelector((state)=>state.UserSetter)
  const { messages } = useSelector((state)=>state.WarningSetter)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(localStorage.getItem("Recents")){
      dispatch(setPosts("recents", JSON.parse(localStorage.getItem("Recents"))))
    }
    if(sessionStorage.getItem("AuthCredentials")){
      let User = JSON.parse(sessionStorage.getItem("AuthCredentials"))
      dispatch(setUser(User.data, User.token))
    }
    if(isAside && window.innerWidth<700){
      dispatch(setAside(false))
    }
    window.addEventListener('resize',()=>{
      if(isAside){
        dispatch(setAside(false))
      }
    })

    return ()=>{
      window.removeEventListener("resize",()=>{})
    }
  },[])

  useEffect(()=>{
    if(localStorage.getItem("darkMode")){
      const data = JSON.parse(localStorage.getItem("darkMode"))
      if(data.includes(user?._id)){
        dispatch(setTheme({
          color: "#D7DADC",
          backgroundColor: "#1A1A1B",
          borderColor: "#474748", 
          childColor: "#818384",
          childbackgroundColor: "#272729",
          childborderColor: "#343536",
          switchColor: "#1A1A1B"
        }))
      }
    }
  },[user])

  return (
    <div className="app" style={{backgroundColor: isDark.backgroundColor}}>
      {window.innerWidth<700 && isAside && <AsideDrawer open={isAside}/> }
      <NavBar />
      <Home />
      {isAuth === "login" && <Login />}
      {isAuth === "signup" && <SignUp />}
      {isAuth === "password" && <ChangePassword />}
      {isDownload && <Download />}
      {isUser && <UserContainer />}
      {isNotify && <Notification />}
      {isMessage && <Message />}
      {isChannel && <CreateChannel />}
      {messages.length>0 && <Warning /> }
    </div>
  );
}


export default App;
