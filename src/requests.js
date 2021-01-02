let requests = async (obj, url) => {
    const response = await fetch(url, obj);
    const resData = await response.json();

    return resData;
};


// module.exports = requests;

export default requests;
