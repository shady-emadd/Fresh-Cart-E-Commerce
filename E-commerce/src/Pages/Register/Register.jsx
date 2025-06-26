import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const phoneregex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const passwordregex = /^[A-Z][0-9a-zA-Z]{5,25}$/;

export default function Register() {
  const [errorMsg, setErrorMsg] = useState(null);

  let id;
  let navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "at least 3 characters")
      .max(15, "at most 15 characters"),
    email: Yup.string()
      .required("email is required")
      .email("email is not valid"),
    password: Yup.string()
      .required("password is required")
      .matches(passwordregex, "password should start with cap letter"),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "pass and re-pass are not valid"),
    phone: Yup.string()
      .required("phone is required")
      .matches(phoneregex, "phone number is not valid"),
  });

  async function sendData(values) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };

      toast.loading("Waiting...");
      const { data } = await axios.request(options);
      console.log(data);

      toast.dismiss(id);
      toast.success("User successfully created");

      setTimeout(() => {
        if (data.message == "success") {
          navigate("/auth/login");
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
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },

    validationSchema: validationSchema,

    onSubmit: sendData,
  });

  return (
    <>
      <section className="w-5/6 mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-4">
          <i className="fa-regular fa-circle-user me-3"></i>
          <span>Register Now :</span>
        </h2>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Username"
              name="name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control w-full"
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="text-red-600 font-semibold mt-2">
                * {formik.errors.name}
              </div>
            ) : (
              ""
            )}
          </div>

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

          <div>
            <input
              type="password"
              placeholder="RePassword"
              name="rePassword"
              id="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control w-full"
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="text-red-600 font-semibold mt-2">
                * {formik.errors.rePassword}
              </div>
            ) : (
              ""
            )}
          </div>

          <div>
            <input
              type="number"
              placeholder="Phone"
              name="phone"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control w-full"
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div className="text-red-600 font-semibold mt-2">
                * {formik.errors.phone}
              </div>
            ) : (
              ""
            )}
          </div>

          <button type="submit" className="btn-primary w-full rounded-md">
            Register
          </button>
        </form>
      </section>
    </>
  );
}
