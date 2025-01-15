import ApplicationAPI from "./application";

export default class PelicanAPI {
    public url: string;
    public apiKey: string;

    public application: ApplicationAPI;

    constructor(url: string, apiKey: string) {
        url = url.replace(/\/+$/, "");
        this.url = url;
        this.apiKey = apiKey;

        this.application = new ApplicationAPI(this);
    }

    call(endpoint: string = "/", method: string = "GET", data: any = null): Promise<{status: number, data: any, pagination: any}> {
        return new Promise(async (resolve, reject) => {
            try {
                const url = this.url + endpoint;
                let options: any = {
                    method,
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': "application/json",
                        'User-Agent': `PelicanAPI`,
                        "Accept": "application/json",
                    }
                };

                if (data) options.body = JSON.stringify(data);

                let response = await fetch(url, options);

                let body: any = null;
                let resp: any = null;
                let pagination: any = null;

                if (response.status !== 204) {
                    body = await response.json();
                    resp = body?.data ? body.data : body;
                    pagination = body?.meta?.pagination ? body.meta.pagination : null;
                }

                if (body?.errors) {
                    return reject(body?.errors);
                }

                resolve({
                    status: response.status,
                    data: resp,
                    pagination,
                });
            } catch(error) {
                reject(error);
            }
        })
    }

}
