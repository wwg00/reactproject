// 在这暴露一个函数供component中调用,
export function ygetGoodsInfo(_params){
    return {
        types:['beforeRequest','Requested','requestError'],
        url:'ygetGoodsInfo',
        params:_params
    }
}
export function ysale(_params){
    return {
        types:['beforeRequest','Requested','requestError'],
        url:'ysale',
        params:_params
    }
}
export function ypriceU(_params){
    return {
        types:['beforeRequest','Requested','requestError'],
        url:'ypriceU',
        params:_params
    }
}
export function ypriceD(_params){
    return {
        types:['beforeRequest','Requested','requestError'],
        url:'ypriceD',
        params:_params
    }
}
export function shaixuan(_params){
    return {
        types:['beforeRequest','Requested','requestError'],
        url:'shaixuan',
        params:_params
    }
}