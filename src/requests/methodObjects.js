// GET
export let getObj = {
  method: 'GET',
  headers: {
    'Content-type': 'application/json'
  }
};

// GET API
export let getApiObj = {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
    'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c',
    'Accept-Encoding': 'gzip'
  }
};

// POST
export let postDeleteObj = (data, method) => {
  return {
    method: 'method',
  headers: {
    'Content-type': 'application/json'
  },
    body: data
  };
};
