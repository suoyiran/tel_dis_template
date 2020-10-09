import Drmer from "./Drmer";

Drmer.waitForBridge(async () => {
    (window as any).Drmer = Drmer;
    (window as any).huixiangyoulitest = {
        launchScan: function (params: any, resCallback: any, errCallback: any) {
            (async () => {
                const resp: any = await Drmer.call('XiaojuService@launchScan', params);
                resCallback(resp.payload)
            })();
        },

        getLocation: function (params: any, resCallback: any, errCallback: any) {
            (async () => {
                const resp = await Drmer.call('LocationService@get', params);
                resCallback(resp)
            })();
        },

        launchNav: function (params: any, resCallback: any, errCallback: any) {
            // const parmas = {
            //   // 说明 该坐标为 GCJ20 坐标系，请封装时自行转换
            //   // 关于导航起点的传入为根据 getLocation 方法获取的结果，第三方APP可选择是否使用，如不使用，应重新获取用户位置信息
            //   fromLng: 120.055485,    // 导航起始点经度
            //   fromLat: 30.284651,        // 导航起始点纬度
            //   toLng: 120.14104,            // 导航终点经度
            //   toLat: 30.258732,            // 导航终点纬度
            //   toName: '目的地名称'
            // };
            (async () => {
                await Drmer.run('LocationService@open', params);
                resCallback({})
            })();
        },

        /**
         * 由于在webview中唤起微信支付会出现 商家参数格式有误 提示，需提供该方法来设置 referer
         * 具体原因请看：https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=15_4 常见问题2
         * {JSON String} params = {"referer": "https://static.am.xiaojukeji.com"}
         */
        setReferer: function (params: any, resCallback: any) {
            // 该方法直接处理入参 ，如提供，会在进入小桔页面后立即调用
            (async () => {
                await Drmer.run('XiaojuService@setReferer', params);
                resCallback({})
            })();
        }
    }
});
