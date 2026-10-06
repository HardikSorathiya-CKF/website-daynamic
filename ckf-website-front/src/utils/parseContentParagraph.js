export function isLikelyLabel(label) {
  if (!label || label.length < 3 || label.length > 90) return false;
  if (/^https?:\/\//i.test(label)) return false;
  if (/\.\s+[A-Z]/.test(label)) return false;
  if (label.split(/\s+/).length > 14) return false;
  if (/^(At|In|On|The|With|For|We|Our|You|This|That|If|When|By|From|As|It|An|A)\s/i.test(label)) {
    return false;
  }

  if (label.length <= 72 && !label.includes('.')) {
    return true;
  }

  return (
    /^\d/.test(label)
    || label.includes('&')
    || label.includes('(')
    || /[A-Z][a-z]+(?:\s+[A-Z&(-][^:]*){1,}/.test(label)
  );
}

export function parseStringParagraph(text) {
  const compareMatch = text.match(/^Old Way:\s*([\s\S]+?)\s*New Way:\s*([\s\S]+)$/i);
  if (compareMatch) {
    return {
      type: 'compare',
      oldWay: compareMatch[1].trim(),
      newWay: compareMatch[2].trim(),
    };
  }

  const colonIndex = text.indexOf(':');
  if (colonIndex > 2 && colonIndex < 90) {
    const label = text.slice(0, colonIndex).trim();
    const body = text.slice(colonIndex + 1).trim();
    if (isLikelyLabel(label) && body) {
      return { label, text: body };
    }
  }

  return null;
}

export function getContentKey(content, index) {
  if (typeof content === 'string') {
    return content.slice(0, 40);
  }
  if (content?.segments?.length) {
    return `segments-${index}`;
  }
  if (content.type === 'compare') {
    return `compare-${content.oldWay?.slice(0, 24) ?? index}`;
  }
  return content.label ?? `item-${index}`;
}
