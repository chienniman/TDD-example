const express = require("express");
const request = require("supertest");

const bookRoute = require("../routes/books.route");
const app = express();

app.use(express.json());
app.use("/api/books", bookRoute);

describe("Intergrtion tests for books API", () => {
    it("GET/api/books - success - get all the books", async () => {
        const { body, statusCode } = await request(app).get("/api/books");

        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    author: expect.any(String),
                }),
            ])
        );
        expect(statusCode).toBe(200);
    });

    it("POST/api/books - success", async () => {
        const { body, statusCode } = await request(app)
            .post("/api/books")
            .send({
                name: "Software Architecture in Practice",
                author: "Bass, Len",
            });

        expect(body).toEqual({
            message: "Success",
        });
        expect(statusCode).toBe(200);
    });

    it("POST/api/books - faliure on invalid post", async () => {
        const { body, statusCode } = await request(app)
            .post("/api/books")
            .send({
                name: "",
                author: "John, Doe",
            });

        expect(body).toEqual({
            message: "Success",
        });
        expect(statusCode).toBe(400);
    });

    it("PUT/api/books/:bookid - failure when book is not found", async () => {
        const { body, statusCode } = await request(app)
            .put("/api/books/5000")
            .send({
                name: "Clean Code",
                author: "Robert Cecil Martin",
            });

        expect(body).toEqual({
            error: true,
            message: "book not found",
        });
        expect(statusCode).toBe(404);
    });

    it("PUT/api/books/:bookid - Success update book", async () => {
        const { body, statusCode } = await request(app)
            .put("/api/books/2")
            .send({
                name: "Operating System Concepts",
                author: "Abraham Silberschatz",
            });

        expect(body).toEqual({
            name: "Operating System Concepts",
            author: 'Abraham Silberschatz"',
            id: 2,
        });
        expect(statusCode).toBe(204);
    });

    it("Delete /api/books/:bookid", async () => {
        const { body, statusCode } = await request(app).delete("/api/books/3");

        expect(body).toEqual({
            message: "Success",
        });
        expect(statusCode).toBe(204);
    });

    it("Delete /api/books/:bookid - failure when book is not found", async () => {
        const { body, statusCode } = await request(app).delete(
            "/api/books/5000"
        );

        expect(body).toEqual({
            error: "Book not found",
            message: "Success",
        });
        expect(statusCode).toBe(204);
    });
});
