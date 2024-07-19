const push = (payload, key, value) => {
  let url = payload;

  if (!url.toString().includes("?")) {
    url += "?" + key + "=" + value;
  } else {
    url += "&" + key + "=" + value;
  }

  return url;
};

export const createUrl = (payload) => {
  let url = window.location.pathname + window.location.search;

  if (payload) url = payload;

  return {
    get: () => {
      return url;
    },
    push: (key, value) => {
      url = push(url, key, value);
      window.history.pushState({}, "", url);
    },
    remove: (param) => {
      if (!window.location.search.includes("?")) return;
      const [_, params] = window.location.search.replace("?", "");
      if (params.includes("&")) {
        const separate = params.split("&");
        if (Array.isArray(separate)) {
          separate.forEach(([key, value]) => {
            if (key !== param) {
              url = push(url, key, value);
            }
          });
        }
      } else {
        const [key, value] = params.split("=");
        push(url, key, value);
      }

      return {
        push: () => {
          window.history.pushState({}, "", url);
        },
        get: () => {
          return url;
        },
      };
    },
    clearAll: () => {
      url = window.location.pathname;
      return {
        get: () => {
          return url;
        },
        push: () => {
          window.history.pushState({}, "", url);
        },
      };
    },
  };
};
