const siteUrl = "https://www.puzzleguide.org";

export type BreadcrumbJsonLdItem = {
  name: string;
  item: string;
};

type BreadcrumbJsonLdProps = {
  items: BreadcrumbJsonLdItem[];
};

function absoluteUrl(value: string) {
  if (value.startsWith("https://")) {
    return value.endsWith("/") ? value : `${value}/`;
  }

  const path = value.startsWith("/") ? value : `/${value}`;

  if (path === "/") {
    return `${siteUrl}/`;
  }

  return `${siteUrl}${path.replace(/\/$/, "")}/`;
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const validItems = items.filter((item) => item.name.trim() && item.item.trim());

  if (validItems.length === 0) {
    return null;
  }

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: validItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.item)
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
