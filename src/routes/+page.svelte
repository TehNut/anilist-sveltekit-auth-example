<script lang="ts">
  import { PUBLIC_ANILIST_CLIENT_ID, PUBLIC_ANILIST_CLIENT_REDIRECT } from "$env/static/public";
  import type { LayoutData } from "./$types";

  const authUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${PUBLIC_ANILIST_CLIENT_ID}&redirect_uri=${PUBLIC_ANILIST_CLIENT_REDIRECT}&response_type=code`;

  export let data: LayoutData;
</script>

<div class="flex flex-col justify-center items-center mt-20 mx-8 text-center">
  <h2 class="text-2xl font-semibold">AniList/SvelteKit Authentication Example</h2>
  <p class="text-lg">Showcase of SSR-friendly authentication for web projects using AniList for authentication.</p>
  <hr class="border w-full my-8 ">
  {#if !data.user}
    <a href={authUrl}>
      <button class="px-3 py-2 bg-blue-500 text-blue-100 rounded-md">
        Login
      </button>
    </a>
    <p class="w-1/3 mt-2 text-sm">This button will either direct you to a login page on AniList or seamlessly authenticate. It depends on if AniList can determine the user or not.</p>
  {:else}
    {@const { user } = data}
    <div class="flex w-64 space-x-4">
      <img class="flex-none aspect-square rounded-md w-24" src={user.avatar.large} alt="User avatar">
      <div class="flex-1 flex flex-col justify-center items-start">
        <a class="text-lg font-semibold hover:text-blue-500 transition-colors" href={user.siteUrl} target="_blank" rel="noreferrer">{user.name}</a>
        <p class="text-sm">ID <span class="font-medium">{user.id}</span></p>
      </div>
    </div>
    <br />
    <a href="/auth/logout">
      <button class="px-3 py-2 bg-blue-500 text-blue-100 rounded-md">
        Logout
      </button>
    </a>
  {/if}
</div>