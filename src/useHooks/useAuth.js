import React from 'react'
import { useDispatch } from 'react-redux'
import { authError, changePass, setUser } from '../MyStore/action'


const PROJECT_ID = "2xrb7gmxn2kw"
 
function useAuth() {

    const dispatch = useDispatch()

    const signUp = (name, email, password)=>{
        dispatch(authError(""))
        fetch('https://academics.newtonschool.co/api/v1/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'projectID': PROJECT_ID
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                appType: 'reddit'
            })
        })
        .then((response)=>response.json())
        .then((result)=>{
            if(result.status==="success"){
                dispatch(authError(""))
                sessionStorage.setItem("AuthCredentials", JSON.stringify({data: result.data.user, token: result.token}))
                dispatch(setUser(result.data.user, result.token))
                window.scrollTo({top: 0,behavior: 'smooth'})
            }
            else{
                dispatch(authError(result.message))
            }
        })
        .catch((err)=>console.error(err))
    }

    const logIn = (email, password)=>{
        dispatch(authError(""))
        fetch('https://academics.newtonschool.co/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'projectID': PROJECT_ID
            },
            body: JSON.stringify({
                email: email,
                password: password,
                appType: 'reddit'
            })
        })
        .then((response)=>response.json())
        .then((result)=>{
            if(result.status==="success"){
                dispatch(authError(""))
                sessionStorage.setItem("AuthCredentials", JSON.stringify({data: result.data, token: result.token}))
                dispatch(setUser(result.data, result.token))
                window.scrollTo({top: 0,behavior: 'smooth'})
            }
            else{
                dispatch(authError(result.message))
            }
        })
        .catch((err)=>console.error(err))
    }

    const changePassword = (name, email, oldPassword, newPassword, token)=>{
        fetch('https://academics.newtonschool.co/api/v1/user/updateMyPassword', {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
               'projectID': PROJECT_ID,
               'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: name,
                email: email,
                passwordCurrent: oldPassword,
                password: newPassword,
                appType: 'reddit'
            })
        })
        .then((response)=>response.json())
        .then((result)=>{
            if(result.status === "success"){
                dispatch(authError(""))
                dispatch(changePass(result))
            }
            else{
                dispatch(authError(result.message))
            }
        })
        .catch((err)=>console.error(err))
    }
    
  return { logIn, signUp, changePassword }
}

export default useAuth