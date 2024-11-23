import { CosmosClient } from "@azure/cosmos";

export const cosmoDBClient = new CosmosClient({
    endpoint: "https://nutripilot-ai.documents.azure.com:443/",
    key: "jcdABNcVpFu9H0RJqLeLGHWneVAAramnTFPIUmRl6tQnBNykXg4XpyZb3waUrZgE94hz0nz2HaeTACDbiOqejw==",
  });