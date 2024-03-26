import { useEffect } from 'react';
import GetAdminDataHandler, { getLocalUserData } from '@/handler/api';

function AuthHandler() {
    useEffect(() => {
        let data = getLocalUserData;
        let user = data.current
        let user_id = user._id
        // let data = JSON.parse(localStorage.getItem('auth'))
        GetAdminDataHandler({ user_id }).then((res) => {
            console.log({ user_id: res.result });
            if (res.result) {
                data.current = res.result
                localStorage.setItem('auth', JSON.stringify(data));
            }


            console.log({ data });
        }).catch((err) => {
            console.error({ err });
        })
    }, [])
    return null
}

export default AuthHandler