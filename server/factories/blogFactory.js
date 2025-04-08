function createBlogMapper(type, data) {
  if(type === 'preview') {
      return{
        title: data.title,
        snippet: data.content.substring(0, 100) +'...',
        author:data.author,
        date: new Date(data.createdAt).toLocaleDateString()
      };
  }else if(type === 'detailed') {
      return{
        title: data.title,
        content: data.content,
        author: data.author,
        createdAt: data.createdAt
      };
  }else {
      return{title: data.title};
    }
}
module.exports = createBlogMapper;