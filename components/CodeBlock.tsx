interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code }: CodeBlockProps) {
  return (
    <pre className="relative rounded-lg bg-muted p-4 overflow-x-auto">
      <code className="text-sm font-mono">{code}</code>
    </pre>
  );
}