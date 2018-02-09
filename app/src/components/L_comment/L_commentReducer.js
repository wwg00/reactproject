// 在这里处理middleware中的任务,再返回给component

export default function commentReducer(state={},action){
    // console.log(newState)
    var newState = JSON.parse(JSON.stringify(state));
    // console.log(action)
    switch(action.type){
        case 'beforeRequest':
            newState.status = 0;
            break;
        case 'Requested':
            newState.status = 1;
            newState.res = action.response;
            break;
        case 'equestError':
            newState.status = -1;
            newState.error = action.error;
            break;

    }
    return newState;
}