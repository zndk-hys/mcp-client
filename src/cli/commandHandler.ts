import { MCPClient } from "../client/MCPClient.js";
import { printHelp } from "./help.js";

export async function handleCommand(
  line: string,
  client: MCPClient | null
): Promise<MCPClient | null> {
  const parts = line.trim().split(/\s+/);
  const command = parts[0];
  const args = parts.slice(1);

  try {
    switch (command) {
      case "tools":
        if (!client) {
          console.log("Error: Not connected to MCP server.");
          break;
        }
        const tools = await client.listTools();
        console.log(JSON.stringify(tools, null, 2));
        break;

      case "call":
        if (!client) {
          console.log("Error: Not connected to MCP server.");
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
          console.log("Error: Not connected to MCP server.");
          break;
        }
        const prompts = await client.listPrompts();
        console.log(JSON.stringify(prompts, null, 2));
        break;

      case "prompt":
        if (!client) {
          console.log("Error: Not connected to MCP server.");
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
          console.log("Error: Not connected to MCP server.");
          break;
        }
        const resources = await client.listResources();
        console.log(JSON.stringify(resources, null, 2));
        break;

      case "resource":
        if (!client) {
          console.log("Error: Not connected to MCP server.");
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
          console.log("Error: Not connected to MCP server.");
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

  return client;
}
