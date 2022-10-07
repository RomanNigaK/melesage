const URLHOST = "http://localhost:3000/";

export const responseData = {
    getQuantityRows() {
        return fetch(URLHOST + 'quantity/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
            .then(response => response.json())
            .then(data => data)
            .catch(err => { throw new Error('Нет соеденения с сервером') });
    },
    getData(start, limit) {
        return fetch(URLHOST + `milesage?start=${start}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
            .then(response => response.json())
            .then(data => data);
    },
    getSearchData(body, start, limit) {
        const res = fetch(URLHOST + `milesage?start=${start}&limit=${limit}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => data);
        return res;
    }
}


