
import request from '../utils/request';
export const getDetail = (id) => request.get('/api/detail/?id='+id)