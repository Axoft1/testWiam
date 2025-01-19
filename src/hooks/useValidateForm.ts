import { Form, FormInstance } from "antd";
import { useEffect, useState } from "react";

export const useValidateForm = (form: FormInstance<any>) => {
    const [submittable, setSubmittable] = useState<boolean>(true);
    const values = Form.useWatch([], form)

    useEffect(() => {
        const timeout = setTimeout(() => {
            form
                .validateFields({ validateOnly: true })
                .then(() => { setSubmittable(false) })
                .catch(() => { setSubmittable(true) });
        }, 0)
        return () => clearTimeout(timeout)
    }, [form, values])

    return { submittable }
}