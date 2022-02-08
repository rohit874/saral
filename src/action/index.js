export const AddToList = (data) =>{
    return({
        type:"ADD_TO_LIST",
        payload:data
    })
} 

export const RemoveFromList = (data) =>{
    return({
        type:"REMOVE_FROM_LIST",
        payload:data
    })
} 