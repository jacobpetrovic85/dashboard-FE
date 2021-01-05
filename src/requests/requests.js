export async function requests (obj, url)  {
    const response = await fetch(url, obj);
    const resdata = await response.json();
    return resdata;
};

export async function xmlRequests (obj, url) {
    const response = await fetch(url, obj);
    const resdata = await response;
    return resdata;
};