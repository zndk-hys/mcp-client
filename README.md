# MCP Client

A generic Model Context Protocol (MCP) client that communicates with MCP servers via standard input/output (stdio).

## Features

- Connect to any MCP server using stdio transport
- List and call tools
- List and get prompts
- List and read resources
- Interactive CLI interface
- TypeScript support

## Installation

```bash
npm install
npm run build
```

## Usage

### Using npx (local)

```bash
npx mcp-client
```

### Interactive Commands

Once the client is running, you can use the following commands:

#### Connection
- `connect <command> [args...]` - Connect to an MCP server
  - Example: `connect npx @modelcontextprotocol/server-everything`
  - Example: `connect node path/to/server.js`
- `disconnect` - Disconnect from the current server

#### Tools
- `tools` - List all available tools
- `call <tool> [args...]` - Call a tool (args should be valid JSON)
  - Example: `call echo {"message": "Hello, World!"}`

#### Prompts
- `prompts` - List all available prompts
- `prompt <name> [args...]` - Get a prompt (args should be valid JSON)
  - Example: `prompt greeting {"name": "Alice"}`

#### Resources
- `resources` - List all available resources
- `resource <uri>` - Read a resource by URI

#### Other
- `info` - Get server information
- `help` - Show help message
- `exit` - Exit the client

## Example Session

```
MCP Client - Model Context Protocol Client
Type 'help' for available commands.

mcp> connect npx @modelcontextprotocol/server-everything
Connected to MCP server

mcp> tools
[
  {
    "name": "echo",
    "description": "Echoes back the input",
    "inputSchema": {
      "type": "object",
      "properties": {
        "message": {
          "type": "string"
        }
      }
    }
  }
]

mcp> call echo {"message": "Hello!"}
{
  "content": [
    {
      "type": "text",
      "text": "Hello!"
    }
  ]
}

mcp> disconnect
Disconnected from MCP server

mcp> exit
Goodbye!
```

## Development

### Build

```bash
npm run build
```

### Watch Mode

```bash
npm run dev
```

## API

You can also use this as a library:

```typescript
import { MCPClient } from 'mcp-client';

const client = new MCPClient({
  command: 'npx',
  args: ['@modelcontextprotocol/server-everything'],
});

await client.connect();
const tools = await client.listTools();
console.log(tools);

await client.disconnect();
```

## License

MIT
