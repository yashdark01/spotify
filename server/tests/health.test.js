import { test } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/index.js";

test("GET /api is public and returns health check", async () => {
  const res = await request(app).get("/api");
  assert.equal(res.status, 200);
  assert.equal(res.text, "Hello World!");
});

test("GET /api/songs requires authentication", async () => {
  const res = await request(app).get("/api/songs");
  assert.equal(res.status, 401);
});

test("POST /api/auth/callback requires authentication", async () => {
  const res = await request(app)
    .post("/api/auth/callback")
    .send({ id: "test", firstName: "Test", lastName: "User", imageUrl: "" });
  assert.equal(res.status, 401);
});
