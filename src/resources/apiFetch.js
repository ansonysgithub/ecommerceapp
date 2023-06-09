import config from "./config";

const get = async url => {
    const res = await fetch(`${url}`, {
        headers: {
            Authorization: config.liveLinkCredentials
        },
    });

    const resJSON = await res.json();
    return resJSON;
};

const post = async (url, body) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: config.liveLinkCredentials,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const resJSON = await res.json();
    return resJSON;
};

export default {
    get,
    post
};