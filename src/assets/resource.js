const resource = url => {
  return new URL(url, import.meta.url).href
};

export default resource