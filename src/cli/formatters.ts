import pc from "picocolors";

/**
 * Format multi-line text with proper indentation
 */
function formatMultiLineText(text: string, prefix: string, colorFn: (str: string) => string = pc.white): string[] {
  const lines: string[] = [];
  const textLines = text.split(/\r?\n/);

  textLines.forEach((line, index) => {
    if (index === 0) {
      lines.push(prefix + colorFn(line));
    } else {
      // Subsequent lines get the same indentation (calculate based on prefix length without ANSI codes)
      const baseIndent = "  ";
      lines.push(baseIndent + colorFn(line));
    }
  });

  return lines;
}

/**
 * Format tools list for display
 */
export function formatTools(tools: any[]): string {
  if (!tools || tools.length === 0) {
    return pc.yellow("\n⚠  No tools available.\n");
  }

  const lines: string[] = [
    "",
    pc.bold(pc.cyan("🛠  Available Tools")) + pc.dim(` (${tools.length})`),
    "",
  ];

  tools.forEach((tool, index) => {
    // Tool name with index
    lines.push(pc.bold(pc.green(`${index + 1}. ${tool.name}`)));

    // Description
    if (tool.description) {
      const descLines = formatMultiLineText(
        tool.description,
        "  ",
        pc.white
      );
      lines.push(...descLines);
    }

    // Input Schema
    if (tool.inputSchema) {
      if (tool.inputSchema.properties) {
        const props = tool.inputSchema.properties;
        const required = tool.inputSchema.required || [];

        const propKeys = Object.keys(props);
        if (propKeys.length > 0) {
          lines.push(pc.dim("  Parameters:"));

          propKeys.forEach((key) => {
            const prop = props[key];
            const isRequired = required.includes(key);
            const requiredTag = isRequired
              ? pc.red(" [required]")
              : pc.dim(" [optional]");

            lines.push(
              "    " +
              pc.yellow("• ") +
              pc.magenta(key) +
              pc.dim(`: ${prop.type}`) +
              requiredTag
            );

            if (prop.description) {
              const propDescLines = formatMultiLineText(
                prop.description,
                "      ",
                pc.dim
              );
              lines.push(...propDescLines);
            }
          });
        }
      }
    }

    // Add separator between tools
    if (index < tools.length - 1) {
      lines.push("");
    }
  });

  lines.push("");

  return lines.join("\n");
}

/**
 * Format prompts list for display
 */
export function formatPrompts(prompts: any[]): string {
  if (!prompts || prompts.length === 0) {
    return pc.yellow("\n⚠  No prompts available.\n");
  }

  const lines: string[] = [
    "",
    pc.bold(pc.cyan("💬 Available Prompts")) + pc.dim(` (${prompts.length})`),
    "",
  ];

  prompts.forEach((prompt, index) => {
    // Prompt name with index
    lines.push(pc.bold(pc.green(`${index + 1}. ${prompt.name}`)));

    // Description
    if (prompt.description) {
      const descLines = formatMultiLineText(
        prompt.description,
        "  ",
        pc.white
      );
      lines.push(...descLines);
    }

    // Arguments
    if (prompt.arguments && prompt.arguments.length > 0) {
      lines.push(pc.dim("  Arguments:"));

      prompt.arguments.forEach((arg: any) => {
        const requiredTag = arg.required
          ? pc.red(" [required]")
          : pc.dim(" [optional]");

        lines.push(
          "    " +
          pc.yellow("• ") +
          pc.magenta(arg.name) +
          requiredTag
        );

        if (arg.description) {
          const argDescLines = formatMultiLineText(
            arg.description,
            "      ",
            pc.dim
          );
          lines.push(...argDescLines);
        }
      });
    }

    // Add separator between prompts
    if (index < prompts.length - 1) {
      lines.push("");
    }
  });

  lines.push("");

  return lines.join("\n");
}

/**
 * Format resources list for display
 */
export function formatResources(resources: any[]): string {
  if (!resources || resources.length === 0) {
    return pc.yellow("\n⚠  No resources available.\n");
  }

  const lines: string[] = [
    "",
    pc.bold(pc.cyan("📦 Available Resources")) + pc.dim(` (${resources.length})`),
    "",
  ];

  resources.forEach((resource, index) => {
    // Resource name with index
    const name = resource.name || resource.uri;
    lines.push(pc.bold(pc.green(`${index + 1}. ${name}`)));

    // URI
    lines.push("  " + pc.dim("URI: ") + pc.blue(resource.uri));

    // Description
    if (resource.description) {
      const descLines = formatMultiLineText(
        resource.description,
        "  ",
        pc.white
      );
      lines.push(...descLines);
    }

    // MIME Type
    if (resource.mimeType) {
      lines.push("  " + pc.dim("MIME Type: ") + pc.yellow(resource.mimeType));
    }

    // Add separator between resources
    if (index < resources.length - 1) {
      lines.push("");
    }
  });

  lines.push("");

  return lines.join("\n");
}
