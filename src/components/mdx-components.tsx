// src/components/mdx-components.tsx
const mdxComponents = {
  h1: (props: any) => <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-semibold mt-5 mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />,
  p: (props: any) => <p className="text-gray-700 leading-relaxed mb-3" {...props} />,
  a: (props: any) => <a className="text-blue-600 underline hover:no-underline" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside pl-4 mb-4" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside pl-4 mb-4" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4" {...props} />
  ),
  code: (props: any) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props} />,
};

export default mdxComponents;
