import { Layout } from "antd"
import { Header } from "antd/es/layout/layout"
import styles from './FormLayout.module.scss'

type props = {
    children: JSX.Element | JSX.Element[]
};

const FormLayout = ({ children }: props) => {
    return <Layout className={styles.Layout}>
        <Header className={styles.Header}>Тестовое задание Ануфриева Алексея</Header>
        <>
            {children}
        </>
    </Layout>
}

export { FormLayout }