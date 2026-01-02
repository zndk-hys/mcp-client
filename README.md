# MCP Client

Model Context Protocol (MCP) サーバーと標準入出力 (stdio) で通信する汎用MCPクライアントです。

## 機能

- stdioトランスポートを使用して任意のMCPサーバーに接続
- ツールの一覧表示と呼び出し
- プロンプトの一覧表示と取得
- リソースの一覧表示と読み取り
- 対話型CLIインターフェース

## インストール

```bash
npm install
npm run build
```

## 使い方

### 基本的な使い方

MCPサーバーのコマンドを `--` の後に指定して起動します：

```bash
npm start -- <MCPサーバーのコマンド> [引数...]
```

### 使用例

```bash
# npxでMCPサーバーを起動する場合
npm start -- npx -y @modelcontextprotocol/server-everything

# Next.js Devtools MCPを使用する場合
npm start -- npx -y next-devtools-mcp@latest

# ローカルのサーバースクリプトを起動する場合
npm start -- node path/to/server.js
```

### 対話コマンド

起動後、以下のコマンドが使用できます：

#### ツール
- `tools` - 利用可能なツールの一覧を表示
- `call <tool> [args...]` - ツールを呼び出す（引数は有効なJSON形式）
  - 例: `call echo {"message": "Hello, World!"}`

#### プロンプト
- `prompts` - 利用可能なプロンプトの一覧を表示
- `prompt <name> [args...]` - プロンプトを取得（引数は有効なJSON形式）
  - 例: `prompt greeting {"name": "Alice"}`

#### リソース
- `resources` - 利用可能なリソースの一覧を表示
- `resource <uri>` - URIでリソースを読み取る

#### その他
- `info` - サーバー情報を取得
- `help` - ヘルプメッセージを表示
- `exit` - クライアントを終了

## セッション例

```
$ npm start -- npx -y @modelcontextprotocol/server-everything

Connected to MCP server
MCP Client - Model Context Protocol Client
Type 'help' for available commands.

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

mcp> exit
Goodbye!
```

## 開発

### ビルド

```bash
npm run build
```

### ウォッチモード

```bash
npm run dev
```

## ライセンス

MIT
