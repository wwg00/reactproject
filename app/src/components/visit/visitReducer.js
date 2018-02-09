
export default function mineReducer(state = {}, action){
    let newState = JSON.parse(JSON.stringify(state));
    // console.log(action)
    switch(action.type){
        case ('getuserRequesting'||'getgoodRequesting'):
            newState.status = 0;
            break;
        case 'getuserRequested':
            newState.status = 1;
            newState.response = action.response;
            break;
        case 'requestError':
            newState.status = -1;
            newState.response = action.response;
            break;
        case 'getgoodRequested' :
         console.log(newState.response);
            break;
    }
    return newState;
}