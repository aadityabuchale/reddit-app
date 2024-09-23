import React from 'react'
import { useDispatch } from 'react-redux'
import { closeAuthentication, setAuthType, setUser } from '../MyStore/action'

const PROJECT_ID = "2xrb7gmxn2kw"

function useFirebaseUser() {

    const dispatch = useDispatch()

    const signUpUser = (name, email)=>{
        fetch('https://academics.newtonschool.co/api/v1/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'projectID': PROJECT_ID
            },
            body: JSON.stringify({
                name: name,
                email: `${email}@gmail.com`,
                password: email,
                appType: 'reddit'
            })
        })
        .then((response)=>response.json())
        .then((result)=>{
            if(result.status === "success"){
                dispatch(closeAuthentication())
                sessionStorage.setItem("AuthCredentials", JSON.stringify({data: result.data.user, token: result.token}))
                dispatch(setUser(result.data.user, result.token))
                window.scrollTo({top: 0, behavior: "smooth"})
                dispatch(setAuthType())
            }
            else{
                loginUser(name, email)
            }
        })
        .catch((err)=>console.error(err))
    }


    const loginUser = (name, email)=>{
        fetch('https://academics.newtonschool.co/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'projectID': PROJECT_ID
            },
            body: JSON.stringify({
                email: `${email}@gmail.com`,
                password: email,
                appType: 'reddit'
            })
        })
        .then((response)=>response.json())
        .then((result)=>{
            if(result.status === "success"){
                dispatch(closeAuthentication())
                sessionStorage.setItem("AuthCredentials", JSON.stringify({data: result.data, token: result.token}))
                dispatch(setUser(result.data, result.token))
                window.scrollTo({top: 0, behavior: "smooth"})
                dispatch(setAuthType())
            }
            else{
                console.warn(result.message)
            }
        })
        .catch((err)=>console.error(err))
    }


  return { signUpUser, loginUser }
}

export default useFirebaseUser