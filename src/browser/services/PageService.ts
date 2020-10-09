import JsRequest from '../JsRequest';
import BaseService from './BaseService';

export default class PageService extends BaseService {

    public open = (req: JsRequest) => {
        if ((window as any).wx) {
            (window as any).location = req.strParam("url");
        } else {
           window.open(req.strParam("url"), "_blank");
        }
    }

    public browser = (req: JsRequest) => {
        if ((window as any).wx) {
            (window as any).location = req.strParam("url");
        } else {
           window.open(req.strParam("url"), "_blank");
        }
    }

}
