


export default function L_detailReducer(state = {}, action){
    let newState = JSON.parse(JSON.stringify(state));
    // console.log(action)
    switch(action.type){
        case ('beforeRequest1'||'beforeRequest0'):
            newState.status = 0;
            break;
        case 'Requested1':
            newState.status = 1;
            newState.response = action.response;
            break;
        case ('requestError1'||'beforeRequest0'):
            newState.status = -1;
            newState.response = action.response;
            break;  
            case 'Requested0':
            newState.status = -1;
            break;
    }
    return newState;
}


