export async function fetchPosts() {
  console.log(process.env.API_URL);
  const response = await fetch(`${process.env.API_URL}/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  });

  return await response.json();
}

export async function fetchPostBySlug(slug: string) {
  const response = await fetch(
    `${process.env.API_URL}/posts/${slug}?populate=cover`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    }
  );

  return await response.json();
}
