import g from './generate.js';

export default class API  {
    // 回调函数
    echo( type, send, func = false ) {
        let data = {};
        switch ( type ) {
            case 0: data.s = 'success'; break;
            case 1: data.s = 'fail'; break;
            case 2: data.s = 'error'; break;
            case 3: data.s = 'warn'; break;
            default: data.s = 'unknown'; break;
        }
        data.t = Math.floor( Date.now() / 1000 );
        data.d = send;
        if ( func ) { data.f = func; }
        return JSON.stringify( data );
    }
    // 心跳响应
    heartbeat() {
        return false;
    }
    getPrompt( data ) {
        const send = {
            value: data.value,
            list: g.copy({
                text: '{TextCn}'
            }, Math.floor( Math.random() * ( 8 - 1 + 1 ) ) + 1 )
        };
        return this.echo( 0, send, 'getPrompt' );
    }
}