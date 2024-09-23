import React from 'react'
import { signInWithPopup, GoogleAuthProvider, signOut, GithubAuthProvider } from "firebase/auth";
import { auth, ghprovider, provider } from './config';
import { useDispatch } from 'react-redux';
import { closeAuthentication, setUser } from '../MyStore/action';
import useFirebaseUser from '../useHooks/useFirebaseUser';


const PROJECT_ID = "2xrb7gmxn2kw"

function useFirebaseAuth() {

    const { signUpUser } = useFirebaseUser()

    const signInwithGoogle = ()=>{
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            signUpUser(user.displayName, user.providerData[0].uid)
            
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            // const errorMessage = error.message;
            // The email of the user's account used.
            // const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    const signOutUser = ()=>{
        signOut(auth).then(() => {
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
            console.warn(error)
        });
    }

    const signInwithGithub = ()=>{
        signInWithPopup(auth, ghprovider)
        .then((result) => {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            signUpUser(user.displayName, user.providerData[0].uid)
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            // const email = error.customData.email;
            // const id = error.customData
            // The AuthCredential type that was used.
            const credential = GithubAuthProvider.credentialFromError(error);
            // ...
        });
    }

  return { signInwithGoogle, signOutUser, signInwithGithub}
}

export default useFirebaseAuth