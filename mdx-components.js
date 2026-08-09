import { Children, cloneElement, isValidElement } from "react";
import { imageDimensions } from "./app/content/image-dimensions.mjs";

function MarkdownImage({ alt = "", title, src, width, height, ...props }) {
  const dimensions = imageDimensions[src];
  const className = src === "/articles/pendle-industry/cleared-swaps.png"
    ? "article-image article-image-compact"
    : "article-image";

  return (
    <img
      {...props}
      src={src}
      width={width ?? dimensions?.[0]}
      height={height ?? dimensions?.[1]}
      className={className}
      alt={alt}
      title={title}
      loading="lazy"
      decoding="async"
    />
  );
}

function MarkdownParagraph({ children }) {
  const childList = Children.toArray(children);
  const onlyChild = childList.length === 1 ? childList[0] : null;

  if (isValidElement(onlyChild) && onlyChild.type === MarkdownImage) {
    const { title } = onlyChild.props;
    return (
      <figure className="article-figure">
        {cloneElement(onlyChild, { title: undefined })}
        {title && <figcaption>{title}</figcaption>}
      </figure>
    );
  }

  return <p>{children}</p>;
}

export function useMDXComponents(components) {
  return {
    p: MarkdownParagraph,
    img: MarkdownImage,
    ...components,
  };
}
