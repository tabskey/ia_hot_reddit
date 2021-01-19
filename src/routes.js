const { Router } = require("express");
const routes = Router();
const db = require("./db");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

routes.get("/post_list", async (req, res) => {
  try {
    let startDate = dayjs(req.query.StartDate, "YYYY-MM-DD", true);
    let endDate = dayjs(req.query.EndDate, "YYYY-MM-DD", true);
    let order = req.query.Order;

    if (!startDate.isValid()) {
      throw new Error(
        "The startDate parameter is not valid, must be on date format(YYYY-mm-dd)"
      );
    }
    if (!endDate.isValid()) {
      throw new Error(
        "The endDate parameter is not valid, must be on date format(YYYY-mm-dd)"
      );
    }
    if (!order) {
      throw new Error("The order parameter is required");
    }
    if (!["Comments_Num", "Ups_Num"].includes(order)) {
      throw new Error(
        "Parameters not allowed, only accept Comments_Num and Ups_Num"
      );
    }
    if (order === "Comments_Num") {
      order = "num_comments";
    } else if (order === "Ups_Num") {
      order = "ups";
    }
    startDate = startDate.unix();
    endDate = endDate.unix();

    const [rows] = await (await db).execute(
      `SELECT * , from_unixtime(dailyhot.createdDt) AS CREATED FROM dailyhot WHERE createdDt BETWEEN ? AND ?
      ORDER BY ${order} DESC`,
      [startDate, endDate]
    );
    return res.json(rows);
  } catch (e) {
    return res.json({ message: e.message });
  }
});
routes.get("/author_list", async (req, res) => {
  try {
    let order = req.query.Order;

    if (!order) {
      throw new Error("The order parameter is required");
    }
    if (order === "Comments_Num") {
      order = "num_comments";
    } else if (order === "Ups_Num") {
      order = "ups";
    }

    const [rows] = await (await db).execute(
      `SELECT DISTINCT(author) FROM dailyhot ORDER BY ${order} DESC`
    );
    return res.json(rows);
  } catch (e) {
    return res.json({ message: e.message });
  }
});
module.exports = routes;
