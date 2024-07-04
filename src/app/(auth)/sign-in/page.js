"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import AuthLayout from "../layout";
import { LoginSocialGoogle } from "reactjs-social-login";
import { logIn } from "@/store/slices/authSlice";
import { loginMutation } from "@/services/http/auth";

const schema = yup
  .object()
  .shape({
    email: yup.string().required("O email é obrigatório").email("O email deve ser um email válido"),
    password: yup.string().required("A senha é obrigatória").min(8, "A senha deve conter pelo menos 8 caracteres"),
  })
  .required();

const SignIn = () => {
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate, data } = loginMutation();
  console.log(data);
  if (data && "token" in data) {
    const { token, ...rest } = data;
    dispatch(
      logIn({
        token: token,
        user: rest,
      })
    );
  }

  const onSubmit = async (data) => mutate(data.email, data.password);

  return (
    <AuthLayout bgImage="bg_image--9">
      <div className="axil-signin-form">
        <h3 className="title">Sign in to eTrade.</h3>
        <p className="b2 mb--55">Enter your detail below</p>
        <form className="singin-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Email</label>
            <Controller
              control={control}
              name="email"
              render={({ field }) => <input {...field} type="email" className="form-control" />}
            />
            {errors.email && <p className="error text-danger">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <label>Senha</label>
            <Controller
              control={control}
              name="password"
              render={({ field }) => <input {...field} type="password" className="form-control" />}
            />
            {errors.password && <p className="error text-danger">{errors.password.message}</p>}
          </div>
          <div className="form-group d-flex align-items-center justify-content-between">
            <button type="submit" className="axil-btn btn-bg-primary submit-btn">
              Entrar
            </button>
            <Link href="/forgot-password" className="forgot-btn">
              Esqueci minha senha
            </Link>
          </div>
          <div className="d-flex flex-column flex-md-row">
            <LoginSocialGoogle />
          </div>
          {loginError && <p className="error text-danger">User and Password doesn&apos;t match</p>}
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
