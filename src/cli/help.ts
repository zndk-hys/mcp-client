export function printHelp() {
  console.log(`
Available commands:
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
