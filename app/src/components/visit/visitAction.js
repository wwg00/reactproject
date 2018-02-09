// 在这暴露一个函数供component中调用,

export function getuser(_id){
    console.log(_id)
    return {
        types:['getuserRequesting','getuserRequested'],
        url: 'wgetuser',
        params:{id:_id}
    }
}
export function getgood(_id){
    return {
        types:['getgoodRequesting','getgoodRequested'],
        url:'getMyGoods',
        params:{id:_id}
    }
}