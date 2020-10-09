import JsRequest from '../JsRequest';
import BaseService from './BaseService';

let config: any = {};
export default class ConfigService extends BaseService {
    public register (req: JsRequest) {
        // tslint:disable-next-line no-string-literal
        config[req.strParam('key')] = req.params['value'];
        return '1';
    }

    public static get = (key: string) => {
        return config[key];
    }

    public static getDevice = () => {
        return ConfigService.get('device');
    }
}
