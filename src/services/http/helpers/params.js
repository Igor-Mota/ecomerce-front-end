export const queryParamsHelper = () => {
  if (typeof window !== "undefined") {
    const searchParams = new URLSearchParams(window.location.search);

    let params = {};

    for (const [key, value] of searchParams) {
      params[key] = value;
    }
    return {
      ...params,
    };
  }
  return {
    page: 0,
    offset: 1,
  };
};
