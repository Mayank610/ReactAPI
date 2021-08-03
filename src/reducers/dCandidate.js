import { ACTION_TYPE } from "../actions/dCandidate";

const initState = {
    list: []
}

export const dCandidate = (state=initState,action ) => {

    switch(action.type){
        case ACTION_TYPE.FETCH_ALL:
            return{
                ...state,
                list: [...action.payload]
            }

        default:
            return state;
    }
}