const ListReducer = (state=[],action) =>{
    switch(action.type){
        case "ADD_TO_LIST":
            return([...state,action.payload]);
        case "REMOVE_FROM_LIST":
            state = state.filter(data=> data.id!==action.payload);
            return [...state];
        default:
            return state;
    }

}

export default ListReducer;