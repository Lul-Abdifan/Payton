export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  items: FAQItem[];
}

/**
 * Simple FAQ accordion using native <details>/<summary> elements. You can
 * style this component further or replace it with a fully fledged
 * accordion implementation if desired.
 */
export default function FAQ({ items }: FAQProps) {
  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <details key={idx} className="p-3 border rounded-md">
          <summary className="font-medium cursor-pointer">{item.question}</summary>
          <p className="mt-2 text-gray-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}