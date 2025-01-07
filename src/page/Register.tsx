import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

interface RegisterFormValues {
  email: string;
  password: string;
  name: string;
  hometown: string;
}

const Register = () => {
  const navigate = useNavigate();

  const initialValues: RegisterFormValues = {
    email: "",
    password: "",
    name: "",
    hometown: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters")
      .required("Password is required"),
    name: Yup.string()
      .min(5, "Name must be at least 5 characters")
      .max(100, "Name must be at most 100 characters")
      .required("Name is required"),
    hometown: Yup.string()
      .min(5, "Hometown must be at least 5 characters")
      .max(100, "Hometown must be at most 100 characters")
      .required("Hometown is required"),
  });

  const handleSubmit = (values: RegisterFormValues) => {
    // Save user data and authentication status in localStorage
    localStorage.setItem("user", JSON.stringify(values));
    localStorage.setItem("isAuthenticated", "true");
    navigate("/home");
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 via-blue-300 to-blue-600 h-screen w-screen flex justify-center items-center">
    <div className="p-6 bg-white rounded shadow w-[800px]">
      <h1 className="text-5xl font-bold mb-4 text-center">Register</h1>
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
            <div className="mb-4">
              <label className="block text-sm">Name</label>
              <Field name="name" className="border rounded w-full p-2" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm">Hometown</label>
              <Field name="hometown" className="border rounded w-full p-2" />
              <ErrorMessage
                name="hometown"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Register
            </button>
          </div>
          </Form>
        )}
      </Formik>
    </div>
    </div>
  );
};

export default Register;
