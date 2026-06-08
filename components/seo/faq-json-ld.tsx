export type FaqJsonLdItem = {
  question: string;
  answer: string;
};

type FaqJsonLdProps = {
  faq: FaqJsonLdItem[] | undefined;
};

function isValidFaqItem(item: FaqJsonLdItem) {
  return item.question.trim().length > 0 && item.answer.trim().length > 0;
}

export function FaqJsonLd({ faq }: FaqJsonLdProps) {
  const items = (faq ?? []).filter(isValidFaqItem);

  if (items.length === 0) {
    return null;
  }

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c")
      }}
    />
  );
}
