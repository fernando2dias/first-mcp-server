# Meu MCP Server TypeScript

Um servidor local utilizando o **Model Context Protocol (MCP)** construído com TypeScript, utilizando a nova API `McpServer` e a biblioteca `zod` para validação de esquemas de forma moderna e declarativa.

## 🚀 Ferramentas Disponíveis

Este servidor expõe a seguinte ferramenta (tool) aos clientes MCP:

- **`calcular_imc`**: Calcula o Índice de Massa Corporal (IMC) com base no `peso` (kg) e `altura` (metros) fornecidos e retorna o valor e a classificação (Abaixo do peso, Peso normal, Sobrepeso, Obesidade).

## 🛠️ Instalação

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

1. Navegue até o diretório do projeto:
```bash
cd /home/fernando/Desktop/Projetos/meu-mcp-server-ts
```

2. Instale as dependências:
```bash
npm install
```

## ▶️ Como executar (Testes Locais)

O servidor se comunica através da entrada e saída padrão (Stdio). Você pode rodá-lo da seguinte forma:

```bash
npx tsx src/index.ts
```

*(Nota: Como o servidor se comunica por Stdio, ele ficará "preso" no console esperando que mensagens JSON-RPC sejam enviadas pelo terminal. Para usá-lo na prática, é necessário integrá-lo com um Cliente MCP).*

## 🔌 Como integrar no Claude Desktop ou Antigravity

Para usar esse servidor no seu assistente de Inteligência Artificial que suporte o Model Context Protocol (como Claude Desktop, Antigravity ou Cursor), você precisa adicionar este servidor no arquivo de configuração do cliente desejado.

Exemplo de configuração para clientes MCP (geralmente inserido em um `mcp_config.json`, `claude_desktop_config.json`, etc):

```json
{
  "mcpServers": {
    "meu-servidor-imc": {
      "command": "npx",
      "args": [
        "tsx",
        "/home/fernando/Desktop/Projetos/meu-mcp-server-ts/src/index.ts"
      ]
    }
  }
}
```

Isso fará com que o cliente inicialize o processo do Node nos bastidores e ganhe a capacidade de invocar o cálculo do IMC autonomamente quando conversar com você!

## 📦 Tecnologias Utilizadas

- **TypeScript**
- **@modelcontextprotocol/sdk** (Para implementar o MCP de forma fácil com `McpServer`)
- **Zod** (Para garantir a tipagem e os schemas da ferramenta)
- **tsx** (Para execução direta do código em TypeScript)
