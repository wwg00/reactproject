
export default function setsiteReducer(state = {}, action){
    let newState = JSON.parse(JSON.stringify(state));
    return newState;
    
}