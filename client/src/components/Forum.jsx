import { Link } from "react-router-dom";
import { mainAxios } from "./Axios";
import React, { useState, useEffect } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaRocketchat, FaRegThumbsUp } from "react-icons/fa";

const Forum = () => {
  const [notes, setNotes] = useState([]);
  const [err, setErr] = useState("");

  const getData = async () => {
    try {
      const res = await mainAxios.get("notes/all");
      setNotes(res.data.notes);
    } catch (err) {
      console.log(err);

      if (err.response.data.Error) {
        setErr(err.response.data.Error);
      } else {
        setErr(err.response.data.msg);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // getAllNotes()

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          <div className="row text-left my-5">
            <div className="col-lg-6 mb-3 mb-sm-0">
              <div
                className="dropdown bootstrap-select form-control form-control-lg bg-white bg-op-9 text-sm w-lg-50"
                style={{ width: "100%" }}
              >
                <select
                  className="form-control form-control-lg bg-white bg-op-9 text-sm w-lg-50"
                  data-toggle="select"
                  tabindex="-98"
                >
                  <option> Categories</option>
                  <option> Learn</option>
                  <option> Share</option>
                  <option> Build</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6 text-lg-right">
              <div
                className="dropdown bootstrap-select form-control form-control-lg bg-white bg-op-9 ml-auto text-sm w-lg-50"
                style={{ width: "100%" }}
              >
                {" "}
                <select
                  className="form-control form-control-lg bg-white bg-op-9 ml-auto text-sm w-lg-50"
                  data-toggle="select"
                  tabindex="-98"
                >
                  <option> Filter by</option>
                  <option> Votes</option>
                  <option> Replys</option>
                  <option> Views</option>{" "}
                </select>
              </div>
            </div>
          </div>
          {notes.map((note, index) => {
            return (
              <>
                <div className="community-post style-two kbDoc richard bug">
                  <div className="post-content">
                    <div className="author-avatar">
                      <img
                        src="https://html.spiderthemes-demos.com/kbdoc/kbdoc-html/img/home_support/cp2.jpg"
                        alt="community post"
                      />
                    </div>
                    <div className="entry-content">
                      <h3 className="post-title">
                        <a href="forum-single.html">{note.title}</a>
                      </h3>
                      <ul className="meta">
                        <li>
                          <img
                            src="https://html.spiderthemes-demos.com/kbdoc/kbdoc-html/img/home_support/cmm1.png"
                            alt="cmm"
                          />
                          {note.category}
                        </li>
                        <li>
                          <AiOutlineCalendar /> updated 3 days ago
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="post-meta-wrapper">
                    <ul className="post-meta-info">
                      <li>
                        <FaRocketchat /> 20{" "}
                      </li>
                      <li>
                        <FaRegThumbsUp /> 5{" "}
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            );
          })}

          <div className="col-lg-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
