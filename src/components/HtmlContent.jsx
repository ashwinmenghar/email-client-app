const HtmlContent = ({ content }) => {
  if (!content) return null;

  const sanitizedContent = content
    .replace(/<\/p>/g, "</p><br />")
    .replace(/<p>/g, "<p>");

  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};

export default HtmlContent;
