// 在这暴露一个函数供component中调用,
export function getCommentsData(_url,_params){
    return {
        types:['beforeRequest','Requested','requestError'],
        url:'getComment',
        params:{page:2}
    }
}