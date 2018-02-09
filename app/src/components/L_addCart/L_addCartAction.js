// 在这暴露一个函数供component中调用,

export function insertCart(_id,option,uid){
    return {

        types:['beforeRequest','Requested','requestError'],
        url: 'insertCart',
        method: 'post',
        params:{
          
            goods_id:_id,
            user_id:uid,
            qty:1,
            option:option
           
        }
      
    }
}