import * as createHash from 'create-hash';
import * as UUID from 'uuid';
import {AxiosRequestConfig} from 'axios';

export const hashHeader = (config: AxiosRequestConfig, appId: string, appSecret: string, device: any) => {
    let deviceId = '';
    let secret = appSecret;
    if (device) {
        deviceId = device.id;
        secret = sha256(appSecret + device.secret);
    }
    const requestId = UUID.v4();
    const timestamp = Math.round((new Date()).getTime() / 1000);
    let body = config.data;
    if (typeof body == 'object') {
        body = JSON.stringify(body);
    }
    const bodyHash = body ? sha256(body) : '';
    let fullUrl = '/api/' + config.url;
    if (config.params) {
        fullUrl += '?' + (config as any).paramsSerializer(config.params);
    }
    config.headers['d-app'] = appId;
    config.headers['d-request'] = requestId;
    config.headers['d-timestamp'] = timestamp;
    config.headers['d-device'] = deviceId;
    const hashId = sha256([
        secret,
        fullUrl,
        timestamp,
        requestId,
        deviceId,
        bodyHash,
    ].join(''));
    config.headers['d-hash'] = hashId;
};

export const dateFormat = (fmt: string, date?: Date) => {
    if (!date) {
        date = new Date();
    }
    const o: any = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds(),
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
};

export const isNumeric = (n: any) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

export const timeout = (ms: number) => {
    return new Promise((resolve: any) => setTimeout(resolve, ms));
};

export const timestamp = () => {
    return Number.parseInt(((new Date() as any) / 1000).toFixed(), 10);
};

export const parseJson = (json: string) => {
    try {
        return JSON.parse(json);
    } catch (e) {
        // tslint:disable-next-line no-console
        console.error(e);
        return void 0;
    }
};

export const sha256 = (str: string) => {
    const hash = createHash('sha256');

    return hash.update(str).digest('hex');
};

export const inWechat = () => {
    return (window as any).navigator.userAgent.toLowerCase().indexOf("micromessenger") > -1
}
