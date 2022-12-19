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

## Test
```
const request = require("supertest");
const app = require("./app");

describe("Todos", () => {
  it("GET/todos --> array todos", () => {
    return request(app)
      .get("/todos")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((respnose) => {
        expect(respnose.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              completed: expect.any(Boolean),
            }),
          ])
        );
      });
  });

  it("GET/todos/id --> specific todos by id", () => {
    return request(app)
      .get("/todos/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: expect.any(String),
            completed: expect.any(Boolean),
          })
        );
      });
  });

  it("GET/todos/id --> 404 NOT FOUND", () => {
    return request(app).get("/todos/999999").expect(404);
  });

  it("POST/todos --> create todo", () => {
    return request(app)
      .post("/todos")
      .send({
        name: "do dishs",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((respnose) => {
        expect(respnose.body).toEqual(
          expect.objectContaining({
            name: "do dishs",
            completed: false,
          })
        );
      });
  });

  it("POST/todos --> validate request body", () => {
    return request(app).post("/todos").send({ name: 123 }).expect(422);
  });
});

```
## API
```
<!--todo.js-->
const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const todos = [{ id: 1, name: "ddsd", completed: false }];

router.get("/", function (req, res, next) {
  res.json(todos);
});

router.get("/:id", function (req, res, next) {
  const foundTodo = todos.find((todo) => todo.id === Number(req.params.id));

  if (!foundTodo) {
    return next(createError(404, "NOT FOUND"));
  }

  res.json(foundTodo);
});

router.post("/", function (req, res, next) {
  const { body } = req;

  if(typeof body.name!=="string"){
    return next(createError(422,'Validation Error'))
  }
  const newTodo={
    id:todos.length+1,
    name:body.name,
    completed:false
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

module.exports = router;

```

![](https://i.imgur.com/WiGpzRP.jpg)

## result
![](https://i.imgur.com/LGLcotg.jpg)


## Ref
[Supertest doc](https://www.npmjs.com/package/supertest)
[Express doc](https://expressjs.com/en/starter/installing.html)
[NodeJS Express Test-Driven API Development (TDD)](https://www.youtube.com/watch?v=M44umyYPiuo&ab_channel=MariusEspejo)
