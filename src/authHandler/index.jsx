import { useEffect } from 'react';
import GetAdminDataHandler, { getLocalUserData } from '@/handler/api';

function AuthHandler() {
    useEffect(() => {
        let data = getLocalUserData;
        let user = data.current
        let token = data.token
        let user_id = user._id
        GetAdminDataHandler({ token, user_id }).then((res) => {
            if (res.result) {
                data.current = res.result
                localStorage.setItem('auth', JSON.stringify(data));
            }
        }).catch((err) => {
            console.error({ err });
        })
    }, [])
    return null
}

export default AuthHandler