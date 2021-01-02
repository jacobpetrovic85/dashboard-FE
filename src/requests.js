let requests = async (obj, url) => {
  console.log("obj = ", obj);
    const response = await fetch(url, obj);
    const resdata = await response.json();

    return resdata;
};


// module.exports = requests;

export default requests;
