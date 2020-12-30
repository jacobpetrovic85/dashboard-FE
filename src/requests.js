

let requests = (data, fn, method, contentType) => {
  let obj = {
    method: method,
    headers: {
      'Content-type': contentType
    },
    body: data
  };
  let newObj = fn(obj);
  console.log("newObj = ", newObj);
  return async (url) => {
    console.log("data = ", data);
    // Awaiting for fetch response and
    // defining method, headers and body

    const response = await fetch(url, newObj);

    // Awaiting response.json()
    const resData = await response.json();

    // Returning result data
    return resData;
  };
};

// JSON.stringify(data); 'application/json'

module.exports = requests;

// class EasyHTTP {

// 	// Make an HTTP GET Request
// 	async get(url) {

// 		// Awaiting for fetch response
// 		const response = await fetch(url);

// 		// Awaiting for response.json()
// 		const resData = await response.json();

// 		// Returning result data
// 		return resData;
// 	}

// 	// Make an HTTP POST Request
// 	async postDelete(url, data) {

// 		// Awaiting for fetch response and
// 		// defining method, headers and body
// 		const response = await fetch(url, {
// 			method: 'POST',
// 			headers: {
// 				'Content-type': 'application/json'
// 			},
// 			body: JSON.stringify(data)
// 		});

// 		// Awaiting response.json()
// 		const resData = await response.json();

// 		// Returning result data
// 		return resData;
// 	}
// }
