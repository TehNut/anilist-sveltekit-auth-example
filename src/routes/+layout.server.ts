import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ fetch, locals }) => {
  let user: { id: number, name: string, siteUrl: string, avatar: { large: string } } | null = null;

  if (locals.token) {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${locals.token}`
      },
      body: JSON.stringify({
        query: "{ Viewer { id name siteUrl avatar { large } } }"
      })
    }).then(res => res.json());

    user = response.data.Viewer;
  }

  // Depending on usecase, it may be useful or necessary to provide the client with the the token as well.
  // ie: You would like the client to make authenticated queries/mutations on AniList, rather than having the server
  // handle it from the cookie. 
  return {
    user
  }
}