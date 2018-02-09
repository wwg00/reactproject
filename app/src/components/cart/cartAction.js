




export function getCartListData(_id){
        return {
            handle:'yp',
            url:'getCartList',
            params:{
                id:_id
            }
        }

}

export function selectGoods(_id,__false){
  
    return {
        type:'yp_selectGoods',
        params:{
            id:_id,
            _false:__false
        }
    }

}


export function setChangeEdit(){
    return {
        type:'yp_changeEdit',
 
    }

}


export  function setCartGoodsQty(_id,_user_id,_goods_id,_qty){
    console.log(_id,_user_id,_goods_id,_qty);
    return {
            url:'setGoodsQty',
            handle:'yp', 
        params:{ 
         id:_id,          
         user_id:_user_id,
         goods_id:_goods_id,
         qty:_qty
        } 
    }
}


export  function deleteCartGoods(_id){
    return {
            url:'deleteCartGoods',
            handle:'yp', 
        params:{ 
         id:_id,          
   
        } 
    }
}



export  function changePages(_value){
    return {
        type:'yp_changePages',
        value:_value

    }
}


export function getUserAddress(_id){
    return {
        url:'getUserAddress',
        handle:'yp', 
    params:{ 
     user_id:_id,          

    } 
 }
}

export function createOrder(userID,g_json,qty,_methods,_state){
return {
        url:'createOrder',
        handle:'yp', 
    params:{ 
     user_id:userID,
     goods_json:   g_json,
     total:qty,
     method:_methods,
     state:_state       

    } 
 }    
}



