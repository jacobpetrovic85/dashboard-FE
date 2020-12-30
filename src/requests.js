import * as R from 'ramda';

let requests = (data, fn, method, contentType, API_KEY) => {
  let obj = {
    method: method,
    headers: {
      'Content-type':  'application/json'
    },
    body: data
  };
  let newObj = fn(obj);
  let newNewObj = R.assocPath(['headers'], API_KEY(newObj), newObj);

  console.log("newObj = ", newObj);
  console.log("newNewObj = ", newNewObj);
  return async (url) => {

    const response = await fetch(url, newObj);

    const resData = await response.json();

    return resData;
  };
};


export default requests;
