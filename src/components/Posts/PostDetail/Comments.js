import React from 'react'
import styles from "./PostDetail.module.css"
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import defaultlogo from "../../../Assets/default_avatar.png"
import { Link } from 'react-router-dom'
import { CgArrowsExpandLeft } from 'react-icons/cg'
import { GoCircleSlash } from 'react-icons/go'
import { HiPencilSquare } from "react-icons/hi2"
import Button from '../../Button/Button'
import useFetch from '../../../useHooks/useFetch'

function Comments({value, children}) {
    const { userToken, user } = useSelector((state)=>state.UserSetter)
    const { isDark } = useSelector((state)=>state.UISetter)
    const { deleteComment, updateComment } = useFetch()
    const [author, setAuthor] = useState('')
    const [isOpen, setIsOpen] = useState(true)
    const [isEdit, setIsEdit] = useState(false)
    const [input, setInput] = useState("")

    useEffect(()=>{
        fetch(`https://academics.newtonschool.co/api/v1/reddit/user/${value.author}`, {
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'projectID': '2xrb7gmxn2kw'
            }
        })
        .then((response)=>response.json())
        .then((res)=>{
            setAuthor(res.data)
        })
    },[])
    
    const handleEdit = ()=>{
        setIsEdit(!isEdit)
        if(isEdit){
            if(input){
                updateComment(input, value._id, value.post)
            }
        }
        setInput(value?.content)
    }

    let postDate = new Date(value.createdAt).getTime()
    let newDate = new Date().getTime()

    let created = (newDate - postDate)>86400000 ? 
      Math.floor((newDate - postDate)/86400000) + " Days": 
      (newDate - postDate)>3600000 ?
      Math.floor((newDate - postDate)/3600000)+ "hr" :
      Math.floor((newDate - postDate)/60000)+ "min"

    let ButtonStyle = {p:"5px 10px", m:"3px 0", d:"flex", ai:"center", g:"5px", br:'50px', b:'transparent', hbc:isDark.childbackgroundColor || "#eee", c:isDark.color}
  return (
    <div className={styles.commentMain}>
        <div className={styles.commentUser}>
            {!isOpen && <CgArrowsExpandLeft className={styles.expandComment} onClick={()=>setIsOpen(true)}/>}
            <img src={author?.profileImage || defaultlogo}/>
            <Link to={`/user/${author?.name}/${author?._id}`} style={{color: isDark.color || "#000"}}>{author?.name}</Link>
            <p style={{color: isDark.childColor || "#576f76"}}>{created} ago</p>
        </div>
        {isOpen && 
            <div className={styles.commentDetails}>
                <hr onClick={()=>setIsOpen(false)}></hr>
                {children?.length > 0 ? 
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <p>{value.content}</p>
                        <div style={{display: "flex"}}>
                            {value.author === user._id && <Button {...ButtonStyle} onClick={()=>deleteComment(value._id, value.post)}><HiPencilSquare /> Edit</Button>}
                            {value.author === user._id && <Button {...ButtonStyle} onClick={()=>deleteComment(value._id, value.post)}><GoCircleSlash /> Remove</Button>}
                        </div>
                        {   
                            children.map((comment, idx)=>(
                                <Comments value={comment} key={idx} children={comment.children}/>
                            ))
                        }
                    </div>
                :   <>
                        {isEdit ? <textarea className={styles.changeComment} style={{color: isDark.color, border: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #ddd"}} value={input} onChange={(e)=>setInput(e.target.value)}></textarea> :
                        <p>{value.content}</p>}
                        <div style={{display: "flex"}}>
                            {value.author === user._id && <Button {...ButtonStyle} onClick={handleEdit}><HiPencilSquare /> {isEdit ? "Save" : "Edit"}</Button>}
                            {value.author === user._id && <Button {...ButtonStyle} onClick={()=>deleteComment(value._id, value.post)}><GoCircleSlash /> Remove</Button>}
                        </div>
                    </>
                }
            </div>
        }
    </div>
  )
}

export default Comments