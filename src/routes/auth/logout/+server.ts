import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const prerender = false;
export const GET: RequestHandler = async ({ cookies }) => {
  cookies.delete("anilist_token", {
    path: "/"
  });
  throw redirect(302, "/");
}