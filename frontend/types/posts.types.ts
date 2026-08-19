export type TPost = {
  _id: string
  title: string
  content: string
  author: string
  createdAt: string
}

export type TComment = {
  id: string
  postId: string
  userId: string
  body: string
  user: {
    id: string
    firstName: string
    lastName: string
    avatar: string | null
  }
}
