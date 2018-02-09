


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
// import * as prolistConstants from '../../components/L_detail/L_detailConstants.js'

// export default function prolistReducer(state = {}, action){
//     let newState = JSON.parse(JSON.stringify(state));
//     console.log(action.type)
//     switch(action.type){
//         case (ajaxConstants.AJAX_REQUESTING || prolistConstants.ADDCART_RQUESTING):
//             newState.status = 0;
//             break;
//         case ajaxConstants.AJAX_REQUESTED:
//             newState.status = 1;
//             newState.response = action.response;
//             break;
//         case (ajaxConstants.AJAX_REQUESTERROR || prolistConstants.ADDCART_RQUESTERROR):
//             newState.status = -1;
//             newState.response = action.response;
//             break;
//         case prolistConstants.ADDCART_RQUESTED:
//             newState.status = 1;
//             break;
//     }
//     return newState;
// }