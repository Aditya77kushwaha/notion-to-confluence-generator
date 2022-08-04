import { Client } from "@notionhq/client";
import "dotenv/config";

const notion = new Client({ auth: process.env.NOTION_KEY });

// test : retrieve a notion page
export const getPage = async (id) => {
  const response = await notion.pages.retrieve({ page_id: id });
  const title = response.properties.title.title.map((x) => {
    return x;
  });
  // console.log(title);
  console.log("page", response);
};
