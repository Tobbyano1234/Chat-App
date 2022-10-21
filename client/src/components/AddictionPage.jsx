
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mainAxios } from './Axios';
import $ from 'jquery';
import moment from 'moment'
const Reply = React.lazy(() => import('./Reply'))
const ENDPOINT = `${process.env.FRONTEND_URL}:${process.env.PORT}`


const DepressedPage = () => {
    const userId = localStorage.getItem("user");
    const userName = localStorage.getItem("userName");
    const userAvatar = localStorage.getItem("userAvatar");

    const CATEGORY = "Drug Addiction";
    const TAGLINE = "Beating the habit"
    const DB_CATEGORY = "ADDICTION";

    const [replies, setReplies] = useState([])
    const [toDelete, setToDelete] = useState("")
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState([]);
    const [updatePost, setUpdatePost] = useState("");
    const [userCount, setUserCount] = useState(0);
    const [err, setErr] = useState("");
    const countPosts = posts.filter(function (post) {
        return post.parent === '0'
    })


    useEffect(() => {


        $(".dropdown-menu").on("click", ".dropdown-edit", function (e) {
            let id = e.target.id.split("-")[1]
            if ($("#content-" + id).attr("contenteditable") !== "true") {
                $("#content-" + id).attr("contenteditable", "true").focus()
                $("#save-" + id).css('display', 'block')
            }
            $("#content-" + id).css("background-color", "#F8F8F8")
        })

        $(".save-edit").on("click", function (e) {
            let id = e.target.id.split("-")[1]
            $("#content-" + id).css("background-color", "#ffffff")
            $("#save-" + id).css('display', 'none')
            $("#content-" + id).attr("contenteditable", "false")
        })

        $(".dropdown-reply").on("click", function (e) {
            let id = e.target.id.split("-")[1]
            $("#editor-" + id).toggleClass("show")
        })



    });


    const handleDeleteChange = (e) => {
        e.preventDefault();
        const postId = e.target.getAttribute("data-id")
        setToDelete(postId);
    }

    const handleShowReplies = async (e) => {
        const id = e.target.id.split('-')[1]
        const postId = e.target.getAttribute("data-id")
        const thread = document.getElementById("content-" + id)
        try {
            const res = await mainAxios.post("notes/some", {
                id: postId
            })
            if (res.data.notes.length > 0) {

                setReplies(res.data.notes)

            } else {

            }

        } catch (err) {
            throw err
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setNewPost({ ...newPost, [name]: value });
        setErr("");
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const textarea = document.getElementById('content');
        textarea.value = "";


        try {

            await mainAxios.post("notes/create", {
                parent: "0",
                content: newPost.content,
                author_name: userName,
                avatar: userAvatar,
                author_id: userId,
                category: DB_CATEGORY
            });

            // setPosts([newPost, ...posts])
            setNewPost([])
            getPosts();

        } catch (err) {
            throw err
        }
    };


    const handleReplySubmit = async (e) => {
        e.preventDefault();

        const id = e.target.id.split('-')[1]
        const postId = e.target.getAttribute("data-id")
        const editWrapper = document.getElementById("editor-" + id)
        const content = document.getElementById("edit_textara-" + id).value

        try {

            const res = await mainAxios.post("notes/create", {
                parent: postId,
                content: content,
                avatar: userAvatar,
                author_name: userName,
                author_id: userId,
                category: CATEGORY
            });

            if (res.data.inserted === 1) {
                editWrapper.classList.toggle("show");
            }
            setNewPost([])
            getPosts();

        } catch (err) {
            throw err
        }
    };

    const handleDeleteSubmit = async (e) => {
        e.preventDefault()

        const postId = e.target.getAttribute("data-id")

        try {

            await mainAxios.post("notes/delete", {
                id: postId,
            })
            // setPosts();
            getPosts();

        } catch (err) {
            throw err
        }

    }

    const handleFlagSubmit = async (e) => {
    e.preventDefault()

    const id = e.target.id.split('-')[1]
    const postId = e.target.getAttribute("data-id")

    
    try {

      await mainAxios.post("notes/flag", {
        id: postId,
      })

      getPosts();

    } catch (err) {
      throw err
    }

  }
    const handleUpdateSubmit = async (e) => {
        e.preventDefault()

        const id = e.target.id.split('-')[1]
        const postId = e.target.getAttribute("data-id")
        const data = document.getElementById("content-" + id).innerText;

        try {

            const res = await mainAxios.post("notes/update", {
                id: postId,
                content: data
            })

            getPosts();

        } catch (err) {
            throw err
        }

    }
    const getUsers = async () => {
        try {
            const res = await mainAxios.post("users/category", {
                group: DB_CATEGORY
            })

            if (res.data.users.length > 0) {
                setUserCount(res.data.users[0]["COUNT(*)"]);

            }

        } catch (err) {
            throw err
        }
    }
    const getPosts = async () => {
        try {
            const res = await mainAxios.post("notes/category", {
                category: DB_CATEGORY
            })

            if (res.data.notes.length > 0) {
                setPosts(res.data.notes);

            } else {
                setPosts([]);
            }

        } catch (err) {
            throw err
        }

    }

    useEffect(() => {
        getUsers();
        getPosts();
    }, [])

    return (

        <div>

            <div className="container forum-container">
                <div className="banner-user banner-forum">
                    <div className="banner-content">
                        <div className="media">
                            <div className="media-body">
                                <h3 className="item-title">{CATEGORY}</h3>
                                <div className="item-subtitle">{TAGLINE}</div>

                                <ul className="user-meta">
                                    <li>
                                        Group Type: <span>Public</span>
                                    </li>
                                    <li>
                                        Posts: <span>
                                            {
                                                countPosts.length
                                            }
                                        </span>
                                    </li>
                                    <li>
                                        Members: <span>{userCount}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block-box user-top-header">
                    <ul className="menu-list">
                        <li className="active">
                            <Link to="/">
                                <a href="/#">Home</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="mchats col-md-10 mx-auto">
                    <div >
                        {userId &&
                            <form >

                                <div className="block-box post-input-tab forum-post-input">
                                    <div className="media">
                                        <div className="item-img">
                                            <img

                                                src={userAvatar}

                                                alt="img"
                                                style={{
                                                    width: "70px",
                                                    height: "70px",
                                                    bordeRadius: "50%",
                                                }}
                                            />
                                        </div>
                                        <div className="media-body">

                                            <textarea
                                                onChange={handleChange}
                                                name="content"
                                                id="content"
                                                className="form-control"
                                                placeholder="Share what are you thinking here . . ."
                                                cols="30"
                                                rows="4"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="post-footer">
                                        <div className="insert-btn">
                                            <span></span>
                                        </div>
                                        <div className="submit-btn">

                                            <a onClick={handleSubmit} href="#!" type="submit">Post Comment</a>


                                        </div>
                                    </div>
                                </div>
                            </form>
                        }

                        <div
                            className="modal fade"
                            id="exampleModal"
                            tabIndex={-1}
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">
                                            Confirm delete
                                        </h5>
                                        <button
                                            type="button"
                                            className="close"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                        >
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">Are you sure you want to delete?</div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-dismiss="modal"
                                        >
                                            Cancel
                                        </button>
                                        <button data-id={toDelete} onClick={handleDeleteSubmit} className="btn btn-primary" data-dismiss="modal">
                                            Delete
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {


                            posts && posts.map((post, index) => {
                                const show = {
                                    display: 'block'
                                }
                                const { title, flagged, parent, author_name, content, id, author_id, avatar, createdAt } = post;

                                return (
                                    parent === '0' &&
                                    <div key={index} className="block-box post-view">
                                        <div className="post-header">
                                            <div className="media">
                                                <div className="user-img">
                                                    <img
                                                        src={avatar}
                                                        alt="avatar"
                                                        style={{
                                                            width: "70px",
                                                            height: "70px",
                                                            bordeRadius: "50%",
                                                        }}
                                                    />
                                                </div>
                                                <div className="media-body ">
                                                    <div className="user-title">
                                                        <a href="/#">{author_name}</a>
                                                        <i className="icofont-check"></i>
                                                    </div>
                                                    <ul className="entry-meta">
                                                        <li className="meta-privacy">
                                                            <i className="icofont-world"></i> Public
                                                        </li>
                                                        <li className="meta-time">{moment(createdAt).calendar()}</li>
                                                    </ul>
                                                </div>
                                            </div>




                                            <div className="dropdown">
                                                <button id={'toggle-' + index}
                                                    className="dropdown-toggle"
                                                    type="button"
                                                    data-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    ...
                                                </button>
                                                <div id={'menu-' + index} className="dropdown-menu dropdown-menu-right" >

                                                    <a id={'reply-' + index} className="dropdown-item dropdown-reply" data-id={id}>
                                                        Reply
                                                    </a>

                                                    {author_id === userId &&
                                                        <>
                                                            <a id={'edit-' + index} className="dropdown-item dropdown-edit" data-id={id}>
                                                                Edit
                                                            </a>
                                                            <a id={'delete-' + index} onClick={handleDeleteChange} className="dropdown-item" data-id={id} data-toggle="modal" data-target="#exampleModal">
                                                                Delete
                                                            </a>
                                                        </>
                                                    }


                                                </div>
                                            </div>
                                        </div>
                                        <div className="post-body">
                                            <div className="post-no-thumbnail" id={'content-' + index} >

                                                {content}

                                            </div>

                                            <button onClick={handleUpdateSubmit} style={{ display: "none" }} id={'save-' + index} className="btn btn-success float-right col-md-1 save-edit" data-id={id}>
                                                Save
                                            </button>
                                            <div id={"editor-" + index} className="editor">
                                                <textarea id={"edit_textara-" + index} className="edit-textarea">

                                                </textarea>
                                                <button onClick={handleReplySubmit} id={'reply-' + index} className="btn btn-success float-right col-md-1 save-edit" data-id={id}>
                                                    Reply
                                                </button>
                                            </div>
                                            {flagged && <a onClick={handleFlagSubmit} id={'flag-' + index} className="float-right col-md-1 save-flag flagged" data-id={id}>
                                                Flagged
                                            </a>
                                            }

                                            {
                                                !flagged && <a onClick={handleFlagSubmit} id={'flag-' + index} className="float-right col-md-1 save-flag" data-id={id}>
                                                    Flag <i class="icofont-flag-alt-1"></i>
                                                </a>
                                            }
                                            < Reply id={id} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DepressedPage;
