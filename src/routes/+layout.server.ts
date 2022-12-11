import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ fetch, locals }) => {
  let user: { id: number, name: string, avatar: { large: string } } | null = null;

  if (locals.token) {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${locals.token}`
      },
      body: JSON.stringify({
        query: "{ Viewer { id name avatar { large } } }"
      })
    }).then(res => res.json());

    user = response.data.Viewer;
  }

  return {
    user
  }
}