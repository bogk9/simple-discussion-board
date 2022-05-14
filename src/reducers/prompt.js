const initialState = {openLoginPrompt: false, openThreadCreator: false}

export default function (state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case 'TOGGLE_LOGIN_PROMPT':
            return{
                ...state,
                openLoginPrompt: payload
            }
        case 'TOGGLE_THREAD_PROMPT':
            return{
                ...state,
                openThreadCreator: payload,
            }
        default:
            return state;
    }
}