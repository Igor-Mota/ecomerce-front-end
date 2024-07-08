"use client";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/services/http/client";
import { useState } from "react";
const schema = yup.object({});

const AccountDetails = () => {
  const { userData } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [isLoad, setIsLoad] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: userData.user && userData.user.name ? userData.user.userName : "",
    },
  });

  const userInfoHandler = async (data) => {
    setIsLoad(true);
    const response = await updateUser(data);
    if (response.userName) {
      setValue("username", response.userName);
      dispatch(
        login({
          token: userData.token,
          user: {
            ...userData.user,
            userName: response.userName,
          },
        })
      );
    }
    setIsLoad(false);
  };

  return (
    <div className="axil-dashboard-account">
      <form className="account-details-form" onSubmit={handleSubmit(userInfoHandler)}>
        <div className="row">
          <div className="col-lg-6">
            <div className="form-group">
              <label>First Name</label>
              <Controller
                name="username"
                control={control}
                render={({ field }) => {
                  return (
                    <input {...field} type="text" defaultValue={userData.user.userName} className="form-control" />
                  );
                }}
              />
              {errors.firstName && <p className="error">First Name is required.</p>}
            </div>
          </div>
          {userData.user && userData.user.provider === "Default" && (
            <div className="col-12">
              <h5 className="title">Password Change</h5>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" defaultValue={1201112131415} />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input type="password" className="form-control" />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input type="password" className="form-control" />
              </div>
            </div>
          )}
          <div className="form-group mb--0">
            {!isLoad && (
              <button type="submit" className=" btn btn-primary axil-btn">
                Salvar
              </button>
            )}
            {isLoad && (
              <button type="submit" className=" btn btn-primary axil-btn">
                <div class="spinner-border text-light" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;
