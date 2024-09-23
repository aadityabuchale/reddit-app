import React, { useEffect } from 'react'
import styles from "./CreatePost.module.css"
import AddPost from "../../Assets/Add Post Logo.png"
import Button from "../Button/Button"
import { MdPostAdd } from "react-icons/md"
import { LuImage } from "react-icons/lu"
import { BsLink45Deg } from 'react-icons/bs'
import { BiPoll } from "react-icons/bi"
import Checkbox from '@mui/joy/Checkbox';
import { BsExclamationCircle } from "react-icons/bs"
import { Link } from 'react-router-dom'
import { AiOutlinePlus } from "react-icons/ai"
import { BiBookmarkAlt } from 'react-icons/bi'
import { useState } from 'react'
import { createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeAuthentication, openAuthentication, setPostType, startLoading } from '../../MyStore/action'
import useFetch from '../../useHooks/useFetch'
import userlogo from "../../Assets/User Logo Half.png"

function CreatePost() {
    const { user } = useSelector((state)=>state.UserSetter)
    const { isDark, postType, isAside, isAuth } = useSelector((state)=>state.UISetter)
    const { createPost } = useFetch()
    const dispatch = useDispatch()
    const imageRef = createRef()
    const [image, setImage] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [showImage, setShowImage] = useState('')
 
    useEffect(()=>{
        document.title = "Submit to Reddit"
        window.scrollTo({top: 0,behavior: 'smooth'})
        if(!user){
            dispatch(startLoading())
            dispatch(openAuthentication("login"))
        }
    },[])

    useEffect(()=>{
        if(user){
            dispatch(closeAuthentication())
            return
        }
        if(!user && !isAuth){
            setTimeout(() => {
                dispatch(startLoading())
                dispatch(openAuthentication("login"))
            }, 1000);
        }
    },[isAuth, user])

    function imageUploadhandler(e){
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            setShowImage(URL.createObjectURL(e.target.files[0]))
        }
    }

    function handleCreatePost(){
        if(!(title && (description || image))){
            return
        }
        createPost(title, image, description)
    }

    let hrTagStyle = {borderBottom: isDark ? `1px solid ${isDark.borderColor}` : "1px solid rgba(0, 0, 0, 0.2)"}
    let ButtonStyle = {p:"5px 15px", b:"1px solid #777", d:"flex", jc:"center", ai:"center", g:"5px", fs:"0.875rem", fw:"500", br:"20px", bc:"transparent", c:"#777", dis:true}

  return (
    <div className={styles.createpost} style={{backgroundColor: isDark.backgroundColor, color: isDark.color}}>
        <div className={styles.postinputDiv}>
            <div className={styles.title} style={{borderBottom: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #eee"}}>
                <p>Create a post</p>
                <Button br="20px" p="5px 15px" fs="0.875rem" fw="500" c="#0079D3" bc="transparent" hbc="#eee">DRAFTS <span className={styles.draftCount}>0</span></Button>
            </div>
            <div className={styles.chooseCommunity}>
                <div className={styles.communitybutton} style={{backgroundColor: isDark.childbackgroundColor || "#fff", border: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #eee"}}>
                    <img  src={userlogo} className={styles.createPostUserLogo}/>
                    <p className={styles.inputtext}>{user?.name}</p>
                </div>
            </div>
            <div className={styles.AddPostContainer} style={{border: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #eee", backgroundColor: isDark.childbackgroundColor || "#fff"}}>
                <div className={styles.PostTypeDiv}>
                    <div className={styles.PostType} style={{color: postType==="text" ? isDark.color || "#0079D3" : isDark.childColor,borderLeft: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #eee" ,borderBottom: postType==="text" ? isDark ? `2px solid ${isDark.color}` : "2px solid #0079D3" :  isDark ? `2px solid ${isDark.borderColor}` : "2px solid #eee"}} onClick={()=>dispatch(setPostType('text')) }><MdPostAdd style={{fontSize: "1.5rem"}}/> Post</div>
                    <div className={styles.PostType} style={{color: postType==="image" ? isDark.color || "#0079D3" : isDark.childColor,borderLeft: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #eee" ,borderBottom: postType==="image" ?isDark ? `2px solid ${isDark.color}` :  "2px solid #0079D3" : isDark ? `2px solid ${isDark.borderColor}` :  "2px solid #eee"}} onClick={()=>dispatch(setPostType('image')) }><LuImage style={{fontSize: "1.5rem"}}/> Image</div>
                    <div className={styles.PostType} style={{color: postType==="link" ? isDark.color || "#0079D3" : isDark.childColor,borderLeft: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #eee" ,borderBottom: postType==="link" ? isDark ? `2px solid ${isDark.color}` : "2px solid #0079D3" :  isDark ? `2px solid ${isDark.borderColor}` : "2px solid #eee"}} onClick={()=>dispatch(setPostType('link')) }><BsLink45Deg style={{fontSize: "1.75rem"}}/> Link</div>
                    <div className={styles.PostType} style={{color: postType==="poll" ? isDark.color || "#0079D3" : isDark.childColor,borderLeft: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #eee" ,borderBottom: postType==="poll" ? isDark ? `2px solid ${isDark.color}` : "2px solid #0079D3" :  isDark ? `2px solid ${isDark.borderColor}` : "2px solid #eee", opacity: "0.5", cursor: "not-allowed"}}><BiPoll style={{fontSize: "1.75rem"}}/> Poll</div>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.inputsDiv}>
                        <input className={`${isDark ? styles.darkFocus : styles.lightFocus}`} style={{border: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #999", color: isDark.color || "#000"}} placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
                        {
                            postType === "image" ?
                            <div className={styles.imageInput} style={{border: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #999", color: isDark.color || "#000"}}>
                                {!image ? <Button p="5px 15px" b={isDark ? `1px solid ${isDark.color}` : "1px solid #0079D3"} fs="1rem" fw="500" br="20px" bc="transparent" c={isDark.color || "#0079D3"} onClick={()=>imageRef.current.click()}>Upload</Button>
                                : <>
                                    <img src={showImage} className={styles.inputImage}/>
                                    <Button p="2px 15px" b={isDark ? `1px solid ${isDark.color}` : "1px solid #333"} fs="1rem" fw="500" br="20px" bc="transparent" c={isDark.color || "#333"} onClick={()=>setImage('')}>Clear</Button>
                                  </>
                                }
                                <input ref={imageRef} type='file' className={styles.imageInput} style={{display: "none"}} onChange={(e)=>imageUploadhandler(e)}/>
                            </div> :
                            <textarea className={`${isDark ? styles.darkFocus : styles.lightFocus}`} style={{border: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #999", color: isDark.color || "#000"}} placeholder={postType==="text"? "Text(Optional)" : "Link"} value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                        }
                    </div>
                    <div className={styles.optionButtons}>
                        <Button {...ButtonStyle}><AiOutlinePlus /> OC</Button>
                        <Button {...ButtonStyle}><AiOutlinePlus /> Spoiler</Button>
                        <Button {...ButtonStyle}><AiOutlinePlus /> NSFW</Button>
                        <Button {...ButtonStyle}><BiBookmarkAlt /> Flair</Button>
                    </div>
                    <hr className={styles.hrtag} style={{borderBottom: isDark ? `1px solid ${isDark.borderColor}` : "1px solid rgba(0, 0, 0, 0.2)"}} ></hr>
                    <div className={styles.submitButtons}>
                        <Button {...ButtonStyle}>Save Draft</Button>
                        <Button p="5px 15px" b={title && (description || image) ? isDark ? `1px solid ${isDark.color}` :"1px solid #0079D3" : "1px solid #777"} d="flex" jc="center" ai="center" g="5px" fs="0.875rem" fw="500" br="20px" bc={title && (description || image) ? isDark.color || "#0079D3" : "#777"} c={isDark ? isDark.switchColor : "#fff"} dis={!(title && (description || image))} onClick={handleCreatePost}>Post</Button>
                    </div>
                </div>
                <div className={styles.postAdConditions} style={{backgroundColor: isDark.backgroundColor || "#eee"}}>
                    <Checkbox sx={{color: isDark.color || "#000"}} size="sm" label="Send me post reply notifications" />
                    <div className={styles.connections}><Link to="#">Connect accounts to share your post</Link> <BsExclamationCircle /></div>
                </div>
            </div>
        </div>
        <div className={styles.condition} style={{display: isAside && window.innerWidth < 950 && "none"}}>
            <div className={styles.conditionContainer} style={{border: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #eee"}}>
                <div className={styles.conditionTitle}>
                    <img src={AddPost}/>
                    <p>Posting to Reddit</p>
                </div>
                <hr className={styles.hrtag} style={hrTagStyle} ></hr>
                <div className={styles.conditionContent}>1. Remember the human</div>
                <hr className={styles.hrtag} style={hrTagStyle} ></hr>
                <div className={styles.conditionContent}>2. Behave like you would in real life</div>
                <hr className={styles.hrtag} style={hrTagStyle} ></hr>
                <div className={styles.conditionContent}>3. Look for the original source of content</div>
                <hr className={styles.hrtag} style={hrTagStyle} ></hr>
                <div className={styles.conditionContent}>4. Search for duplicates before posting</div>
                <hr className={styles.hrtag} style={hrTagStyle} ></hr>
                <div className={styles.conditionContent}>5. Search for duplicates before posting</div>
                <hr className={styles.hrtag} style={hrTagStyle} ></hr>
            </div>
            <p className={styles.termsC} style={{color: isDark.childColor || "#000"}}>Please be mindful of reddit's <Link to="#">content policy</Link> and practice good <Link to="#">reddiquette</Link>.</p>
        </div>
    </div>
  )
}

export default CreatePost