import Config, { Debug } from './config.js';
import Tool from 'befunc';
import API from './api/test.api.js';

// 导入依赖
import express from 'express';
import cors from 'cors';
import multer from 'multer';

// 准备启动
console.log( 'Start automatic preparation.' );
const app = express();
app.use( cors() );

// 构造回调 API
const Api = new API();

// 路由处理
app.all( '*', multer().none(), ( req, res ) => {
	// 数据整理
    const Url = req.url;
    const Post = {}; for ( const key in req.body ) { Post[key] = req.body[key]; }
    Debug([ '新的访问请求：', `=> ${Url}` ]);
    // 检查回调方法是否存在
    const target = Url.replace( /\//g, '' );
    if ( !Tool.isFunction( Api[target] ) ) {
        res.json( Api.echo( 2, '回调处理方法不存在' ) );
        return;
    }
    // 调用方法回复
    const reply = Api[target]( Post );
    if ( Tool.isArray( reply ) ) {
        setTimeout(() => { res.json( reply ) }, Config.timeout * 1000 );
        Debug([ '成功回调消息', `=> ${JSON.stringify( reply )}` ]);
    }else if ( !Tool.empty( reply ) ) {
        setTimeout(() => { res.send( reply ) }, Config.timeout * 1000 );
        Debug([ '成功回调消息', `=> ${reply}` ]);
    }
});

// 启动服务器
app.listen( Config.port.api, () => {
	console.log( `[ ${Tool.getTime()} ] Virtual API creation service.\n=> Start: http://localhost:${Config.port.api}` );
});