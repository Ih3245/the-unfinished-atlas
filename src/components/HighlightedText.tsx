import React from 'react';
import { highlightSnippetSegments } from '@/lib/search';

export function HighlightedText({
  text,
  query,
}: {
  text: string;
  query: string;
}) {
  const segments = highlightSnippetSegments(text, query);
  return (
    <>
      {segments.map((seg, idx) =>
        seg.highlighted ? (
          <mark key={`${idx}-${seg.text}`} className="atlas-highlight">
            {seg.text}
          </mark>
        ) : (
          <React.Fragment key={`${idx}-${seg.text}`}>{seg.text}</React.Fragment>
        )
      )}
    </>
  );
}
