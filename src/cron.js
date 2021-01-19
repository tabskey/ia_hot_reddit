const fetch = require("node-fetch");
const db = require("./db");
const cron = require("node-cron");
const mysql = require("mysql2");
const logger = require("./logger");

let everyday = "0 8 * * *";
//let everymin = "* *  * * *";

cron.schedule(everyday, async () => {
  try {
    let sql =
      "INSERT INTO `dailyhot` (post_title, author, num_comments, createdDt, ups) VALUES ?";
    let posts = [];
    const json = await fetch(
      "http://www.reddit.com/r/artificial/hot.json"
    ).then((response) => response.json());

    for (let i = 0; i < json.data.children.length; i++) {
      // console.log(json.data.children[i]['data']['title']);
      let values = [
        json.data.children[i]["data"]["title"],
        json.data.children[i]["data"]["author"],
        json.data.children[i]["data"]["num_comments"],
        json.data.children[i]["data"]["created"],
        json.data.children[i]["data"]["ups"],
      ];
      posts.push(values);
    }
    await (await db).query(sql, [posts]);
    logger.log("info", `Inserido com sucesso`);
  } catch (error) {
    console.log(error);
    logger.log("error", ` Caught exception: ${error.message}\n`);
  }
});
