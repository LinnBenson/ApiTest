import g from './generate.js';

export default class API  {
    // 回调函数
    echo( type, send ) {
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
        return data;
    }
    homeInfo() {
        const send = {
            slogan: [ '不管怎样，明天又是全新的一天', 'After all, tomorrow is another day.' ],
            bulletin: g.copy( { id: '{num}', title: '官网 React 版本正在开发中' } )[0],
            bookmark: g.copy({
                name: '书签 {num}',
                icon: '',
                link: '/'
            }, 8 ),
            business: g.copy({
                name: '功能 {i}',
                icon: '{icon}',
                link: '/'
            }, 5 )
        };
        return this.echo( 0, send );
    }
}