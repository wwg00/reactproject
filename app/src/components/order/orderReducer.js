 import * as mainConstants from '../../constants/mainConstants'

export default function prolistReducer(state = {}, action){
    let newState = JSON.parse(JSON.stringify(state));

    switch(action.type){

        case 'yp_getCartList':
    
            newState.userOrder = action.response;


            break;

    }
    return newState;
}
