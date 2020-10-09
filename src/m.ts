import BrowserBridge from "./browser/BrowserBridge";
const jsBridge = new BrowserBridge();

const IN_WECHAT = window.navigator.userAgent.toLowerCase().indexOf("micromessenger") > -1;
(window as any).browserBridge = jsBridge;
if (IN_WECHAT) {
    jsBridge.installWechat();
}
