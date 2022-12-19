# TDD-example
# NodeJS Express TDD(jest+supertest)
## startup
```
npx express-generator // 安裝
```

```
npm install -D jest supertest // 下載測試
```

```
npm test // 開啟測試
```

## Package.json
```
 "scripts": {
    "start": "node ./bin/www",
    "test": "jest --watchAll"
  },
```
先寫測試，然後開發API，直到通過每一個測試

![](https://i.imgur.com/WiGpzRP.jpg)

## result
![](https://i.imgur.com/LGLcotg.jpg)

## Ref
[Supertest doc](https://www.npmjs.com/package/supertest)
[Express doc](https://expressjs.com/en/starter/installing.html)
[NodeJS Express Test-Driven API Development (TDD)](https://www.youtube.com/watch?v=M44umyYPiuo&ab_channel=MariusEspejo)
