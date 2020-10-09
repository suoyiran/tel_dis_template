import BaseService from './BaseService';

const pjson = require('../../../package.json')

export default class AppService extends BaseService {
    public onReady = () => {
        // App is ready
    }

    public test = () => {
        // test
        console.log('appService@test', new Date())
    }

    public version = () => {
        return {
            'system': 'web',
            'key': 'web8YyuWEc4wM',
            'secret': 'cn$!J92emyhdADxh3&MsBAQm9T!*uyMh',
            'code': pjson.version,
            'build': pjson.build,
            'model': window.navigator.userAgent,
        };
    };
}
