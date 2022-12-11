import { error, redirect } from "@sveltejs/kit";
import { PUBLIC_ANILIST_APP_ID, PUBLIC_ANILIST_APP_REDIRECT } from "$env/static/public";
import { ANILIST_APP_SECRET } from "$env/static/private";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url, cookies }) => {
  const code = url.searchParams.get("code");
  if (!code)
    throw error(400, "No authorization code provided.");

  const { access_token } = await fetch("https://anilist.co/api/v2/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: `${PUBLIC_ANILIST_APP_ID}`,
      client_secret: ANILIST_APP_SECRET,
      redirect_uri: `${PUBLIC_ANILIST_APP_REDIRECT}`,
      code
    })
  }).then(res => res.json()) as { access_token: string };

  cookies.set("anilist_token", access_token, {
    path: "/",
    maxAge: 2147483647
  });

  throw redirect(302, "/");
}