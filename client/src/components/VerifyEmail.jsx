import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { mainAxios } from './Axios'

function VerifyEmail() {
    const nav = useNavigate();
    const { token } = useParams();
    const [verifiedUser, setVerifiedUser] = useState(false);

    useEffect(() => {  
        
        const verify = async () => {
            try {
                const res = await mainAxios.get(`users/verify/${token}`);

                if(res.data.status === 1) {
                    nav('/verified')
                }else{
                    nav('/verifyfail')
                }

            } catch (err) {
                throw err
            }
        }
        verify()
    }, [])

}

export default VerifyEmail
