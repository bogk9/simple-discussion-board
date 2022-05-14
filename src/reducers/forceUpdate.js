const initialState = {forceUpdate: false}

export default function (state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case 'UPDATE':
            return{
                ...state,
                forceUpdate: !state.forceUpdate
            }
        default:
            return state;
    }
}