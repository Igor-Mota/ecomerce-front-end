"use client";
import Link from "next/link";
import { useSelector } from "react-redux";

const UserAddress = () => {
  const { userData } = useSelector((state) => state.auth);

  return (
    <div className="axil-dashboard-address">
      <p className="notice-text">
        The following addresses will be used on the checkout page by default.
      </p>
      <div className="row row--30">
        <div className="col-lg-6">
          <div className="address-info mb--40">
            <div className="addrss-header d-flex align-items-center justify-content-between">
              <h4 className="title mb-0">Shipping Address</h4>
              <Link
                href="/dashboard/addresses-edit/shipping"
                className="address-edit"
              >
                {userData.user && userData.user.shippingAddress && (
                  <i className="far fa-edit" />
                )}
                {userData.user && !userData.user.shippingAddress && (
                  <i className="far fa-plus" />
                )}
              </Link>
            </div>
            <ul className="address-details">
              {userData.user && userData.user.shippingAddress && (
                <>
                  <li className="mt--30">
                    {userData.user.shippingAddress.street} Numero: {userData.user.shippingAddress.number} <br />
                    {`${userData.user.shippingAddress.state}, ${userData.user.shippingAddress.city} ${userData.user.shippingAddress.postCode}`} <br />
                    {userData.user.shippingAddress.complement}
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        {userData.user && userData.user.shippingAddress && (
          <div className="col-lg-6">
            <div className="address-info">
              <div className="addrss-header d-flex align-items-center justify-content-between">
                <h4 className="title mb-0">Billing Address</h4>
                <Link
                  href="/dashboard/addresses-edit/billing"
                  className="address-edit"
                >
                  {userData.billingAddress && <i className="far fa-edit" />}
                  {!userData.billingAddress && <i className="far fa-plus" />}
                </Link>
              </div>
              <ul className="address-details">
                {userData.user.billingAddress && (
                  <>
                    <li className="mt--30">
                    {userData.user.billingAddress.street} Numero: {userData.user.billingAddress.number} <br />
                    {`${userData.user.billingAddress.state}, ${userData.user.billingAddress.city} ${userData.user.billingAddress.postCode}`} <br />
                    {userData.user.billingAddress.complement}
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAddress;
