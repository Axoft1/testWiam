import { Button, Flex, Form, Input, InputNumber, InputNumberProps, message, Modal, Select, Slider, SliderSingleProps } from "antd"
import { FC, useContext, useState } from "react"
import MaskedInput from "antd-mask-input";
import { useValidateForm } from "../../hooks/useValidateForm";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../types/routesTypes";
import { FormContext } from "../../context/FormContext/FormContext";
import { FormLayout } from "../../shared/FormLayout/FormLayout";
import styles from './LoanParameters.module.scss'

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



const marksSumm: SliderSingleProps['marks'] = {
    200: '200$',
    300: '300$',
    400: '400$',
    500: '500$',
    600: '600$',
    700: '700$',
    800: '800$',
    900: '900$',
    1000: '1000$',
};

const marksDay: SliderSingleProps['marks'] = Object.fromEntries(Array.from({ length: 21 }, (_, i) => [i + 10, i + 10]));

function sklonenie(number?: number, txt?: string[]) {
    if (!number || !txt) {
        return ''
    }
    return number === 1000 ? txt[1] : txt[0]
}


type FormProps = {
    summ?: number,
    day?: number
}

const LoanParameters: FC = () => {

    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const [form] = Form.useForm();
    const { submittable, } = useValidateForm(form)
    const navigate = useNavigate();
    const { formState, addForm } = useContext(FormContext)
    const { forms } = formState


    const nextForm = (value: FormProps) => {
        if (forms.name && forms.lastName)
            addProducts({ title: forms.name + ' ' + forms.lastName })
        else
            message.warning('Заполните пожалуйста все поля предыдущих форм')
        addForm(value)
    }
    const prevForm = () => {
        const value = form.getFieldsValue()
        navigate(Paths.addresPlaceWork)
        addForm(value)
    }

    const addProducts = (value: { title: string }) => {
        try {
            setLoading(true)
            setOpen(true)
            fetch('https://dummyjson.com/products/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(value)
            })
                .then(res => {
                    if (!res.ok) {
                        // обработка ошибки
                    }
                    return res.json()
                })
                .then((res: { id: number }) => {
                    if (res.id) {
                        // обработка ответа
                    }
                    else {
                        // обработка ошибки
                    }
                    setLoading(false)
                })
                .catch(err => {
                    // обработка ошибки
                    setLoading(false)
                    console.log(err);

                })
        } catch (err: any) {
            // обработка ошибки
            setLoading(false)
            console.log(err);

        }
    }


    return <FormLayout>
        <Form<FormProps>
            form={form}
            {...formItemLayout}
            initialValues={{
                summ: forms?.summ,
                day: forms?.day
            }}
            onFinish={nextForm}
        >
            <Form.Item
                rules={[
                    { required: true, message: 'Обязательно для заполнения' },
                ]}
                name={'summ'}
                label='выбора суммы займа'>
                <Slider marks={marksSumm} min={200} max={1000} step={100} />

            </Form.Item>

            <Form.Item
                rules={[
                    { required: true, message: 'Обязательно для заполнения' },
                ]}
                name={'day'}
                label='выбора срока займа'>
                <Slider min={10} max={30} step={1} marks={marksDay} />
            </Form.Item>

            <Form.Item colon={false} label={<></>}   >
                <div className={styles.submitButton}>

                    <Button onClick={prevForm} >
                        Назад
                    </Button>
                    <Button type="primary" htmlType="submit" >
                        Подать заявку
                    </Button>
                </div>
            </Form.Item>

        </Form>

        <Modal
            title={<p>Поздравляем {forms.name} {forms.lastName}</p>}
            loading={loading}
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
        >
            <p>Вам {sklonenie(forms.summ, ['одобрено', 'одобрена'])} {forms.summ}$ на {forms.day} дней.</p>
        </Modal>

    </FormLayout>
}

export default LoanParameters