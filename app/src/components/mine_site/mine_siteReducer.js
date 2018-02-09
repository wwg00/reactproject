
export default function minesiteReducer(state = {}, action){
    let newState = JSON.parse(JSON.stringify(state));
    newState.params=action.params;
    return newState;
    
}