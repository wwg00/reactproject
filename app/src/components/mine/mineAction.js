// 在这暴露一个函数供component中调用,

export function getuser(_id){
    return {
        types:['mineuserRequesting','mineuserRequested'],
        url: 'wgetuser',
        params:{id:_id}
    }
}