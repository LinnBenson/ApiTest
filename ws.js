import Config, { Debug } from './config.js';
import Tool from 'befunc';
import API from './api/test.ws.js';

// 导入依赖
import { createServer } from 'http';
import { WebSocketServer } from 'ws';

// 准备启动
console.log( 'Start automatic preparation.' );
const httpServer = createServer();
const server = new WebSocketServer({ noServer: true });
let count = 0;

// 构造回调 API
const Api = new API();

// 消息处理
server.on( 'connection', ( ws ) => {
    count++;
    Debug([ '开始建立新的连接！', `=> 当前连接总数：${count}` ]);
    ws.on('message', ( message ) => {
        // 数据整理
        Debug([ '收到新的消息：', `=> ${message}` ]);
        if ( !Tool.isJson( message ) ) {
            ws.send( Api.echo( 2, '请求消息格式必须为 JSON' ) );
            return;
        }
        const GET = JSON.parse( message );
        // 检查回调方法是否存在
        const target = GET['action'];
        if ( !Tool.isFunction( Api[target] ) ) {
            ws.send( Api.echo( 2, '回调处理方法不存在' ) );
            return;
        }
        // 调用方法回复
        const reply = Api[target]( GET['data'] );
        if ( Tool.isJson( reply ) ) {
            setTimeout(() => { ws.send( reply ); }, Config.timeout * 1000 );
            Debug([ '成功回调消息', `=> ${reply}` ]);
        }
    });
    ws.on('close', () => {
        count--;
        Debug([ '连接已断开！', `=> 当前连接总数：${count}` ]);
    });
});

// 启动服务器
httpServer.on( 'upgrade', (request, socket, head) => {
    server.handleUpgrade( request, socket, head, ( ws ) => {
        server.emit( 'connection', ws, request );
    });
});
httpServer.listen( Config.port.ws, () => {
    console.log(`[ ${Tool.getTime()} ] Virtual WS creation service.\n=> Start: ws://localhost:${Config.port.ws}`);
});
