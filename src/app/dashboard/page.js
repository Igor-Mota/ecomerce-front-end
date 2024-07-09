"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { redirect } from "next/navigation";

const Dashboard = () => {
  const authInfo = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { userData } = authInfo;

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  useEffect(() => {
    if (!authInfo.login) {
      redirect("/");
    }
  }, [userData]);

  return (
    <div className="axil-dashboard-overview">
      <div className="welcome-text">
        Hello{" "}
        {userData.user && userData.user.userName ? userData.user.userName : ""}{" "}
        <br /> (você não e o(a)
        <span>
          {userData.user && userData.user.userName
            ? userData.user.userName
            : ""}
          ?
        </span>
        <Link href="#" onClick={handleLogout}>
          Log Out
        </Link>
        )
      </div>
      <p>
        From your account dashboard you can view your recent orders, manage your
        shipping and billing addresses, and edit your password and account
        details.
      </p>
    </div>
  );
};

export default Dashboard;
