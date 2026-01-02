#!/usr/bin/env node

import { MCPClient } from "../client/MCPClient.js";
import * as readline from "readline";
import { handleCommand } from "./commandHandler.js";
import { printHelp } from "./help.js";

// Parse command-line arguments
// Format: mcp-client -- <command> [args...]
const args = process.argv.slice(2);
const separatorIndex = args.indexOf("--");

if (separatorIndex === -1 || separatorIndex === args.length - 1) {
  console.error("Usage: mcp-client -- <command> [args...]");
  console.error("Example: mcp-client -- npx -y next-devtools-mcp@latest");
  process.exit(1);
}

const mcpCommand = args[separatorIndex + 1];
const mcpArgs = args.slice(separatorIndex + 2);

// Create and connect to MCP server
let client: MCPClient | null = null;

(async () => {
  try {
    client = new MCPClient({
      command: mcpCommand,
      args: mcpArgs,
    });
    await client.connect();

    console.log("MCP Client - Model Context Protocol Client");
    console.log("Type 'help' for available commands.");
    printHelp();

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "mcp> ",
    });

    rl.prompt();

    rl.on("line", async (line) => {
      client = await handleCommand(line, client);
      rl.prompt();
    });

    rl.on("close", async () => {
      if (client) {
        await client.disconnect();
      }
      console.log("\nGoodbye!");
      process.exit(0);
    });
  } catch (error) {
    console.error("Failed to connect to MCP server:", error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
})();
