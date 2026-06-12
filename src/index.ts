import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 1. Inicializa o servidor MCP usando a nova API de alto nível
const server = new McpServer({
    name: "meu-servidor-typescript",
    version: "1.0.0",
});

// 2. Define a ferramenta usando Zod para validação automática de tipos e geração de schema
server.tool(
    "calcular_imc",
    "Calcula o Índice de Massa Corporal (IMC) com base no peso e altura fornecidos.",
    {
        peso: z.number().describe("O peso em quilogramas (ex: 75.5)"),
        altura: z.number().describe("A altura em metros (ex: 1.75)"),
    },
    async ({ peso, altura }) => {
        if (!peso || !altura || altura <= 0) {
            return {
                content: [{ type: "text", text: "Erro: Parâmetros inválidos para o cálculo." }],
                isError: true,
            };
        }

        const imc = peso / (altura * altura);
        let classificacao = "";

        if (imc < 18.5) classificacao = "Abaixo do peso";
        else if (imc < 25) classificacao = "Peso normal";
        else if (imc < 30) classificacao = "Sobrepeso";
        else classificacao = "Obesidade";

        return {
            content: [
                {
                    type: "text",
                    text: `O IMC calculado é **${imc.toFixed(2)}**. Classificação: **${classificacao}**.`,
                },
            ],
        };
    }
);

// 3. Conecta o servidor usando transporte via Stdio
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Servidor MCP em TypeScript rodando via stdio com McpServer!");
}

main().catch(console.error);