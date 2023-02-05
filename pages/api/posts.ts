export async function fetchPosts() {
  console.log(process.env.API_URL);
  const response = await fetch(`${process.env.API_URL}/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer e76af5efc61d5ac345616507f8210febd4f53aa35bfec5dbfeca8c6be2fd1189a727dfa696c34bb7d85d1521bb6f8e8482b9afcff976ef678bbb0babf1fbfd47439260fab81854ef6e83cbce03e2452ad35f573c9a3d9e5963b6725f92544f96239544ed87a97dc5db40d04e0c3df6c8c20f3aeb4f199e34c53b4b4f8e88f57e",
    },
  });

  return await response.json();
}

export async function fetchPostBySlug(slug: string) {
  console.log(process.env.API_URL, slug);

  const response = await fetch(
    `${process.env.API_URL}/posts/${slug}?populate=cover`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer e76af5efc61d5ac345616507f8210febd4f53aa35bfec5dbfeca8c6be2fd1189a727dfa696c34bb7d85d1521bb6f8e8482b9afcff976ef678bbb0babf1fbfd47439260fab81854ef6e83cbce03e2452ad35f573c9a3d9e5963b6725f92544f96239544ed87a97dc5db40d04e0c3df6c8c20f3aeb4f199e34c53b4b4f8e88f57e",
      },
    }
  );

  return await response.json();
}
