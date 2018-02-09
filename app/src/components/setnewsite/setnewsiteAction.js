// 在这暴露一个函数供component中调用,

export function setsite(_params){
    return {
        type:'setsite',
        params:_params
    }
}