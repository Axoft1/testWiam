import { Button, Flex, Form, Input, message, Select } from "antd"
import { FC, useContext, useEffect } from "react"
import { useValidateForm } from "../../hooks/useValidateForm";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../types/routesTypes";
import { FormContext } from "../../context/FormContext/FormContext";
import { FormLayout } from "../../shared/FormLayout/FormLayout";
import styles from './AddresPlaceWork.module.scss'

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
    },
};


type FormProps = {
    addres: string
    work: string
}

const LoanParameters: FC = () => {

    const [form] = Form.useForm<FormProps>();
    const { submittable } = useValidateForm(form)
    const navigate = useNavigate();
    const { formState, categoryList, addCategoryList, addForm } = useContext(FormContext)
    const { forms } = formState

    const nextForm = (value: FormProps) => {
        navigate(Paths.loanParameters)
        addForm({ addres: value.addres, work: value.work })
    }

    const prevForm = () => {
        const value = form.getFieldsValue()
        navigate(Paths.personalInformation)
        addForm({ addres: value.addres, work: value.work })
    }
    const getCategoryList = () => {
        try {
            fetch('https://dummyjson.com/products/category-list')
                .then(res => {
                    if (!res.ok) {
                        // обработка ошибки
                    }
                    return res.json()
                })
                .then((res: string[]) => {
                    if (res instanceof Array)
                        addCategoryList(res)
                    else {
                        // обработка ошибки
                        message.error('Ошибка')
                    }
                })
                .catch(err => {
                    // обработка ошибки
                    message.error('Ошибка')
                    console.log(err);

                })
        } catch (err: any) {
            // обработка ошибки
            message.error('Ошибка')
            console.log(err);

        }
    }

    useEffect(() => {
        !categoryList.length && getCategoryList()
    }, [])

    return <FormLayout>
        <Form<FormProps>
            form={form}
            onFinish={nextForm}
            {...formItemLayout}
            initialValues={{
                work: forms?.work,
                addres: forms?.addres
            }}
        >

            <Form.Item required label='Место работы' name='work'>
                <Select placeholder='выбирите место работы' options={categoryList?.map(el => ({ value: el, label: el }))} />
            </Form.Item>

            <Form.Item
                rules={[
                    { required: true, message: 'Обязательно для заполнения' },
                    { max: 20, message: 'Допустимо только 20 символов' },
                ]} name='addres' label='Адрес проживания'>
                <Input placeholder="адрес проживания" />
            </Form.Item>

            <Form.Item colon={false} label={<></>}   >
                <div className={styles.submitButton}>

                    <Button onClick={prevForm} >
                        Назад
                    </Button>
                    <Button type="primary" htmlType="submit" >
                        Далее
                    </Button>
                </div>
            </Form.Item>

        </Form>
    </FormLayout>
}

export default LoanParameters