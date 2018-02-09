// 在这里处理middleware中的任务,再返回给component

export default function LoginReducer(state={},action){
    var newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case 'beforeRequest':
            newState.status = 0;
            break;
        case 'Requested':
            newState.status = 1;
            newState.res = action.response;
            break;
        case 'requestError':
            newState.status = -1;
            newState.error = action.error;
            break;

    }
    return newState;
}