// 在这暴露一个函数供component中调用,

export function getDtail(_id){
    return {
        types:['beforeRequest1','Requested1','requestError1'],
        url: 'getGoodsInfo',
        params:{id:_id}
    }
}

export function iu(nUser,goodsId){
    return {
        types:['beforeRequest0','Requested0','requestError0'],
        url: 'history',
        params:{
            user_id:nUser,
            goods_id:goodsId
        },
    }
}