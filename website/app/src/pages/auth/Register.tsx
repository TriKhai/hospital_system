// import React, { useState } from "react";

// export default function Register() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Register with:", { username, password });
//     // TODO: gọi API backend để tạo tài khoản
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-3xl mb-4">Đăng ký</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//         <input
//           type="text"
//           placeholder="Tên đăng nhập"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="border px-3 py-2 rounded"
//         />
//         <input
//           type="password"
//           placeholder="Mật khẩu"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border px-3 py-2 rounded"
//         />
//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }

import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { registerApi } from "../../services/authApi";
// import { register } from "../../services/authApi";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Bắt buộc nhập tên tài khoản"),
  password: Yup.string()
    .min(8, "Mật khẩu ít nhất 8 ký tự")
    .required("Bắt buộc nhập mật khẩu"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
});

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white border border-[#ccc] rounded-md p-6 shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>

        <Formik
          initialValues={{
            username: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={async (values, actions) => {
            try {
              const { username, password } = values;

              const res = await registerApi({ username, password });

              if (res) {
                alert("Đăng ký thành công! Vui lòng đăng nhập.");
                navigate("/login");
              } else {
                alert("Đăng ký thất bại!");
              }
            } catch (err) {
              alert("Có lỗi xảy ra khi đăng ký.");
              console.error(err);
            } finally {
              actions.setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="username" className="block font-medium mb-1">
                  {/* <FontAwesomeIcon icon={faUser} className="mr-2 w-5 h-5" /> */}
                  Tên đăng nhập
                </label>
                <Field
                  id="username"
                  name="username"
                  type="text"
                  className="w-full border px-3 py-2 rounded"
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
                  name="password"
                  type="password"
                  className="w-full border px-3 py-2 rounded"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block font-medium mb-1"
                >
                  {/* <FontAwesomeIcon icon={faLock} className="mr-2 w-5 h-5" /> */}
                  Nhập lại mật khẩu
                </label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="w-full border px-3 py-2 rounded"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#12B0C2] text-white w-full py-2 rounded hover:bg-[#0E8DA1] transition"
              >
                {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
              </button>

              <div className="text-center mt-4">
                <span className="text-gray-600 text-sm">Đã có tài khoản? </span>
                <NavLink
                  to="/login"
                  className="text-[#12B0C2] hover:underline font-medium text-sm"
                >
                  Đăng nhập
                </NavLink>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};