"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1
              className="text-2xl font-bold mt-6 mb-4 text-slate-800"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="text-xl font-semibold mt-5 mb-3 text-slate-800"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              className="text-lg font-semibold mt-4 mb-2 text-slate-800"
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-4 leading-relaxed text-gray-700" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul
              className="list-disc list-inside mb-4 space-y-1 ml-4 text-gray-700"
              {...props}
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              className="list-decimal list-inside mb-4 space-y-1 ml-4 text-gray-700"
              {...props}
            />
          ),
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          code: ({ node, inline, ...props }: any) => {
            if (inline) {
              return (
                <code
                  className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800"
                  {...props}
                />
              );
            }
            return (
              <code
                className="block bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono"
                {...props}
              />
            );
          },
          pre: ({ node, ...props }) => (
            <pre
              className="bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4"
              {...props}
            />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-600 bg-blue-50 py-2"
              {...props}
            />
          ),
          a: ({ node, ...props }) => (
            <a
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-slate-800" {...props} />
          ),
          em: ({ node, ...props }) => <em className="italic" {...props} />,
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table
                className="min-w-full border-collapse border border-gray-300"
                {...props}
              />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-gray-200" {...props} />
          ),
          tbody: ({ node, ...props }) => <tbody {...props} />,
          tr: ({ node, ...props }) => (
            <tr
              className="border-b border-gray-300 hover:bg-gray-50"
              {...props}
            />
          ),
          th: ({ node, ...props }) => (
            <th
              className="border border-gray-300 px-4 py-2 text-left font-semibold text-slate-800"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td
              className="border border-gray-300 px-4 py-2 text-gray-700"
              {...props}
            />
          ),
          hr: ({ node, ...props }) => (
            <hr className="border-gray-300 my-6" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
