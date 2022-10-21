import React, { useState } from "react";
import Sortable from "sortablejs";
import { useNavigate } from "react-router-dom";
import { mainAxios } from "./Axios";
import './Setup.css';
import FileUpload from './FileUpload' // import File


const url = process.env.CLOUDINARY_URL;
const preset = process.env.UPLOAD_PRESET;

const Setup = () => {

    const nav = useNavigate();
    const [details, setDetails] = useState({ document: "licence", id: "#" });
    const [forums, setForums] = useState([]);
    const [uploadUrl, setUploadUrl] = useState("")
    const [err, setErr] = useState("");
    const [userType, setUserType] = useState("mentee");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "forums" && !forums.includes(value)) {
            setForums([...forums, value]);
        }
    };


    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setDetails({ ...details, [name]: value });
    };

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", preset);

            fetch(url, {
                method: "POST",
                body: formData
            }) 
            .then(response => response.json())
            .then(data => {
                    if (data.secure_url !== '') {
                        setUploadUrl(data.secure_url);
                    }
                })
                .catch(err => console.error(err))

                console.log(uploadUrl)

            const res = await mainAxios.post("users/update", {
                id: localStorage.getItem("user").toString(),
                groups: forums.join(","),
                avatar: uploadUrl ? uploadUrl : localStorage.getItem("userAvatar"),
                type: userType,
                id_doc_type: details.document,
                id_doc_number: details.id,
                id_doc_path: "path",
                update_route: "setup"
            });
            if (res.data.inserted === 1) {
                localStorage.setItem("userGroups", forums.join(","));
                nav("/dashboard");
            }
        } catch (err) {
            if (typeof err.response.data.Error !== 'undefined') {
                setErr(err.response.data?.Error);
            } else {
                setErr(err.response.data?.msg);
            }
        }

    }
    return (

        <>

            <div className="container">

                <div className="row">
                    <form className="container setup-form" onSubmit={handleSubmit} enctype="multipart/form-data">
                        <div className="col-md-6 mx-auto">
                            <div className="card">
                                <h2 className="card-header">Join a Community</h2>

                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        Depression
                                        <label className="switch ">
                                            <div class="switch_box box_1">
                                                <input onChange={handleChange} name="forums" value="DEPRESSION" type="checkbox" class="switch_1" />
                                            </div>
                                        </label>

                                    </li>
                                    <li className="list-group-item">
                                        Addiction
                                        <label className="switch ">
                                            <div class="switch_box box_1">
                                                <input onChange={handleChange} name="forums" value="ADDICTION" type="checkbox" class="switch_1" />
                                            </div>
                                        </label>
                                    </li>
                                    <li className="list-group-item">
                                        Abuse
                                        <label className="switch ">
                                            <div class="switch_box box_1">
                                                <input onChange={handleChange} name="forums" value="ABUSE" type="checkbox" class="switch_1" />
                                            </div>
                                        </label>
                                    </li>
                                    <li className="list-group-item">
                                        Anxiety
                                        <label className="switch ">
                                            <div class="switch_box box_1">
                                                <input onChange={handleChange} name="forums" value="ANXIETY" type="checkbox" class="switch_1" />
                                            </div>
                                        </label>
                                    </li>
                                    <li className="list-group-item">
                                        Bipolar Disorder
                                        <label className="switch ">
                                            <div class="switch_box box_1">
                                                <input onChange={handleChange} name="forums" value="BIPOLAR_DISORDER" type="checkbox" class="switch_1" />
                                            </div>
                                        </label>
                                    </li>
                                    <li className="list-group-item">
                                        Others
                                        <label className="switch ">
                                            <div class="switch_box box_1">
                                                <input onChange={handleChange} name="forums" value="OTHERS" type="checkbox" class="switch_1" />
                                            </div>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 mx-auto">
                            <div className="card">
                                <h2 className="card-header">Some more about you...</h2>
                                <div className="card-body">
                                    <label for="file_upload" class="mt-2">Upload your profile picture:</label>
                                    <FileUpload type="file" name="file_upload[]" id="file_upload" />

                                    <div className="type-selection">
                                        <label for="user_type" class="mt-2">Select user type:</label>

                                        <select onChange={handleUserTypeChange} className="setup-inputs" name="user_type" id="user_type">
                                            <option value="mentee">Mentee</option>
                                            <option value="mentor">Mentor</option>
                                        </select>

                                        {userType === "mentor" &&
                                            <>
                                                <label for="document" className="mt-2">Select ID type:</label>
                                                <select required="true" onChange={handleSelectChange} className="setup-inputs" name="document" id="document">
                                                    <option value="" selected disabled="true">Select ID Document</option>
                                                    <option value="licence">Drivers Licence</option>
                                                    <option value="passport">International Passport</option>
                                                    <option value="other">Other</option>
                                                </select>

                                                <label for="id" class="mt-2">Enter ID number:</label>
                                                <input required="true" onChange={handleSelectChange} className="setup-inputs" name="id" id="id" type="text" placeholder="Please enter your ID number" />
                                            </>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" name="login-btn" class="mt-4 d-block mx-auto submit-btn" value="Submit" />
                                    </div>
                                    <h5 class="text-center">{err}</h5>
                                </div>
                            </div>

                        </div>


                    </form>
                </div>


            </div>
        </>

    );
}

export default Setup;
