# 测试
```
// cypress.josn
{
  "pluginsFile": "tests/e2e/plugins/index.js",
  "baseUrl": "http://192.168.103.18:8081", // 本地起的服务(需要自己配置)
  "hosts": {
    "*.localhost": "127.0.0.1"
  }
}
```
运行
```bash
// 配置代理（heandless运行）
HTTP_PROXY=http://192.168.100.128:8224 npx cypress run

// 客户端运行
HTTP_PROXY=http://192.168.100.128:8224 npx cypress run -b chrome --headed --no-exit --config watchForFileChanges=true

```

