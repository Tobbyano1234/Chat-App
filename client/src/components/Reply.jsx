import axios from "axios"
import React, { useEffect, useState } from "react";
import moment from 'moment'
import { mainAxios } from './Axios'

const Reply = (props) => {

    const [replies, setReplies] = useState([])
    const [showReplies, setShowReplies] = useState(false)

    const handleSetReplies = async () => {

        // const id = e.target.id.split('-')[1]
        // const postId = e.target.getAttribute("data-id")
        
        try {
            const res = await mainAxios.post("notes/some", {
                id: `${props.id}`
            })

            if (res.data.notes.length > 0) {

                setReplies(res.data.notes)


            } else {

            }

        } catch (err) {
            throw err
        }
    }

    const handleShowReplies = async () => {
        setShowReplies(!showReplies)
    }
    useEffect(() => {
        handleSetReplies();
    }, [])


    return (
        <>

            {showReplies &&
                replies.map((reply) => {
                    return (

                        <div className="post-header reply-content">
                            <div class="media"><div class="user-img"><img src={reply.avatar} alt="avatar" style={{ width: "70px", height: "70px" }} />
                            </div>
                                <div className="media-body ">
                                    <div className="user-title">
                                        <a href="/#">{reply.author_name}</a>
                                        <i class="icofont-check"></i>
                                    </div>
                                    <ul className="entry-meta">
                                        <li className="meta-privacy"><i class="icofont-world"></i> Public</li>
                                        <li className="meta-time">{moment(reply.createdAt).calendar()}</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="">
                                {reply.content}
                            </div>

                        </div>
                    )
                })
            }
            <div className="post-meta-wrap">
                <div className="post-meta">
                    {replies.length === 1 &&
                        <div className="meta-text"><a onClick={handleShowReplies} id={"meta_replies-" + props.index} data-id={props.id}>1 Reply </a></div>
                    }

                    {replies.length !== 1 &&
                        <div className="meta-text"><a onClick={handleShowReplies} id={"meta_replies-" + props.index} data-id={props.id}>{replies.length + " Replies"} </a></div>
                    }
                </div>
            </div>
        </>
    )
}

export default Reply;