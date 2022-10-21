
import React, { useState} from "react";
import { mainAxios } from './Axios';

function Report() {

    const userId = localStorage.getItem("user");
    const userName = localStorage.getItem("userName");
    const userAvatar = localStorage.getItem("userAvatar");

    const [newPost, setNewPost] = useState([]);

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setNewPost({ ...newPost, [name]: value });
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
                category: 'REPORT',
                flagged: 'reported'
            });


        } catch (err) {
            throw err
        }
    };

    return (
        <div className="mchats my-4 col-md-10 mx-auto">
            <div >

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
                                    placeholder="Share your report in detail here . . ."
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
            </div>
        </div>
    );
}

export default Report;
