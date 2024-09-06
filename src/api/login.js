import request from '../utils/request';

export const UserLogin=(account,password)=>request(
    {
        url:'/api/sessions/account',
        method:'POST',
        data:{
            account,
            password
        }

    }
)