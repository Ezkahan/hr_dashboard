import { Formik, Field, Form, FormikHelpers } from 'formik'
import { useTranslation } from 'react-i18next'
import { IoKeyOutline, IoPersonOutline } from "react-icons/io5"
import { useMutation } from '@apollo/client'
import { _LOGIN } from '../../graphql/mutations/Auth/LoginMutation'
import { ILogin } from '../../common/interfaces/User/ILogin'
import { setUserData } from '../../common/helpers/User/setUserData'
import { Navigate, useNavigate } from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast'

const Login: React.FC = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const token = localStorage.getItem('orlan_token');
    
    const [login, {data}] = useMutation(_LOGIN, {
        // onCompleted: () => navigate('/'),
        onError: () => toast.error('Email or password invalid', {duration: 2000})
    })

    return (
        <section className="flex items-center justify-center h-screen bg-slate-50 font-montserrat-medium">
            {
                token ? <Navigate to="/" /> : ""
            }
            <Toaster />
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
                            type="text"
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
                            type="password"
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