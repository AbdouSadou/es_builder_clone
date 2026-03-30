import { TreeNode } from "../types/tree";

export type ExportFormat = "json" | "txt" | "doc";

export function exportTree(tree: TreeNode, format: ExportFormat, filename = "decision-tree") {
  let content = "";
  let mimeType = "";
  let fileExtension = format;

  switch (format) {
    case "json":
      content = JSON.stringify(tree, null, 2);
      mimeType = "application/json";
      break;
    case "txt":
      content = buildTextTree(tree, 0);
      mimeType = "text/plain";
      break;
    case "doc":
      // A simple HTML file saved with .doc extension opens cleanly in MS Word
      content = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><title>Decision Tree Export</title></head>
        <body style="font-family: sans-serif;">
          <h1>Decision Tree</h1>
          <pre style="white-space: pre-wrap;">${buildTextTree(tree, 0)}</pre>
        </body>
        </html>
      `;
      mimeType = "application/msword";
      break;
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.${fileExtension}`;
  document.body.appendChild(a);
  a.click();
  
  // Cleanup
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function buildTextTree(node: TreeNode, depth: number): string {
  const indent = "  ".repeat(depth);
  let text = "";

  if (node.type === "decision") {
    text += `${indent}? ${node.question}\n`;
    if (node.children) {
      node.children.forEach((child) => {
        text += `${indent}  - [${child.label}]\n`;
        text += buildTextTree(child.node, depth + 2);
      });
    }
  } else if (node.type === "outcome") {
    text += `${indent}=> ${node.outcome}\n`;
  }

  return text;
}
