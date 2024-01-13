import fs from 'fs';
import os from 'os';
import Tool from 'befunc';

const g = {
    // 复制对象
    copy: function( data, length = 1 ) {
        if ( Tool.isArray( length ) ) { length = Math.floor(Math.random() * ( length[1] - length[0] + 1) + length[0] ); }
        let replaceString = function( string, ruleOld, ruleNew ) {
            return typeof string === 'string' ? string.replace( new RegExp( `{${ruleOld}}`, 'g' ), ruleNew ) : string;
        }
        let newData = [], newK, newV, newItem;
        for ( let i = 1; i <= length; i++ ) {
            newItem = {};
            Object.keys( data ).forEach( key => {
                newK = key, newV = data[key];
                // 递增数字
                if ( /\{i\}/.test( newK ) ) { newK = replaceString( newK, 'i', i ); }
                if ( /\{i\}/.test( newV ) ) { newV = replaceString( newV, 'i', i ); }
                // 随机数字
                if ( /\{num\}/.test( newK ) ) { newK = replaceString( newK, 'num', Tool.rand( 3, 'num' ) ); }
                if ( /\{num\}/.test( newV ) ) { newV = replaceString( newV, 'num', Tool.rand( 3, 'num' ) ); }
                // 随机字符串
                if ( /\{rand\}/.test( newK ) ) { newK = replaceString( newK, 'rand', Tool.rand( 8 ) ); }
                if ( /\{rand\}/.test( newV ) ) { newV = replaceString( newV, 'rand', Tool.rand( 8 ) ); }
                // 随机图标
                if ( /\{icon\}/.test( newV ) ) { newV = replaceString( newV, 'icon', this.randIcon() ); }
                // 当前时间
                if ( /\{time\}/.test( newV ) ) { newV = replaceString( newV, 'time', Tool.getTime() ); }
                // 随机布尔值
                if ( /\{bool\}/.test( newV ) ) { newV = Math.random() < 0.4; }
                // 随机文本
                if ( /\{TextEn\}/.test( newV ) ) { newV = replaceString( newV, 'TextEn', this.randTxet( 'TextEn' ) ); }
                if ( /\{TextCn\}/.test( newV ) ) { newV = replaceString( newV, 'TextCn', this.randTxet( 'TextCn' ) ); }
                if ( /\{WordEn\}/.test( newV ) ) { newV = replaceString( newV, 'WordEn', this.randTxet( 'WordEn' ) ); }
                if ( /\{WordCn\}/.test( newV ) ) { newV = replaceString( newV, 'WordCn', this.randTxet( 'WordCn' ) ); }
                // 格式化数字
                if ( /^\d+$/.test( newK ) ) { newK = parseInt( newV, 10 ); }
                if ( /^\d+$/.test( newV ) ) { newV = parseInt( newV, 10 ); }
                newItem[newK] = newV;
            });
            newData.push( newItem );
        }
        return newData;
    },
    // 生成随机图标
    randIcon: function() {
        let data = ['i-buildings','i-bullseye','i-bus-front','i-c-circle','i-c-square','i-calculator','i-calendar','i-calendar-check','i-calendar-date','i-calendar-day','i-calendar-event','i-calendar-heart','i-calendar-minus','i-calendar-month','i-calendar-plus','i-calendar-range','i-calendar-week','i-calendar-x','i-calendar2','i-calendar2-check','i-calendar2-date','i-calendar2-day','i-calendar2-event','i-calendar2-heart','i-calendar2-minus','i-calendar2-month','i-calendar2-plus','i-calendar2-range','i-calendar2-week','i-calendar2-x','i-calendar3','i-calendar3-event','i-calendar3-range','i-calendar3-week','i-calendar4','i-calendar4-event','i-calendar4-range','i-calendar4-week','i-camera','i-camera2','i-camera-reels','i-camera-video','i-camera-video-off','i-capslock','i-capsule','i-capsule-pill','i-car-front','i-card-checklist','i-card-heading','i-card-image','i-card-list','i-card-text','i-caret-down','i-caret-down-square','i-caret-left','i-caret-left-square','i-caret-right','i-caret-right-square','i-caret-up','i-caret-up-square','i-cart','i-cart-check','i-cart-dash','i-cart-plus','i-cart-x','i-cart2','i-cart3','i-cart4','i-cash','i-cash-coin','i-cash-stack','i-cassette','i-cast','i-cc-circle','i-cc-square','i-chat','i-chat-dots','i-chat-heart','i-chat-left','i-chat-left-dots','i-chat-left-heart','i-chat-left-quote','i-chat-left-text','i-chat-quote','i-chat-right','i-chat-right-dots','i-chat-right-heart','i-chat-right-quote','i-chat-right-text','i-chat-square','i-chat-square-dots','i-chat-square-heart','i-chat-square-quote','i-chat-square-text','i-chat-text','i-check','i-check-all','i-check-circle','i-check-lg','i-check-square','i-check2','i-check2-all','i-check2-circle','i-check2-square','i-chevron-bar-contract','i-chevron-bar-down','i-chevron-bar-expand','i-chevron-bar-left','i-chevron-bar-right','i-chevron-bar-up','i-chevron-compact-down','i-chevron-compact-left','i-chevron-compact-right'];
        const i = Math.floor( Math.random() * data.length );
        return data[i];
    },
    // 生成随机文本
    randTxet: function( type ) {
        const data = this.file( `data/${type}.json` );
        if ( Tool.isArray( data ) ) {
            const i = Math.floor( Math.random() * data.length );
            return data[i];
        }
        return '';
    },
    // 获取回复文件
    file: function( name ) {
        const dir = `./reply/${name}`;
        try {
            let data = fs.readFileSync( dir, 'utf8' );
            if ( Tool.isJson( data ) ) {
                data = JSON.parse( data );
            }
            return data;
        } catch ( error ) {
            return '无法读取文件';
        }
    },
    // 获取本地 IP
    getIP: function( host ) {
        const network = os.networkInterfaces();
        let ip = [];
        // 遍历网络接口
        Object.keys( network ).forEach(( item ) => {
            const allAdd = network[item];
            allAdd.forEach(( ipInfo ) => {
                if ( ipInfo.family === 'IPv4' && !ipInfo.internal ) {
                    ip.push( ipInfo.address );
                }
            });
        });
        for ( const item of ip ) {
            if ( item.startsWith( host ) ) {
                return item;
            }
        }
    }
};
export default g;