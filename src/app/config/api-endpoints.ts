const domain = 'http://localhost:3000';

export const apiEndpoints = {
  register: `${domain}/auth/register`,
  login: `${domain}/auth/login`,
  posts: `${domain}/posts`,
  getCommentsEndpoint: (postId: string) => `${domain}/posts/${postId}`
};
