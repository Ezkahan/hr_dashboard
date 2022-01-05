import AppLayout from "../../layouts/AppLayout"
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { IoKeyOutline, IoPersonOutline } from "react-icons/io5";

interface ILogin {
    username: string;
    password: string;
  }

const Login: React.FC = () => {
    return (
            <section className="flex items-center justify-center h-screen bg-slate-50">
            <Formik
                initialValues={{
                username: '',
                password: '',
                }}
                onSubmit={(values: ILogin, { setSubmitting }: FormikHelpers<ILogin>) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 500);
                }}
            >
                <Form className="flex flex-col bg-white xl:w-3/12 rounded-xl shadow-lg shadow-slate-200 px-10 py-16">
                    <div className="flex items-center group-focus:border-slate-600 border border-slate-200 rounded-xl overflow-hidden mb-5">
                        <label htmlFor="username" className="text-slate-500 pl-4 pr-1.5">
                            <IoPersonOutline size={20} />
                        </label>
                        <Field
                            className="w-full focus:outline-none group placeholder:text-slate-400 p-3"
                            id="username"
                            name="username"
                            placeholder="Name"
                        />
                    </div>

                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden mb-5">
                        <label htmlFor="password" className="text-slate-500 pl-4 pr-1.5">
                            <IoKeyOutline size={20} />
                        </label>
                        <Field
                            className="w-full focus:outline-none placeholder:text-slate-400 p-3"
                            id="password"
                            name="password"
                            placeholder="Password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-bold rounded-lg focus:outline-none px-6 py-3"
                    >
                        Sign in
                    </button>
                </Form>
            </Formik>
            </section>
    )
}

export default Login