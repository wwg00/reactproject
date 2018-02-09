


export default function L_detailReducer(state = {}, action){
    let newState = JSON.parse(JSON.stringify(state));
    // console.log(action)
    switch(action.type){
        case 'beforeRequest1':
            newState.status = 0;
            break;
        case 'Requested1':
            newState.status = 1;
            newState.response = action.response;
            break;
        case 'requestError1':
            newState.status = -1;
            newState.response = action.response;
            break;
    }
    return newState;
}

// import * as ajaxConstants from '../../constants/ajaxConstants.js'

// export default function(state = {}, action){
//     let newState = JSON.parse(JSON.stringify(state));
//     switch(action.type){
//         case ajaxConstants.AJAX_REQUESTING:
//             newState.status = 0;
//             break;
//         case ajaxConstants.AJAX_REQUESTED:
//             newState.status = 1;
//             newState.response = action.response;
//             break;
//         case ajaxConstants.AJAX_REQUESTERROR:
//             newState.status = -1;
//             newState.response = action.response;
//             break;
//     }
//     return newState;
// }