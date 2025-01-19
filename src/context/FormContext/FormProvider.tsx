import { useReducer, useState } from "react"
import { FormContext } from "./FormContext"
import { IForm, IFormState } from "./interfaces"
import { FormReducer } from "./FormReducer"

interface props {
    children: JSX.Element | JSX.Element[]
}

const FormState: IFormState = {
    forms: {
        name: "",
        tel: "",
        lastName: "",
        gender: "",
        day: 10,
        summ: 200,
    },
    categoryList: [],
    pending: 0,
    completed: 0
}
export const FormProvider = ({ children }: props) => {
    const [formState, dispatch] = useReducer(FormReducer, FormState)
    const [categoryList, setCategoryList] = useState<string[]>([])
    const addForm = (value: IForm) => {
        dispatch({ type: 'addFormState', payload: value })
    }

    const addCategoryList = (value: string[]) => {
        setCategoryList(value)
        // FormState.categoryList = value
    }
    return (
        <FormContext.Provider value={{ formState, addForm, addCategoryList, categoryList }}>
            {children}
        </FormContext.Provider>
    )
}