import { Button, Flex, Form, Input, Select } from "antd"
import { FC, useContext } from "react"
import MaskedInput from "antd-mask-input";
import { useValidateForm } from "../../hooks/useValidateForm";
import { Paths } from "../../types/routesTypes";
import { useNavigate } from "react-router";
import { FormContext } from "../../context/FormContext/FormContext";
import { FormLayout } from "../../shared/FormLayout/FormLayout";
import styles from './PersonalInformation.module.scss'

const genderOptions = [
    { value: 'man', label: <span>Мужской</span> },
    { value: 'women', label: <span>Женский</span> },
]

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
    gender?: string
    lastName?: string
    name?: string
    tel?: string
}

const PersonalInformation: FC = () => {

    const [form] = Form.useForm();
    const { submittable } = useValidateForm(form)
    const { formState, addForm } = useContext(FormContext)
    const { forms } = formState
    const navigate = useNavigate();

    const nextForm = (value: FormProps) => {
        navigate(Paths.addresPlaceWork)
        addForm(value)
    }

    return <FormLayout >
        <Form<FormProps>
            form={form}
            {...formItemLayout}
            initialValues={{
                tel: forms?.tel,
                name: forms?.name,
                lastName: forms?.lastName,
                gender: forms?.gender,
            }}
            onFinish={nextForm}
        >
            <Form.Item

                required
                name='tel'
                label='Телефон'
                rules={[
                    { required: true, message: 'Обязательно для заполнения' },
                ]}
            >
                <MaskedInput addonBefore='0' mask={"000 000 000"} />
            </Form.Item>
            <Form.Item
                name='name'
                label='Имя'
                rules={[
                    { required: true, message: 'Обязательно для заполнения' },
                    { max: 20, message: 'Допустимо только 20 символов' },
                ]}
            >
                <Input placeholder="имя" />
            </Form.Item>
            <Form.Item
                name='lastName'
                label='Фамилия'
                rules={[
                    { required: true, message: 'Обязательно для заполнения' },
                    { max: 20, message: 'Допустимо только 20 символов' },
                ]}
            >
                <Input placeholder="фамилия" />
            </Form.Item>
            <Form.Item rules={[
                { required: true, message: 'Обязательно для заполнения' },
            ]} name={'gender'} label='Пол'>
                <Select options={genderOptions} />
            </Form.Item>

            <Form.Item colon={false} label={<></>}   >
                <div className={styles.submitButton}>
                    <Button htmlType="submit" type="primary" >
                        Далее
                    </Button>
                </div>
            </Form.Item>

        </Form>
    </FormLayout>
}

export default PersonalInformation