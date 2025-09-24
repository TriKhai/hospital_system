import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../context/useAuth";
import { jwtDecode } from "jwt-decode";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Bắt buộc nhập tên tài khoản"),
  password: Yup.string()
    .min(8, "Mật khẩu ít nhất 8 ký tự")
    .required("Bắt buộc nhập mật khẩu"),
});

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // useEffect(() => {
  //   console.log("uuuser: ", user)
  //   if (!user) return;
  //   if (user.role === "PATIENT") navigate("/about");
  //   else if (user.role === "DOCTOR") navigate("/doctor");
  //   else if (user.role === "ADMIN") navigate("/admin");
  // }, [user]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white border border-[#ccc] rounded-md p-6 shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>

        <Formik 
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
           onSubmit={async (values, actions) => {
            const success = await login(values);
            actions.setSubmitting(false);

            if (!success) {
              alert("Sai tài khoản hoặc mật khẩu");
              return;
            }

            alert("Đăng nhập thành công!");

            // Lấy role từ token thay vì user state
            const token = localStorage.getItem("token");
            if (!token) return;

            const decoded = jwtDecode<{ sub: string; scope: string }>(token);

            if (decoded.scope === "PATIENT") navigate("/");
            else if (decoded.scope === "DOCTOR") navigate("/doctor");
            else if (decoded.scope === "ADMIN") navigate("/admin");
            else navigate("/");
          }}

        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="email" className="block font-medium mb-1">
                  {/* <FontAwesomeIcon icon={faUser} className="mr-2 w-5 h-5" /> */}
                  Tên đăng nhập
                </label>
                <Field
                  id="username"
                  type="text"
                  name="username"
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label htmlFor="password" className="block font-medium mb-1">
                  {/* <FontAwesomeIcon icon={faLock} className="mr-2 w-5 h-5" /> */}
                  Mật khẩu
                </label>
                <Field
                  id="password"
                  type="password"
                  name="password"
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#12B0C2] text-white w-full py-2 rounded hover:bg-[#0E8DA1] transition"
              >
                {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
              </button>

              <div className="text-center mt-4">
                <span className="text-gray-600 text-sm">
                  Chưa có tài khoản?{" "}
                </span>
                <NavLink
                  to="/register"
                  className="text-[#12B0C2] hover:underline font-medium text-sm"
                >
                  Đăng ký ngay
                </NavLink>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
