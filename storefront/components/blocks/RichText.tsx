export interface RichTextProps {
  html: string;
}

/**
 * Render rich text content as HTML. Uses `dangerouslySetInnerHTML` to
 * insert markup generated from a CMS. Ensure the content is sanitized
 * server‑side before passing it to this component.
 */
export default function RichText({ html }: RichTextProps) {
  return <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: html }} />;
}