import request from '../utils/request';

export const getMineData = () => request.get('/api/users/self');