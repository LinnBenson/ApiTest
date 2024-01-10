## 测试 API 项目

> 可用于生成测试 API 或者 Websocket 对接调试

### 使用
```
// 启用 API 服务器
npm run api

// 启用 ws 服务器
npm run ws
```

### 文件说明
- config.js
  - 配置文件，用于定义服务端口和回调延时
- api.js
  - API 服务入口
- ws.js
  - Websocket 服务入口
- /api/generate.js
  - 封装了一些用于生成测试数据的函数
- /api/test.api.js
  - API 回调方法
- /api/test.ws.js
  - Websocket 回调方法
- reply/
  - 此文件下的内容可以在回调方法中使用 g.file 读取

### 占位符说明
- {i} 递增数字
- {num} 随机数字字符串
- {rand} 随机文本
- {icon} 随机图标
- {time} 当前时间
- {TextEn} 随机英语句子
- {TextCn} 随机中文句子
- {WordEn} 随机英文段落
- {WordCn} 随机中文段落
- {bool} 随机布尔值