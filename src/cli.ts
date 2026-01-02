#!/usr/bin/env node

import { MCPClient } from "./index.js";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "mcp> ",
});

let client: MCPClient | null = null;

function printHelp() {
  console.log(`
Available commands:
  connect <command> [args...]  - Connect to an MCP server
  disconnect                   - Disconnect from the server
  tools                        - List available tools
  call <tool> [args...]       - Call a tool (args as JSON)
  prompts                      - List available prompts
  prompt <name> [args...]     - Get a prompt (args as JSON)
  resources                    - List available resources
  resource <uri>              - Read a resource
  info                        - Get server information
  help                        - Show this help
  exit                        - Exit the client
`);
}

async function handleCommand(line: string) {
  const parts = line.trim().split(/\s+/);
  const command = parts[0];
  const args = parts.slice(1);

  try {
    switch (command) {
      case "connect":
        if (args.length === 0) {
          console.log("Usage: connect <command> [args...]");
          break;
        }
        if (client) {
          console.log("Already connected. Disconnect first.");
          break;
        }
        client = new MCPClient({
          command: args[0],
          args: args.slice(1),
        });
        await client.connect();
        break;

      case "disconnect":
        if (!client) {
          console.log("Not connected to any server.");
          break;
        }
        await client.disconnect();
        client = null;
        break;

      case "tools":
        if (!client) {
          console.log("Not connected. Use 'connect' first.");
          break;
        }
        const tools = await client.listTools();
        console.log(JSON.stringify(tools, null, 2));
        break;

      case "call":
        if (!client) {
          console.log("Not connected. Use 'connect' first.");
          break;
        }
        if (args.length === 0) {
          console.log("Usage: call <tool> [args as JSON]");
          break;
        }
        const toolName = args[0];
        const toolArgs = args.length > 1 ? JSON.parse(args.slice(1).join(" ")) : {};
        const result = await client.callTool(toolName, toolArgs);
        console.log(JSON.stringify(result, null, 2));
        break;

      case "prompts":
        if (!client) {
          console.log("Not connected. Use 'connect' first.");
          break;
        }
        const prompts = await client.listPrompts();
        console.log(JSON.stringify(prompts, null, 2));
        break;

      case "prompt":
        if (!client) {
          console.log("Not connected. Use 'connect' first.");
          break;
        }
        if (args.length === 0) {
          console.log("Usage: prompt <name> [args as JSON]");
          break;
        }
        const promptName = args[0];
        const promptArgs = args.length > 1 ? JSON.parse(args.slice(1).join(" ")) : {};
        const promptResult = await client.getPrompt(promptName, promptArgs);
        console.log(JSON.stringify(promptResult, null, 2));
        break;

      case "resources":
        if (!client) {
          console.log("Not connected. Use 'connect' first.");
          break;
        }
        const resources = await client.listResources();
        console.log(JSON.stringify(resources, null, 2));
        break;

      case "resource":
        if (!client) {
          console.log("Not connected. Use 'connect' first.");
          break;
        }
        if (args.length === 0) {
          console.log("Usage: resource <uri>");
          break;
        }
        const uri = args[0];
        const resourceResult = await client.readResource(uri);
        console.log(JSON.stringify(resourceResult, null, 2));
        break;

      case "info":
        if (!client) {
          console.log("Not connected. Use 'connect' first.");
          break;
        }
        const info = await client.getServerInfo();
        console.log(JSON.stringify(info, null, 2));
        break;

      case "help":
        printHelp();
        break;

      case "exit":
        if (client) {
          await client.disconnect();
        }
        console.log("Goodbye!");
        process.exit(0);
        break;

      case "":
        break;

      default:
        console.log(`Unknown command: ${command}`);
        console.log("Type 'help' for available commands.");
    }
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : String(error));
  }
}

console.log("MCP Client - Model Context Protocol Client");
console.log("Type 'help' for available commands.");
printHelp();

rl.prompt();

rl.on("line", async (line) => {
  await handleCommand(line);
  rl.prompt();
});

rl.on("close", async () => {
  if (client) {
    await client.disconnect();
  }
  console.log("\nGoodbye!");
  process.exit(0);
});
