<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  import AlbumResult from "./lib/AlbumResult.svelte";
  import GithubCorner from "./lib/GithubCorner.svelte";
  import ScrollToTop from "./lib/ScrollToTop.svelte";
  import LoadingSpinner from "./lib/LoadingSpinner.svelte";

  let promise = { results: [] };
  let input;
  let queried;
  let country;

  async function fetch_art(query) {
    if (query)
    {
      queried = query;

      // Construct query
      let url = new URL("search", "https://itunes.apple.com");
      url.searchParams.set("term", queried);
      url.searchParams.set("entity", "album");
      url.searchParams.set("country", country);

      // Make request
      const res = await fetch(url.toString(), { mode: "cors" });
      const json = await res.json();

      // Update hash location
      window.location.hash = queried;

      if (res.ok) return json;
      else throw new Error(json);
    }
    else {
      throw new Error("Invalid input");
    }
  }

  function search_albums(query) {
    promise = fetch_art(query);
  }

  // Allow for 'shareable' search results
  function handle_hash() {
    const path = window.location.hash.slice(1);

    if (path?.trim().length != 0) {
      const decoded_path = decodeURIComponent(path);

      search_albums(decoded_path);
      input = decoded_path;
    }
  }

	onMount(handle_hash);
</script>

<!-- Top right corner -->
<GithubCorner />

<!-- Bottom right corner -->
<ScrollToTop />

<header class="flex flex-col items-center content-center pt-10 text-center shadow-lg bg-gradient-to-tl from-orange-500 to-pink-600 dark:from-indigo-500 dark:to-blue-900 justify-items-center">
  <div class="px-4 text-6xl font-bold text-white uppercase dark:text-gray-900 sm:text-7xl font-brand">
    Fetch-Art
  </div>

  <form on:submit|preventDefault={() => search_albums(input)} class="sticky top-0 flex space-y-4 break-words" action="" method="get">
    <div class="flex flex-row items-center justify-end min-w-full transform translate-y-5 rounded-md ring-[1px] ring-black ring-opacity-25 group">
      <select bind:value={country} class="p-2 bg-white border-t border-b border-l appearance-none rounded-l-md focus-within:outline-none">
        <option value="us">US 🇺🇸</option>
        <option value="gb">GB 🇬🇧</option>
        <option value="jp">JP 🇯🇵</option>
        <option value="de">DE 🇩🇪</option>
        <option value="fr">FR 🇫🇷</option>
        <option value="kr">KR 🇰🇷</option>
      </select>

      <input class="w-[74vw] py-2 pl-3 bg-white rounded-r-md focus:placeholder-purple-700 focus-within:outline-none border-r border-t border-b"
        bind:value={input} type="text" placeholder="Search releases..." />

      <button class="fixed focus-within:outline-none" type="submit">
        <svg role="button" aria-label="search button" class="w-6 h-6 mr-4 text-black cursor-pointer stroke-2 dark:text-white opacity-30 hover:opacity-100 hover:text-purple-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </button>
    </div>
  </form>

</header>

<main class="min-h-[79.5vh] p-10 bg-gray-100">
  <div class="flex flex-col items-center">
    <div class="space-y-8 sm:py-5">
      {#await promise}
        <LoadingSpinner/>
      {:then { results }}
        {#if results.length > 0}
          {#each results as result}
            <AlbumResult data={result} />
          {/each}
        {:else if queried?.length > 0}
          <div class="font-semibold">No artwork found for '{queried}'</div>
        {/if}
      {:catch error}
        <div in:fade class="font-semibold text-red-700">Error: {error.message}</div>
      {/await}
    </div>
  </div>
</main>
