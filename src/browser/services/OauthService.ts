import BaseService from './BaseService';
import httpClient from '../../plugins/axios.js';

export default class OauthService extends BaseService {
    public config () {
        return {
            wechat: true,
        };
    }

    public wechat = async () => {
        const resp: any = await httpClient.get('oauth/login');
        if (resp.code !== 200) {
            alert(resp.msg)
            return
        }
        window.location = resp.data
    }
}
