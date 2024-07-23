export type DummyUser = {
  id: number;
  firstName: string;
  lastName: string;
  age: number
  image: string;
  email: string;
  favorite: boolean;
  address: {
    country: string;
    city: string;
    address: string;
  }
}

export type DummyPosts = {
  posts: {
    id: number;
    title: string;
    body: string;
    userId: number;
    tags: string[];
    reactions: {
      likes: number;
      dislikes: number;
    };
  }[];
};
