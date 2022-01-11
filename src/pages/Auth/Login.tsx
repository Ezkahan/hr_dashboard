import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { IoKeyOutline, IoPersonOutline } from "react-icons/io5";
import { gql, useMutation } from '@apollo/client'

interface ILogin {
    email: string;
    password: string;
}

interface IUserData {
    id: number;
    name: string;
    email: string;
    token: string;
}

const Login: React.FC = () => {
    const {t} = useTranslation()

    const _LOGIN = gql`
        mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
                id
                name
                email
                token
            }
        }
    `

    const setUserData = (data: IUserData) => {
        localStorage.setItem('orlan_token', data.token);
    }

    const [login, {data, loading, error}] = useMutation(_LOGIN)

    return (
            <section className="flex items-center justify-center h-screen bg-slate-50 font-montserrat-medium">
                
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={(values: ILogin, { setSubmitting }: FormikHelpers<ILogin>) => {
                    setTimeout(() => {
                        login({variables: {email: values.email, password: values.password}})
                        setSubmitting(false);
                    }, 500);
                }}
            >
                <Form className="flex flex-col bg-white w-96 rounded-xl shadow-lg shadow-slate-200 px-10 py-16">

                    {
                        data && data.login && setUserData(data.login)
                    }

                    <div className="flex items-center group-focus:border-slate-600 border border-slate-200/50 rounded-xl overflow-hidden mb-5">
                        <label htmlFor="email" className="text-slate-500 pl-4 pr-1.5">
                            <IoPersonOutline size={20} />
                        </label>
                        <Field
                            className="w-full focus:outline-none group placeholder:text-slate-400 p-3"
                            id="email"
                            name="email"
                            placeholder={t('username')}
                        />
                    </div>

                    <div className="flex items-center border border-slate-200/50 rounded-xl overflow-hidden mb-5">
                        <label htmlFor="password" className="text-slate-500 pl-4 pr-1.5">
                            <IoKeyOutline size={20} />
                        </label>
                        <Field
                            className="w-full focus:outline-none placeholder:text-slate-400 p-3"
                            id="password"
                            name="password"
                            placeholder={t('password')}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-bold rounded-lg focus:outline-none px-6 py-3"
                    >
                        {t('signin')}
                    </button>
                </Form>
            </Formik>
            </section>
    )
}

export default Login