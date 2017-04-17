let requester = {
    get(url) {
        let promise = new Promise((resolve, reject) => {
            $ajax({
                url,
                method: 'GET',
                success(resposce) {
                    resolve(resposce);
                }
            });
        });
        return promise;
    },
    getJSON(url) {
        let promise = new Promise((resolve, reject) => {
            $ajax({
                url,
                method: 'GET',
                contentType: 'application/JSON',
                success(response) {
                    resolve(response);
                }
            });
        });
    },
    postJSON(url, body, options = {}) {
        let promise = new Promise((resolve, reject) => {

        });
    }
};