import BaseService from './BaseService';
import JsRequest from "../JsRequest";
export default class LocationService extends BaseService {

    public askForPermission = (req: JsRequest) => {
        req.callback({
            granted: true,
        })
    }

    public get = (req: JsRequest) => {
        if(!(window as any).wx) {
            req.callback({
                lat: '30.2990',
                lng: '120.05547',
            })
            return
        }
        (window as any).wx.getLocation({
            type: 'wgs84',
            // @ts-ignore
            success: (res) => {
                req.callback({
                    lat: res.latitude,
                    lng: res.longitude,
                })
            }
        });
    }

    public open = (req: JsRequest) => {
        (window as any).wx.openLocation({
            latitude: req.numParam("toLat"), // 纬度，浮点数，范围为90 ~ -90
            longitude: req.numParam("toLng"), // 经度，浮点数，范围为180 ~ -180。
            name: req.numParam("toName"), // 位置名
            address: req.numParam("toName"), // 地址详情说明
            scale: 20, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
        })
    }

}
