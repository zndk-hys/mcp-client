import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import {
  ListToolsResultSchema,
  CallToolResultSchema,
  ListPromptsResultSchema,
  GetPromptResultSchema,
  ListResourcesResultSchema,
  ReadResourceResultSchema,
} from "@modelcontextprotocol/sdk/types.js";
import type { MCPClientOptions } from "./types.js";

export class MCPClient {
  private client: Client;
  private transport: StdioClientTransport;

  constructor(private options: MCPClientOptions) {
    this.client = new Client(
      {
        name: "mcp-client",
        version: "1.0.0",
      },
      {
        capabilities: {},
      }
    );

    this.transport = new StdioClientTransport({
      command: options.command,
      args: options.args || [],
      env: options.env,
    });
  }

  async connect(): Promise<void> {
    await this.client.connect(this.transport);
    console.log("Connected to MCP server");
  }

  async disconnect(): Promise<void> {
    await this.client.close();
    console.log("Disconnected from MCP server");
  }

  async listTools(): Promise<any> {
    const response = await this.client.request(
      { method: "tools/list" },
      ListToolsResultSchema
    );
    return response.tools;
  }

  async callTool(name: string, args?: Record<string, unknown>): Promise<any> {
    const response = await this.client.request(
      {
        method: "tools/call",
        params: {
          name,
          arguments: args || {},
        },
      },
      CallToolResultSchema
    );
    return response;
  }

  async listPrompts(): Promise<any> {
    const response = await this.client.request(
      { method: "prompts/list" },
      ListPromptsResultSchema
    );
    return response.prompts;
  }

  async getPrompt(name: string, args?: Record<string, string>): Promise<any> {
    const response = await this.client.request(
      {
        method: "prompts/get",
        params: {
          name,
          arguments: args || {},
        },
      },
      GetPromptResultSchema
    );
    return response;
  }

  async listResources(): Promise<any> {
    const response = await this.client.request(
      { method: "resources/list" },
      ListResourcesResultSchema
    );
    return response.resources;
  }

  async readResource(uri: string): Promise<any> {
    const response = await this.client.request(
      {
        method: "resources/read",
        params: {
          uri,
        },
      },
      ReadResourceResultSchema
    );
    return response;
  }

  async getServerInfo(): Promise<any> {
    return {
      name: this.client.getServerVersion()?.name || "Unknown",
      version: this.client.getServerVersion()?.version || "Unknown",
    };
  }
}
