let requests = (data, fn, method, contentType) => {
  let obj = {
    method: method,
    headers: {
      'Content-type': contentType
    },
    body: data
  };
  let newObj = fn(obj);
  return async (url) => {

    const response = await fetch(url, newObj);

    const resData = await response.json();

    return resData;
  };
};


module.exports = requests;
