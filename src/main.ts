import Vue from 'vue'
import moment from 'moment'
import axios from 'axios'
import 'lib-flexible/flexible'

import App from './App.vue'
import router from './routers'
import store from './stores'
import Drmer from "./Drmer"

import db from './plugins/lowdb';
import httpClient from "./plugins/axios";
import './plugins/vant'

Vue.prototype.axios = axios;
Vue.config.productionTip = false;

moment.locale('zh-cn')

Vue.filter('dateformat', (dataStr: string, pattern = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(dataStr).format(pattern)
})

Vue.component('Loading', require('@/components/Loading').default);

const IN_WECHAT = window.navigator.userAgent.toLowerCase().indexOf("micromessenger") > -1;

if (process.env.VUE_APP_TARGET == 'web') {
    const BrowserBridge = require("./browser/BrowserBridge").default;
    const jsBridge = new BrowserBridge();

    (async () => {
        if (IN_WECHAT) {
            await jsBridge.installWechat();
        }
        (window as any).browserBridge = jsBridge;
    })();
}

(window as any).Drmer = Drmer;

Drmer.waitForBridge(async () => {
    Drmer.run('AppService@test')
    const config: any = await Drmer.call('AppService@version');
    (httpClient as any).init(config.key, config.secret)
    const device: any = db.get('device').value()
    if (!device.id) {
        // register device
        const resp: any = await httpClient.post('devices', {
            model: config.model,
        })
        if (resp.code !== 200) {
            alert('设备初始化失败，请重启app')
            return
        }
        const payload = resp.data;
        db.set('device', payload).write()
    }
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')
})
