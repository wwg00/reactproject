
export default function mineReducer(state = {}, action){
    let newState = JSON.parse(JSON.stringify(state));
    // console.log(action)
    switch(action.type){
        case 'mineuserRequesting':
            newState.status = 0;
            break;
        case 'mineuserRequested':
            newState.status = 1;
            newState.response = action.response;
            console.log(action.response);
            break;
        case 'requestError':
            newState.status = -1;
            newState.response = action.response;
            break;
    }
    return newState;
}