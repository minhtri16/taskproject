import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values: LoginFormValues) => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (
      storedUser.email === values.email &&
      storedUser.password === values.password
    ) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/Home");
      window.location.reload();
    } else {
      alert("Email or password was not accurate!");
    }

    // console.log(values, "values");
    // console.log(storedUser, "storedUser");
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen w-screen flex justify-center items-center">
    <div className=" p-6  bg-white max-w-md mx-auto rounded shadow">
      <div className="">
      <h1 style={{fontSize:"30px"}} className=" text-center font-bold mb-4 text-gray-500">Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="mb-4">
              <label className="block text-sm">Email</label>
              <Field
                name="email"
                type="email"
                className="border rounded w-full p-2"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm">Password</label>
              <Field
                name="password"
                type="password"
                className="border rounded w-full p-2"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex justify-center">
            <button
            style={{borderRadius:"10px"}}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded "
            >
              Login
            </button>
            </div>
            <div className="mt-4 text-center">
              <Link to="/register" className="text-black hover:text-blue-300 underline">
                Don't have an account? Register here
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
   </div>
  </div>
  );
};

export default Login;
