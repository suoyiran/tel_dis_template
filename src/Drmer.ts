import * as _ from 'lodash';
import {parseJson} from './utils';
import { EventEmitter2 } from 'eventemitter2';

const jobs = Array<any>();

let jsBridge: any = null;
let events: EventEmitter2;

let backCallbacks: any[] = [];

export default class Drmer {
    public static waitForBridge = (fcn: () => void) => {
        if (jsBridge) {
            if (fcn) {
                fcn();
            }
        }
        // Android device
        if (typeof (window as any).androidBridge !== 'undefined') {
            jsBridge = (window as any).androidBridge;
            if (fcn) {
                fcn();
            }
            return;
        }

        if (typeof (window as any).browserBridge !== 'undefined') {
            jsBridge = (window as any).browserBridge;
            if (fcn) {
                fcn();
            }
            return;
        }

        if (typeof (window as any).iOSBridge !== 'undefined') {
            jsBridge = (window as any).iOSBridge;
            if (fcn) {
                fcn();
            }
            return;
        }

        setTimeout(() => {
            Drmer.waitForBridge(fcn);
        }, 100);
    }

    public static get backCallbacks () : any[] {
        return backCallbacks;
    }

    public static close = () => {
        do {
            const callbackFn = backCallbacks.pop();
            callbackFn();
        } while (backCallbacks.length > 0);
    }

    private static getId = () => {
        let id: string;
        do {
            id = 'li' + (new Date()).getTime() + Math.floor(Math.random() * 1000);
            const exists = _.find(jobs, ['id', id]);
            if (!exists) {
                return id;
            }
        } while (true);
    }

    public static call = (method: any, params?: any) => {
        return Drmer.remoteCall(method, params);
    }

    private static remoteCall = (method: any, params?: any) => {
        if (!jsBridge) {
            return;
        }
        return new Promise((resolve) => {
            const id = Drmer.getId();
            jobs.push({
                id: id,
                callback: resolve,
            });
            jsBridge.postMessage(JSON.stringify({
                id: id,
                method: method,
                params: params,
            }));
        });
    }

    public static live = (method: any, params?: any, cbFn?: Function) => {
        if (!jsBridge) {
            return;
        }
        if (typeof params == 'function') {
            cbFn = params;
            params = void 0;
        }

        const id = Drmer.getId();

        jobs.push({
            id: id,
            listen: true,
            callback: cbFn,
        });

        jsBridge.postMessage(JSON.stringify({
            id: id,
            method: method,
            params: params,
        }));
        return id;
    }

    public static die = (id: string) => {
        _.remove(jobs, (item: any) => {
            return item.id === id;
        });
    }

    public static run = (method: any, params?: any) => {
        if (!jsBridge) {
            return;
        }
        jsBridge.postMessage(JSON.stringify({
            method: method,
            params: params,
        }));
    }

    public static dequeue = (id: string, res: any) => {
        if (!id) {
            return;
        }
        const job = _.find(jobs, (item) => {
            return item.id === id;
        });
        if (!job) {
            return;
        }
        if (typeof job.callback === 'function') {
            if (typeof res == 'string') {
                res = parseJson(res);
            }
            job.callback(res);
        }
        if (job.listen) {
            return;
        }
        _.remove(jobs, (item: any) => {
            return item.id === id;
        });
    }

    public static on = (type: string, listener: any) => {
        Drmer.events.on(type, listener);
    }

    public static off = (type: string, listener: any) => {
        Drmer.events.removeListener(type, listener);
    }

    // @ts-ignore
    public static get events (): EventEmitter2 {
        if (!events) {
            events = new EventEmitter2();
        }
        return events;
    }
}
