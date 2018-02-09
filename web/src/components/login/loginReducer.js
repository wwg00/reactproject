export default function loginReducer(_state={}, action){
    var newState = JSON.parse(JSON.stringify(_state));
    switch(action.type){
        case 'loginbeforeRequest':
            newState.status = 0;
            newState.type = action.type;
            newState.loading = action.loading;
            break;
        case 'loginRequested':
            newState.status = 1;
            newState.type = action.type;
            newState.loading = action.loading;    
            newState.response = action.response
            break;
        case 'loginRequestedError':
            newState.status = -1;
            newState.error = action.error;
            break;            
    }
    return newState;

}