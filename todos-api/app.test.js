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
