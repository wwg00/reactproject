

export function getUserOrder(_id){
    console.log(_id)
    return {
        handle:'yp',
        url:'getUserOrder',
        params:{
            user_id:_id
        }
    }


}

export function updateOrderState(_id,_state){
    console.log(_id)
    return {
        handle:'yp',
        url:'updateOrderState',
        params:{
            id:_id,
            state:_state
        }
    }

}

export function deleteOrder(_id){
    console.log(_id)
    return {
        handle:'yp',
        url:'deleteOrder',
        params:{
            order_id:_id,
        }
    }

}
