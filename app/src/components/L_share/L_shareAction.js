// 在这暴露一个函数供component中调用,
export function getDate(_url,_params){
    return {
        types:['beforeRequest','requested','requestError'],
        url:'getUserOrderA',
        params:{phoneNum:545}
    }
}