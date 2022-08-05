import { Client } from "@notionhq/client";
import "dotenv/config";

const notion = new Client({ auth: process.env.NOTION_KEY });

export const getBlock = async (blockId) => {
  // const blockId = "c02fc1d3-db8b-45c5-a222-27595b15aea7";
  const response = await notion.blocks.retrieve({
    block_id: blockId,
  });
  console.log(response);
};

export const getBlockChildren = async (blockId) => {
  // const blockId = "59833787-2cf9-4fdf-8782-e53db20768a5";
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  console.log(response);
};
