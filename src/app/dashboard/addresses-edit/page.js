"use client";
import Link from "next/link";
import { UserLists } from "@/data/Users";
import { useSelector } from "react-redux";

const UserAddress = () => {
  const userAddress = UserLists[0];

  const { userData } = useSelector((state) => state.auth);

  console.log("Aqui:", userData);

  return (
    <div className="axil-dashboard-address">
      <p className="notice-text">The following addresses will be used on the checkout page by default.</p>
      <div className="row row--30">
        <div className="col-lg-6">
          <div className="address-info mb--40">
            <div className="addrss-header d-flex align-items-center justify-content-between">
              <h4 className="title mb-0">Shipping Address</h4>
              <Link href="/dashboard/addresses-edit/shipping" className="address-edit">
                {userData.shippingAddress && <i className="far fa-edit" />}
                {!userData.shippingAddress && <i className="far fa-plus" />}
              </Link>
            </div>
            <ul className="address-details">
              {userData.shippingAddress && (
                <>
                  <li>Name: {userData.shippingAddress.name}</li>
                  <li>Email: {userData.shippingAddress.email}</li>
                  <li>Phone: {userData.shippingAddress.phone}</li>
                  <li className="mt--30">
                    {userData.shippingAddress.street} <br />
                    {`${userData.shippingAddress.state}, ${userData.shippingAddress.city} ${userData.shippingAddress.postCode}`}
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="address-info">
            <div className="addrss-header d-flex align-items-center justify-content-between">
              <h4 className="title mb-0">Billing Address</h4>
              <Link href="/dashboard/addresses-edit/billing" className="address-edit">
                {userData.billingAddress && <i className="far fa-edit" />}
                {!userData.billingAddress && <i className="far fa-plus" />}
              </Link>
            </div>
            <ul className="address-details">
              {userData.billingAddress && (
                <>
                  <li>Name: {userData.billingAddress.name}</li>
                  <li>Email: {userData.billingAddress.email}</li>
                  <li>Phone: {userData.billingAddress.phone}</li>
                  <li className="mt--30">
                    {userData.billingAddress.street} <br />
                    {`${userData.billingAddress.state}, ${userData.billingAddress.city} ${userData.billingAddress.postCode}`}
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAddress;
