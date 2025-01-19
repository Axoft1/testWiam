export interface IFormState {
    forms: IForm
    pending: number
    completed: number
    categoryList: string[]
}

export interface IForm {
    tel?: string
    name?: string
    lastName?: string
    gender?: string
    addres?: string
    work?: string
    summ?: number,
    day?: number
}