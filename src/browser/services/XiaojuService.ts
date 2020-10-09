import BaseService from './BaseService';
import JsRequest from "../JsRequest";

export default class XiaojuService extends BaseService {
    public launchScan = (req: JsRequest) => {
        console.log('launchScan');
        (window as any).wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res: any) {
                alert(JSON.stringify(res))
                req.callback({
                    code: 200,
                    payload: res.resultStr
                })
            }
        });
    }

    public setReferer = () => {
    }
}
