import React from 'react'
import { Link } from 'react-router-dom'


const DiscussionTable = () => {
    return (
        <div className='table col-md-8 mx-auto'>
            <div className="forum-list-table">
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Forum</th>
                                <th scope="col">Views</th>
                                <th scope="col">Discussions</th>
                                <th scope="col">Mentors</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="media item-forum">
                                        <div className="item-img">
                                            <a href="forums-timeline.html"><img src="https://static.vecteezy.com/system/resources/previews/003/597/520/original/depressed-woman-sitting-with-her-head-down-free-vector.jpg" alt='man' style={{width: '100px',height: '100px',bordeRadius: '50%' }}/></a>
                                        </div>
                                        <div className="media-body">
                                            <h3 className="item-title"><Link to="/forums/depression" >My depression</Link></h3>
                                   
                                            
                                            <p>Depression is a common mental disorder. Globally, it is estimated that 5% of
                                                 adults suffer from the disorder. <span style={{color: '#615dfa'}} >Come let us discuss</span> </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center">04</td>
                                <td className="text-center">05</td>
                                <td>
                                    <div className="media forum-member">
                                        <div className="item-img">
                                            <a href="user-timeline.html">
                                                <img src="https://youzify.cera-theme.com/wp-content/uploads/avatars/109/1655817446-bpfull.jpg" alt='' style={{width: '150px',height: '150px',bordeRadius: '50%' }} />
                                            </a>
                                        </div>
                                        <div className="media-body">
                                            <h3 className="item-title"><a href="/forums/addiction">Fahim Rahman</a></h3>
                                            <div className="item-time">1 month ago</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="media item-forum">
                                        <div className="item-img">
                                            <a href="forums-timeline.html">
                                                <img src="https://w7.pngwing.com/pngs/625/728/png-transparent-addiction-drug-substance-abuse-prevention-substance-dependence-drugs-text-trademark-logo.png" alt='' style={{width: '70px',height: '70px',bordeRadius: '50%' }}/>
                                            </a>
                                        </div>
                                        <div className="media-body">
                                            <h3 className="item-title"><a href="/forums/addiction">Drug Addiction</a></h3>
                                            <p>A high percentage of people all over the world suffer drug addiction. It is a great concern for us to guide you out of this life threatening challenge. <span style={{color: '#615dfa'}} >Zen always listens to you</span></p>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center">02</td>
                                <td className="text-center">01</td>
                                <td>
                                    <div className="media forum-member">
                                        <div className="item-img">
                                            <a href="user-timeline.html">
                                                <img src='https://youzify.cera-theme.com/wp-content/uploads/avatars/16/61029d7306ee2-bpfull.jpg' alt="" style={{width: '150px',height: '150px',bordeRadius: '50%' }} />
   
                                            </a>
                                        </div>
                                        <div className="media-body">
                                            <h3 className="item-title"><a href="user-timeline.html">Aahat Akther</a></h3>
                                            <div className="item-time">1 month ago</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="media item-forum">
                                        <div className="item-img">
                                            <a href="forums-timeline.html">
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBh7T0bDGoZigjHId8oAG8f9lnqaGbHbIkdg&usqp=CAU" alt='' style={{width: '70px',height: '70px',bordeRadius: '50%' }}/>
                                            </a>
                                        </div>
                                        <div className="media-body">
                                            <h3 className="item-title"><a href="/forums/abuse">Sexual Abuse</a></h3>
                                            <p>Most victims of sexual violence are women – a fact that reflects their social stance even today, in the 21st century, as inferior to men. Sexual violence is another means of oppressing women in a patriarchal society. <span style={{color: '#615dfa'}} >Speak up, Zen listens</span></p>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center">01</td>
                                <td className="text-center">02</td>
                                <td>
                                    <div className="media forum-member">
                                        <div className="item-img">
                                            <a href="user-timeline.html">
                                                <img src="https://youzify.cera-theme.com/wp-content/uploads/avatars/15/61029d5963ce6-bpfull.jpg" alt=''style={{width: '150px',height: '150px',bordeRadius: '50%' }} />
                                            </a>
                                        </div>
                                        <div className="media-body">
                                            <h3 className="item-title"><a href="user-timeline.html">Zinia Jisa</a></h3>
                                            <div className="item-time">1 month ago</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DiscussionTable