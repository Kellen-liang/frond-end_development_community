export const categoryTag = [
  { label: '后端', value: '后端' },
  { label: '前端', value: '前端' },
  { label: 'Android', value: 'Android' },
  { label: 'iOS', value: 'iOS' },
  { label: '人工智能', value: '人工智能' },
  { label: '大数据', value: '大数据' },
  { label: '全栈开发', value: '全栈开发' },
]

export const TAG = [
  "JavaScript", 
  "React", 
  "Vue", 
  "Angular", 
  "Node.js", 
  "Express", 
  "MongoDB", 
  "MySQL", 
  "CSS", 
  "HTML", 
  "Bootstrap", 
  "Sass", 
  "Less", 
  "Webpack", 
  "Babel", 
  "TypeScript", 
  "ES6", 
  "jQuery", 
  "REST API", 
  "GraphQL", 
  "OAuth", 
  "Git", 
  "CI/CD", 
  "AWS", 
  "Docker", 
  "Kubernetes", 
  "Serverless", 
  "Microservices", 
  "Agile", 
  "Scrum", 
  "TDD", 
  "BDD"
]


export const resource = url => {
  return new URL(url, import.meta.url).href
};
