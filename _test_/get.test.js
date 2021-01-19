const { Router } = require("express");
const routes = Router();
const db = require("..src/db");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

let post_url = "localhost:4000/post_list";
let author_url = "localhost:4000/author_list";
let app = express();
const request = require("supertest");

describe("Get Hot", () => {
  test("Select in Hot", async () => {
    return await request(app)
      .get(post_url)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });
});

describe("Get Hot", () => {
  test("Select in Hot", async () => {
    return await request(app)
      .get(author_url)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });
});
