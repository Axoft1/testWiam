import React from "react";
import { IFormState, IForm } from "./interfaces";

export type FormContextProps = {
    formState: IFormState
    addForm: (value: IForm) => void
    addCategoryList: (value: string[]) => void
    categoryList: string[]
}
export const FormContext = React.createContext<FormContextProps>({} as FormContextProps)