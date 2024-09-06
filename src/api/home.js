import request from '../utils/request'

/**
 * 查询首页数据
 */
export const getHomeData = () => request.get('/api/tab/1')

export const getFeedsData=(start=0)=>request({
    url: '/api/tab/1/feeds',
    method: 'GET',
    params: {
        start
    }
})

// const getHomeData = () => {
//   return request.get('/api/tab/1')
// }

// const getHomeData = () => request({
//   url: '/api/tab/1',
// })
//秒杀商品
export const getSpikeGoods = () => request.get('/api/home/spike')