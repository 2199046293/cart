import request from '../utils/request';
export const getSubCategories = (id) => request.get('/api/tab/'+id)