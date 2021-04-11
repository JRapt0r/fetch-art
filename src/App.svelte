<script>
  import AlbumResult from "./lib/AlbumResult.svelte";
  import GithubCorner from "./lib/GithubCorner.svelte";
  let promise = { results: [] };
  let queried;

  async function fetch_art(query) {
    queried = query;
    let url = new URL("search", "https://itunes.apple.com");
    url.searchParams.set("term", query);
    url.searchParams.set("entity", "album");
    url.searchParams.set("country", "gb");

    const res = await fetch(url);
    const json = await res.json();

    if (res.ok) return json;
    else throw new Error(json);
  }

  function search_albums({ target }) {
    const [input] = target;
    promise = fetch_art(input.value?.trim());
  }
</script>

<GithubCorner />

<header class="flex flex-col items-center content-center pt-10 text-center shadow-lg bg-gradient-to-tl from-orange-500 to-pink-600 dark:from-indigo-500 dark:to-blue-900 justify-items-center">
  <div class="px-4 text-6xl font-bold text-white uppercase dark:text-gray-900 sm:text-7xl font-brand">
    Fetch-Art
  </div>

  <form on:submit|preventDefault={search_albums} class="sticky top-0 flex space-y-4 break-words" action="" method="get">
    <div class="flex flex-row items-center justify-end min-w-full transform translate-y-5">
      <input class="w-[80vw] py-2 pl-3 bg-white rounded-md shadow focus-within:outline-none focus:ring-indigo-900 focus:ring-2 ring-1 ring-black ring-opacity-25"
        type="text" placeholder="Search albums..." autoFocus />

      <button class="fixed focus-within:outline-none" type="submit">
        <svg role="button" aria-label="search button" class="w-6 h-6 mr-4 text-black cursor-pointer stroke-2 dark:text-white opacity-30 hover:opacity-70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </button>
    </div>
  </form>

</header>

<main class="min-h-[80vh] p-10 bg-gray-100">
  <div class="flex flex-col items-center">
    <div class="py-5 space-y-8">
      {#await promise}
        <div></div>
      {:then { results }}
        {#if results.length > 0}
          {#each results as result}
            <AlbumResult data={result} />
          {/each}
        {:else if queried?.length > 0}
          <div class="font-semibold">No artwork found for '{queried}'</div>
        {/if}
      {:catch error}
        <div class="font-semibold text-red-700">Error: {error.message}</div>
      {/await}
    </div>
  </div>
</main>
