import "dotenv/config";
import { getdB } from "./utils/notion/dBRequests.js";
import { getPage } from "./utils/notion/pageRequests.js";

const databaseId = process.env.NOTION_DATABASE_ID;
const pageId = "80d942ca-733d-4774-a056-f61b55a4c5e2";

// calling required functions
getdB(databaseId);
getPage(pageId);
