import * as React from "react";
import AsideMenu from "./AsideMenu";
import { useDispatch, useSelector } from "react-redux";
import { HiMiniArrowLeft } from "react-icons/hi2"
import { setAside } from "../../MyStore/action";
import Drawer from "@mui/material/Drawer";


export default function AsideDrawer({ open }) {
    // ReduxStore
    const { isDark } =  useSelector((state)=>state.UISetter)

    const dispatch = useDispatch()
    const AsideRef = React.createRef()

    function onClickHandler(e){
        if(!AsideRef?.current?.contains(e.target)){
            dispatch(setAside(false))
        }
    }

  return (
    <Drawer anchor="left" open={open} onClick={(e)=>onClickHandler(e)}>
        <div ref={AsideRef} style={{backgroundColor: isDark.backgroundColor, color: isDark.color}}>
            <div style={{width: "100%", height: "40px", display: "flex", justifyContent: "flex-end", paddingRight: "20px"}}>
                <HiMiniArrowLeft  onClick={()=>dispatch(setAside(false))} style={{position: "relative", bottom: "-20px", transform: "scale(1.5)", cursor: "pointer"}}/>
            </div>
            <AsideMenu Atype="drawer"/>
        </div>
    </Drawer>
  );
}