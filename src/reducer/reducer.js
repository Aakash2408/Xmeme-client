export const initialState = []
export const reducer = (state=initialState, action)=>{
    if(action.type=='SET'){
        return action.payload
    }else{
        return state
    }
}