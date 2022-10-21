import React, {useState} from 'react';
import {sendMail} from "./helper/Mail"
 const Mail =()=>{
    const [values, setValues] = useState({
        userEmail:"",
        message:"",
        status:false
    })
    const {userEmail, message, status} =values;
    const handleChange = event=>{;
        const {value, name} = event.target
        setValues({...values, [name]:value})
        // console.log(values); 
    }
    const handleSubmit=event=>{
        event.preventDefault();
        console.log("values email", userEmail);
        console.log("values message", message);
        sendMail({userEmail, message}).then(data=>{
            if(data.err){
                console.log("err ", data.err)
            }else{
                console.log("success", data);
                setValues({...values, status:true})
            }
        }).catch(console.log("error in sending mail"))
    }
    return(
        <>
        <h1>welcome to send mail</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Enter Email:
                <input type="text" placeholder='enter your email' name="userEmail" value={values.userEmail} onChange={handleChange}/>
            </label><br/><br/>
            <label>
                Message:
                <input type="text" placeholder='enter your email' name="message" value={values.message} onChange={handleChange}/>
            </label><br/><br/>
            <button type='submit'>sendmail</button>
        </form>
        {
            status ? <div><h1>message sent successful</h1></div>:<div></div>
        }
        </>
    )
}
export default Mail