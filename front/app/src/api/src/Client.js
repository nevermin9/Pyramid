import axios from 'axios';
const baseURL = process.env.API_BASE_URL;

export const Client = {
    fetchData(url, payload = {}) {
        const { headers = {}, method = 'get', data = {} } = payload;

        if (!headers['Content-Type'] && method !== 'get') {
            headers['Content-Type'] = 'application/json';
        }

        return axios({ method, baseURL, headers, url, data })
    }
}

export function Query(obj) {
    let str = [];

    for (let key of Object.keys(obj)) {
        str.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }

    return str.join('&');
}
