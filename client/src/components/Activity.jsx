import React from "react";
import './Activity.css';

const Activity = () => {
    return (
        <>
            <div className="whats-new-form-content d-flex">

                <div id="whats-new-avatar" className="d-none d-md-flex align-self-start">

                    <a href="https://intranet.cera-theme.com/members/demo/">
                        <img loading="lazy" src="https://intranet.cera-theme.com/wp-content/uploads/avatars/109/1655817446-bpthumb.jpg" className="avatar user-109-avatar avatar-300 photo" width="300" height="300" alt="/"/>
                        </a>

                </div>

                <div className="media-body">


                    <div id="whats-new-content" className="active">

                        <div id="whats-new-textarea" className="active" style={{position: 'relative'}}>
                            <textarea className="bp-suggestions" name="whats-new" id="whats-new" cols="50" rows="10" placeholder="What's new, John?" style={{height: '3.8em'}}></textarea>
                        </div>

                        <div id="whats-new-options" className="element-animated fade-in short" 
                        style={{opacity: '1', display: 'block'}}><div className="rtmedia-plupload-container rtmedia-container clearfix">
                            <div id="rtmedia-action-update" className="clearfix">
                                <div className="rtm-upload-button-wrapper"><div id="rtmedia-whts-new-upload-container" style={{ position: 'relative' }}>

                                <div id="html5_1gblptd8a168kmrs12albqp1iqh3_container" className="moxie-shim moxie-shim-html5" 
                                style={{position: 'absolute', 'top': '0px', left: '0px',width: '37px', height: '37px', 'overflow': 'hidden'}}>
                                    <input id="html5_1gblptd8a168kmrs12albqp1iqh3" type="file" 
                                    style={{fontSize: '999px', opacity: '0', position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%'}} multiple="" accept="image/jpeg,.jpg,.jpeg,image/png,.png,image/gif,.gif,video/mp4,.mp4,audio/mpeg,.mp3" />
                                </div>

                            </div>
                            <button type="button" className="rtmedia-add-media-button" id="rtmedia-add-media-button-post-update" title="" data-original-title="Attach Media" style={{position: 'relative'}}>
                                <span className="dashicons dashicons-admin-media"></span></button>
                            </div>
                            <select id="rtSelectPrivacy" name="privacy" className="rtm-form-select privacy"><option value="60">Private</option><option value="40">Friends</option><option value="20">Logged in Users</option><option value="0" selected="selected">Public</option></select></div></div>


                        <div id="whats-new-post-in-box">
                            <select id="whats-new-post-in" name="whats-new-post-in">
                                <option selected="selected" value="0">My Profile</option>


                                <option value="513">Join the community of people who truly understands your plight </option>


                                <option value="499">You can also turn your story around</option>


                                <option value="502">Experience true freedom</option>


                            </select>
                        </div>
                        <input type="hidden" id="whats-new-post-object" name="whats-new-post-object" value="groups" />


                        <div id="whats-new-submit">
                            <input type="submit" name="aw-whats-new-submit" id="aw-whats-new-submit" className="mr-0" value="Post Update" />
                        </div>

                        <div className="clear"></div>



                        <div className="rtmedia-container rtmedia-uploader-div" style={{ opacity: '1', display: 'block', visibility: 'visible' }}>

                            <div className="rtmedia-uploader no-js">
                                <div id="rtmedia-uploader-form">

                                    <div className="rtm-tab-content-wrapper">
                                        <div id="rtm-file_upload-ui" className="rtm-tab-content">
                                            <div className="rtmedia-plupload-notice"><ul className="plupload_filelist_content ui-sortable rtm-plupload-list clearfix" id="rtmedia_uploader_filelist"></ul></div>
                                            <input type="hidden" name="mode" value="file_upload" />					</div>
                                    </div>


                                    <input type="hidden" name="rtmedia_upload_nonce" value="581bba236d" />

                                    <input type="submit" id="rtMedia-start-upload" name="rtmedia-upload" value="Upload" style={{display: 'none'}}/>

                                </div>
                            </div>
                        </div></div>

                    <input type="hidden" id="rt_upload_hf_activity" value="1" name="activity" />

                </div>

            </div>

        </div>
        </>
    );
};

export default Activity;
