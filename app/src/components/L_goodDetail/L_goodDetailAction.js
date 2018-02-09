// 在这暴露一个函数供component中调用,

export function getDtail(_id){
    return {
        types:['beforeRequest1','Requested1','requestError1'],
        url: 'getGoodsInfo',
        params:{id:_id}
    }
}