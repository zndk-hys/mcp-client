/**
 * Format tools list for display
 */
export function formatTools(tools: any[]): string {
  if (!tools || tools.length === 0) {
    return "No tools available.";
  }

  const lines: string[] = [
    `\nAvailable Tools (${tools.length}):\n`,
    "=".repeat(50),
  ];

  tools.forEach((tool, index) => {
    lines.push(`\n${index + 1}. ${tool.name}`);
    if (tool.description) {
      lines.push(`   Description: ${tool.description}`);
    }
    if (tool.inputSchema) {
      lines.push(`   Input Schema:`);
      const schemaStr = JSON.stringify(tool.inputSchema, null, 2);
      schemaStr.split('\n').forEach(line => {
        lines.push(`     ${line}`);
      });
    }
  });

  lines.push("\n" + "=".repeat(50));
  return lines.join("\n");
}

/**
 * Format prompts list for display
 */
export function formatPrompts(prompts: any[]): string {
  if (!prompts || prompts.length === 0) {
    return "No prompts available.";
  }

  const lines: string[] = [
    `\nAvailable Prompts (${prompts.length}):\n`,
    "=".repeat(50),
  ];

  prompts.forEach((prompt, index) => {
    lines.push(`\n${index + 1}. ${prompt.name}`);
    if (prompt.description) {
      lines.push(`   Description: ${prompt.description}`);
    }
    if (prompt.arguments && prompt.arguments.length > 0) {
      lines.push(`   Arguments:`);
      prompt.arguments.forEach((arg: any) => {
        const required = arg.required ? " (required)" : " (optional)";
        lines.push(`     - ${arg.name}${required}`);
        if (arg.description) {
          lines.push(`       ${arg.description}`);
        }
      });
    }
  });

  lines.push("\n" + "=".repeat(50));
  return lines.join("\n");
}

/**
 * Format resources list for display
 */
export function formatResources(resources: any[]): string {
  if (!resources || resources.length === 0) {
    return "No resources available.";
  }

  const lines: string[] = [
    `\nAvailable Resources (${resources.length}):\n`,
    "=".repeat(50),
  ];

  resources.forEach((resource, index) => {
    lines.push(`\n${index + 1}. ${resource.name || resource.uri}`);
    lines.push(`   URI: ${resource.uri}`);
    if (resource.description) {
      lines.push(`   Description: ${resource.description}`);
    }
    if (resource.mimeType) {
      lines.push(`   MIME Type: ${resource.mimeType}`);
    }
  });

  lines.push("\n" + "=".repeat(50));
  return lines.join("\n");
}
