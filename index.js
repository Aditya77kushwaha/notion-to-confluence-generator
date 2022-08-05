import "dotenv/config";
import { getdB } from "./utils/notion/dBRequests.js";
import { getPage } from "./utils/notion/pageRequests.js";
import { getBlock } from "./utils/notion/blockRequests.js";
import { getChildrenByIdAndType } from "./utils/confluence/contentChildren.js";
import { postContent } from "./utils/confluence/content.js";
import { getChildrenById } from "./utils/confluence/contentChildren.js";
import { Client } from "@notionhq/client";
import Confluence from "confluence-api";
import "dotenv/config";

const notion = new Client({ auth: process.env.NOTION_KEY });

const databaseId = process.env.NOTION_DATABASE_ID;
const pageId = "80d942ca-733d-4774-a056-f61b55a4c5e2";

const config = {
  username: "adityakushwaha@gmail.com",
  password: process.env.CONF_API,
  baseUrl: `https://adityakushwaha.atlassian.net/wiki`,
  version: 4, // Confluence major version, optional
};

const confluence = new Confluence(config);

// calling required functions

// getdB(databaseId);
// getPage(pageId);
// getChildrenById(196725); //get all items in a confluence content
// getChildrenByIdAndType(98377, "comment"); //get all items in a notion page

// const myHtml = "hello world";
// createContent(myHtml);

// const block = getBlock(pageId);
// console.log(block);

// postContent("notion-to-confluence", "new", "hi", null);

//generator

async function generate(pageId) {
  const response = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 50,
  });
  //   console.log(response.results);
  response.results.forEach(async (block) => {
    switch (block.type) {
      case "paragraph":
        // console.log(block.paragraph.rich_text);
        confluence.postContent(
          "notion-to-confluence",
          "new para",
          block.paragraph.rich_text,
          "98377",
          function (err, res) {
            if (!err) {
              console.log("Page updated");
            } else {
              console.log("Error: " + err);
              console.log("Response: " + JSON.stringify(res));
            }
          }
        );
        break;
      case "to_do":
        // console.log(block.to_do.rich_text);
        confluence.postContent(
          "notion-to-confluence",
          "new todo",
          block.to_do.rich_text,
          "98377",
          function (err, res) {
            if (!err) {
              console.log("Page updated");
            } else {
              console.log("Error: " + err);
              console.log("Response: " + JSON.stringify(res));
            }
          }
        );
        break;
      case "bulleted_list_item":
        // console.log(block.bulleted_list_item.rich_text);
        confluence.postContent(
          "notion-to-confluence",
          "new list",
          block.bulleted_list_item.rich_text,
          "98377",
          function (err, res) {
            if (!err) {
              console.log("Page updated");
            } else {
              console.log("Error: " + err);
              console.log("Response: " + JSON.stringify(res));
            }
          }
        );
        break;
      case "numbered_list_item":
        // console.log(block.numbered_list_item.rich_text);
        confluence.postContent(
          "notion-to-confluence",
          "new list",
          block.numbered_list_item.rich_text,
          "98377",
          function (err, res) {
            if (!err) {
              console.log("Page updated");
            } else {
              console.log("Error: " + err);
              console.log("Response: " + JSON.stringify(res));
            }
          }
        );
        break;
      case "child_database":
        // console.log(block);
        generate(block.id); //call recursively for sub page
        break;
      case "heading_1":
        // console.log(block.heading_1.rich_text);
        confluence.postContent(
          "notion-to-confluence",
          "new heading",
          block.heading_1.rich_text,
          "98377",
          function (err, res) {
            if (!err) {
              console.log("Page updated");
            } else {
              console.log("Error: " + err);
              console.log("Response: " + JSON.stringify(res));
            }
          }
        );
        break;
      case "heading_2":
        // console.log(block.heading_2.rich_text);
        confluence.postContent(
          "notion-to-confluence",
          "new heading",
          block.heading_2.rich_text,
          "98377",
          function (err, res) {
            if (!err) {
              console.log("Page updated");
            } else {
              console.log("Error: " + err);
              console.log("Response: " + JSON.stringify(res));
            }
          }
        );
        break;
      case "heading_3":
        // console.log(block.heading_3.rich_text);
        confluence.postContent(
          "notion-to-confluence",
          "new heading",
          block.heading_3.rich_text,
          "98377",
          function (err, res) {
            if (!err) {
              console.log("Page updated");
            } else {
              console.log("Error: " + err);
              console.log("Response: " + JSON.stringify(res));
            }
          }
        );
        break;
      case "table":
        // console.log(block.heading_3.rich_text);
        confluence.postContent(
          "notion-to-confluence",
          "new table",
          block.table,
          "98377",
          function (err, res) {
            if (!err) {
              console.log("Page updated");
            } else {
              console.log("Error: " + err);
              console.log("Response: " + JSON.stringify(res));
            }
          }
        );
        break;
      case "code":
        // console.log(block.heading_3.rich_text);
        confluence.postContent(
          "notion-to-confluence",
          `new ${block.code.language} code`,
          block.code.rich_text,
          "98377",
          function (err, res) {
            if (!err) {
              console.log("Page updated");
            } else {
              console.log("Error: " + err);
              console.log("Response: " + JSON.stringify(res));
            }
          }
        );
        break;

      default:
        console.log(block);
        console.log("Cannot generate for this notion block");
        break;
    }
  });

  //   return response;
}

generate(pageId);
