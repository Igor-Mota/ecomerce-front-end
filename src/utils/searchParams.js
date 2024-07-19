export const createUrl = (param, value) => {
  const url = new URL(window.location);
  const params = url.searchParams;

  if (params.has(param)) {
    params.delete(param);
  }

  params.append(param, value);

  const newUrl = url.origin + url.pathname + "?" + params.toString();

  window.history.pushState({}, "", newUrl);
};

export const creatUrlRemoveParam = (param) => {
  const url = new URL(window.location);
  const params = url.searchParams;

  if (params.has(param)) {
    params.delete(param);
  }

  const newUrl = url.origin + url.pathname + "?" + params.toString();

  window.history.pushState({}, "", newUrl);
};

export const clearAllSearchParams = () => {
  const url = new URL(window.location);
  url.search = "";

  const newUrl = url.origin + url.pathname;
  window.history.pushState({}, "", newUrl);

  return newUrl;
};
