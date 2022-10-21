import React, { useState } from "react";
import $ from "jquery";

const FileUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleDelete = () => {
        document.getElementById("image-upload").value = "";
        setSelectedImage(null)
    }

    const handleChange = (e) => {
        setSelectedImage(e.target.files[0]);
    }
    return (
        <div>

            {selectedImage && (
                <div class="col-md-6 ">
                    <img alt="image" style={{ borderRadius: '10%', width: '300px', height: '300px' }} src={URL.createObjectURL(selectedImage)} />
                    <br />
                    <a onClick={handleDelete}>Remove</a>
                </div>
            )}

            <input className="select-inputs my-3"
                type="file"
                name="file"
                id="image-upload"
                onChange={handleChange}
            />
        </div>
    );
};

export default FileUpload;