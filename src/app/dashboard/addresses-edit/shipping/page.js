"use client";
import { useRef } from "react";
import { getStates } from "@brazilian-utils/brazilian-utils";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { cepFetcher } from "@/services/http/externals/cep";
import { useCreateAddress, useUpdateAddress } from "@/services/http/address";
import { useDispatch, useSelector } from "react-redux";
import { shippingAddress } from "@/store/slices/authSlice";

const schema = yup.object({
  zip_code: yup.string().required("CEP é obrigatório"),
  city: yup.string().required("Cidade é obrigatória"),
  state: yup.string().required("Estado é obrigatório"),
  address: yup.string().required("Endereço é obrigatória"),
  number: yup.string().required("Numero é obrigatória"),
  neighborhood: yup.string().required("Bairro é obrigatória"),
});

const ShippingAddress = () => {
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.auth);
  const address = userData.user.shippingAddress ?? null;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const selectRef = useRef(null);

  const {
    data: createData,
    reset: createReset,
    isLoading: isCreateLoading,
    mutate: createAddressFn,
  } = useCreateAddress();

  const {
    data: updateData,
    reset: updateReset,
    isLoading: isUpdateLoading,
    mutate: updateAddressFn,
  } = useUpdateAddress();

  if (createData && createData.id) {
    dispatch(shippingAddress(createData));
    createReset();
  }

  if (updateData && updateData.id) {
    dispatch(
      shippingAddress({
        ...address,
        id: updateData.id,
        number: updateData.number,
        street: updateData.updateData,
        state: updateData.state,
        city: updateData.city,
        neighborhood: updateData.neighborhood,
        postCode: updateData.zip_code,
        country: "Brazil",
      }),
    );
    updateReset();
  }

  const getAddressByCep = async (value) => {
    const cep = value.replace(/\D/g, "");
    if (cep.length === 8) {
      const response = await cepFetcher(cep);
      if (response.cep) {
        setValue("city", response.localidade);
        setValue("neighborhood", response.bairro);
        setValue("address", response.logradouro);
        setValue("state", response.uf);

        const stateCode = response.uf.trim().toUpperCase();

        const selectElement = selectRef.current;
        Array.from(selectElement.options).forEach((option) => {
          if (option.value === stateCode) {
            option.selected = true;
          } else {
            option.selected = false;
          }
        });
      }
    }
  };

  const userShippingInfoHandler = async (data) => {
    console.log(data);
    if (address && address.id) {
      updateAddressFn({
        id: address.id,
        ...data,
      });
    } else {
      createAddressFn({ ...data, complement: data.complement ?? "" });
    }
  };

  const replacerCep = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1-$2")
      .slice(0, 10);
  };

  const defaultState = (state) => {
    if (
      !!address &&
      address.country.toUpperCase() === state.code.toUpperCase()
    ) {
      return true;
    }
    return false;
  };

  return (
    <>
      <h4 className="title">Shipping Address</h4>
      <form
        className="account-details-form"
        onSubmit={handleSubmit(userShippingInfoHandler)}
      >
        <div className="row">
          <div className="form-group col-12 col-md-6">
            <label>CEP *</label>
            <Controller
              control={control}
              name="zip_code"
              defaultValue={address && address.postCode ? address.postCode : ""}
              render={({ field }) => {
                const { onChange, ...rest } = field;
                return (
                  <input
                    {...rest}
                    onChange={(e) => {
                      const formattedCep = replacerCep(e.target.value);
                      e.target.value = formattedCep;
                      onChange(e);
                      getAddressByCep(formattedCep);
                    }}
                    type="text"
                    className="form-control"
                  />
                );
              }}
            />
            {errors.zip_code && (
              <p className="text-danger">{errors.zip_code.message}</p>
            )}
          </div>

          <div className="form-group col-12 col-md-6">
            <label>Cidade *</label>
            <Controller
              control={control}
              name="city"
              defaultValue={address ? address.city : ""}
              render={({ field }) => {
                return (
                  <input {...field} type="text" className="form-control" />
                );
              }}
            />
            {errors.city && (
              <p className="text-danger">{errors.city.message}</p>
            )}
          </div>

          <div className="form-group col-12 col-md-6">
            <label>Bairro</label>
            <Controller
              control={control}
              name="neighborhood"
              defaultValue={address ? address.neighborhood : ""}
              render={({ field }) => {
                return (
                  <input {...field} type="text" className="form-control" />
                );
              }}
            />
            {errors.neighborhood && (
              <p className="text-danger">{errors.neighborhood.message}</p>
            )}
          </div>

          <div className="form-group col-12 col-md-6">
            <label>Endereço</label>
            <Controller
              control={control}
              defaultValue={address ? address.street : ""}
              name="address"
              render={({ field }) => {
                return (
                  <input {...field} type="text" className="form-control" />
                );
              }}
            />
            {errors.address && (
              <p className="text-danger">{errors.address.message}</p>
            )}
          </div>

          <div className="form-group col-12 col-md-6">
            <label>Numero</label>
            <Controller
              control={control}
              name="number"
              defaultValue={address ? address.number : ""}
              render={({ field }) => {
                return (
                  <input {...field} type="text" className="form-control" />
                );
              }}
            />
            {errors.number && (
              <p className="text-danger">{errors.number.message}</p>
            )}
          </div>

          <div className="form-group col-12 col-md-6">
            <label>Estado *</label>
            <Controller
              control={control}
              name="state"
              render={({ field }) => (
                <select
                  {...field}
                  ref={selectRef}
                  className="form-control js-select-states fs-3  ps-4"
                >
                  {getStates().map((state) => (
                    <option
                      key={state.code}
                      value={state.code}
                      selected={defaultState(state)}
                    >
                      {state.name}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.state && (
              <p className="text-danger">{errors.state.message}</p>
            )}
          </div>

          <div className="form-group col-12 col-md-6">
            <label>Complemento</label>
            <Controller
              control={control}
              name="complement"
              render={({ field }) => {
                return (
                  <input {...field} type="text" className="form-control" />
                );
              }}
            />
            {errors.complement && (
              <p className="text-danger">{errors.complement.message}</p>
            )}
          </div>
        </div>

        <div className="col-lg-12">
          <div className="form-group mb--0">
            {!isCreateLoading && !isUpdateLoading && (
              <button type="submit" className=" btn btn-primary axil-btn">
                Salvar
              </button>
            )}
            {isCreateLoading ||
              (isUpdateLoading && (
                <button type="submit" className=" btn btn-primary axil-btn">
                  <div class="spinner-border text-light" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </form>
    </>
  );
};

export default ShippingAddress;
