import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../Context/User.context";
const passwordregex = /^[A-Z][0-9a-zA-Z]{5,25}$/;

export default function Login() {
  const [errorMsg, setErrorMsg] = useState(null);
  const { token, setToken } = useContext(userContext);
  let id;
  let navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("email is not valid"),
    password: Yup.string()
      .required("password is required")
      .matches(passwordregex, "password should start with cap letter"),
  });

  async function sendData(values) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };

      toast.loading("Waiting...");
      const { data } = await axios.request(options);
      console.log(data);

      toast.dismiss(id);
      toast.success("User successfully Logged In");

      setTimeout(() => {
        if (data.message == "success") {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/");
        }
      }, 2000);
    } catch (error) {
      toast.dismiss(id);
      toast.error(error.response.data.message);
      console.log(error);
      setErrorMsg(error.response.data.message);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: validationSchema,

    onSubmit: sendData,
  });

  return (
    <>
      <section className="w-5/6 mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-4">
          <i className="fa-regular fa-circle-user me-3"></i>
          <span>Login Now :</span>
        </h2>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control w-full"
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="text-red-600 font-semibold mt-2">
                * {formik.errors.email}
              </div>
            ) : (
              ""
            )}
            {errorMsg ? (
              <div className="text-red-600 font-semibold mt-2">
                * {errorMsg}
              </div>
            ) : (
              ""
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control w-full"
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="text-red-600 font-semibold mt-2">
                * {formik.errors.password}
              </div>
            ) : (
              ""
            )}
          </div>

          <button type="submit" className="btn-primary w-full rounded-md">
            Login
          </button>
        </form>
      </section>
    </>
  );
}
