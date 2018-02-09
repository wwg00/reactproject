export default function dataGridReducer(state = {}, action){
    var newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case 'dataGridbeforeRequest':
            newState.status = 0;
            newState.loading = action.loading;  
            break;
        case 'dataGridRequested':
            newState.status = 1;
            newState.type = action.type;
            newState.response = action.response.data;
            newState.loading = action.loading;
            break;
        case 'dataGridRequestedError':
            newState.status = -1;
            newState.error = action.error;
            break;
    } 
    return newState;
}