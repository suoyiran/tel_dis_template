import JsRequest from '../browser/JsRequest';
import AppService from './services/AppService';
import OauthService from './services/OauthService';
import ConfigService from './services/ConfigService';
import PageService from './services/PageService';
import LocationService from "./services/LocationService";
import XiaojuService from "./services/XiaojuService";
import httpClient from '../plugins/axios';
import {timeout} from "../utils";

export default class BrowserBridge {

    private services: {[id: string]: any} = {};

    public async installWechat() {
        // add wechat js
        const script = document.createElement("script");
        script.setAttribute("src", "https://res.wx.qq.com/open/js/jweixin-1.6.0.js");
        document.body.appendChild(script)
        const resp: any = await httpClient.get("wechat/config", {
            params: {
                url: window.location.href,
            }
        });
        if (resp.code !== 200) {
            alert("初始化失败：" + resp.msg)
            return
        }
        const config = resp.data;
        while (true) {
            const wx = (window as any).wx;
            if (!wx) {
                console.log('wx not ready');
                await timeout(50);
                continue;
            }
            wx.config({
                debug: false,
                appId: config.appId, // 必填，公众号的唯一标识
                timestamp: config.timestamp, // 必填，生成签名的时间戳
                nonceStr: config.nonceStr, // 必填，生成签名的随机串
                signature: config.signature,// 必填，签名
                jsApiList: ['getLocation', 'openLocation', 'scanQRCode'] // 必填，需要使用的JS接口列表
            });
            break;
        }
    }

    public postMessage (body: string) {
        const req = new JsRequest(body);

        const service = this.getService(req.clsName);

        if (!service) {
            // tslint:disable-next-line no-console
            console.log(`${req.clsName}@${req.clsMethod} NOT FOUND`);
            return;
        }
        if (typeof (service as any)[req.clsMethod] !== 'function') {
            // tslint:disable-next-line: no-console
            console.log(`Method ${req.clsName}@${req.clsMethod} not found.`);
            return;
        }
        (async () => {
            const data = await (service as any)[req.clsMethod](req);
            if (typeof data == 'undefined') {
                return;
            }
            req.callback(data);
        })();
    }

    private getService = (name: string) => {
        if (!this.services[name]) {
            let service;
            switch (name) {
                case 'AppService': service = new AppService(); break;
                case 'ConfigService': service = new ConfigService(); break;
                case 'OauthService': service = new OauthService(); break;
                case 'PageService': service = new PageService(); break;
                case 'LocationService': service = new LocationService(); break;
                case 'XiaojuService': service = new XiaojuService(); break;
                default: return null;
            }
            this.services[name] = service;
        }
        return this.services[name];
    }
}
