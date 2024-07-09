"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import AuthLayout from "../layout";
import { logIn } from "@/store/slices/authSlice";
import { useRegisterMutation, loginFetcher } from "@/services/http/auth";
import Skeleton from "react-loading-skeleton";

const GoogleSocialLogin = dynamic(() => import("@/components/auth/login/google"), {
  ssr: false,
  loading: () => <Skeleton width="100%" height={50} />,
});

const schema = yup
  .object()
  .shape({
    email: yup.string().required("O email é obrigatório").email("O email deve ser um email válido"),
    password: yup.string().required("A senha é obrigatória").min(8, "A senha deve conter pelo menos 8 caracteres"),
    username: yup.string().required("O nome de usuario e obrigatorio"),
  })
  .required();

const SignIn = () => {
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState(false);
  const [credential, setCredential] = useState(undefined);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const { mutate, data } = useRegisterMutation();

  if (data && "data" in data) {
    if (data.data.message === "User already exists") {
      loginFetcher({
        provider: "Google",
        email: "email@email.com",
        token: credential,
      })
        .then((response) => {
          const { data } = response;

          window.localStorage.setItem("token", data.token);

          dispatch(
            logIn({
              token: data.token,
              user: { user: data.user },
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const onGoogleLogin = (data) => {
    setCredential(data.credential);
    mutate({
      provider: "Google",
      token: data.credential,
    });
  };

  const onLoginError = (error) => {
    console.log(error);
  };

  const onSubmit = async (data) => mutate(data.email, data.password);

  return (
    <AuthLayout bgImage="bg_image--9">
      <div className="axil-signin-form">
        <h3 className="title">Sign in to eTrade.</h3>
        <p className="b2 mb--55">Enter your detail below</p>
        <form className="singin-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Nome de usuario</label>
            <Controller
              control={control}
              name="username"
              render={({ field }) => <input {...field} autoComplete="username" type="text" className="form-control" />}
            />
            {errors.username && <p className="error text-danger">{errors.username.message}</p>}
          </div>

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
          {loginError && <p className="error text-danger">User and Password doesn&apos;t match</p>}
        </form>
        <div className="row">
          <GoogleSocialLogin onLogin={onGoogleLogin} onerror={onLoginError} />
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
