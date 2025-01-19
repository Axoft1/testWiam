import { IForm, IFormState } from "./interfaces";

type FormAction =
    | { type: 'addFormState', payload: IForm }

export const FormReducer = (state: IFormState, action: FormAction): IFormState => {
    switch (action.type) {
        case 'addFormState':
            return {
                ...state,
                forms: { ...state.forms, ...action.payload }
            }
        default:
            return state

    }
}
