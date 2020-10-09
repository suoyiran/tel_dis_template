import {parseJson} from '../utils';

export default class JsRequest {
    public id = '';
    public clsName = '';
    public clsMethod = '';
    public params: any;

    constructor (body: string) {
        let json = parseJson(body);
        if (!json) {
            return;
        }
        this.id = json.id;
        let method = json.method.split('@');
        this.clsName = method[0];
        this.clsMethod = method[1];
        this.params = json.params;
    }

    public callback = (ret: any) => {
        (window as any).Drmer.dequeue(this.id, ret);
    }

    public strParam = (key: string): string => {
        return this.params[key];
    }

    public numParam = (key: string): number => {
        return this.params[key];
    }

    public intParam = (key: string) => {
        return this.numParam(key);
    }

    public jsonParam = (key: string) => {
        if (typeof this.params[key] == 'string') {
            return parseJson(this.params[key]);
        }
        return this.params[key];
    }
}
