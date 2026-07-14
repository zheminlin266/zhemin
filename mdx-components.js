import { Children, cloneElement, isValidElement } from "react";

function MarkdownImage({ alt = "", title, ...props }) {
  return (
    <img
      {...props}
      className="article-image"
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
