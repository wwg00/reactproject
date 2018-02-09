 import * as mainConstants from '../../constants/mainConstants'

export default function prolistReducer(state = {}, action){
    let newState = JSON.parse(JSON.stringify(state));

    switch(action.type){

        case 'yp_beforeRequest':
            newState.status = 0;
            console.log(12123213213213);
            break;
        case 'yp_requested':
            newState.status = 1;
            newState.cartList = action.response;
            let  arr = {};
            arr['all'] = false;
            for(let item in action.response){
                    arr[action.response[item].id] = false;
            }
            newState.selected =  arr;

            break;
        case 'yp_setUserID':
            newState.userID=action.user_id.id;
        break;    
        case 'yp_selectGoods':
       
            if(!action.params.id){
               for(let item  in newState.selected){
                   if(!newState.selected['all']){
                    newState.selected[item] = true;

                   }else{
                    newState.selected[item] = false;
                       
                   }
               }
            }else{
                newState.selected[action.params.id] =  !newState.selected[action.params.id];          
                let key = false;
                for(let item  in newState.selected){
                    if(item != 'all'){
                      if(newState.selected[item] == true){
                        key = true;
                      }else{
                        key = false;
                        break;
                      }
 
                    }
                }



              
                    newState.selected['all'] = key;
        
              

            }
        
            if(action.params._false){
                console.log(action);
                for(let item  in newState.selected){
                 
                     newState.selected[item] = false;
                }
            }
        
                    // arr[action.response[item].id] = false;
      
    

            break;   
            case 'yp_changeEdit':
               newState.changeEdit =  !newState.changeEdit;
              
            
            break;  

            case 'yp_setCartGoodsQty':
             console.log(action.response)
            
            break;
            case 'yp_changePages':
            console.log(action.value)
            if(action.value===0){
                newState.orderDetailsShow = action.value;
            }else{
                newState.orderDetailsShow = !newState.orderDetailsShow;
            }
        
           
           break;
           case 'yp_getUserAddress':
            
             newState.UserAddress = action.response;
           
           break;


    }
    return newState;
}
