<script>
  import { fade } from "svelte/transition";

  export let data = {};
  let resultTitle = `${data.artistName} - ${data.collectionName}`;
</script>

<div in:fade class="flex flex-row bg-white rounded-lg shadow">
  <img loading="lazy" width="100" height="100" class="object-cover w-[100px] h-[100px] rounded-l-lg" src={data.artworkUrl100} alt={`${resultTitle} album art`}/>

  <div class="flex flex-col sm:flex-row justify-between w-[90vw] sm:w-[72vw]">

    <div class="flex flex-col pl-4 my-2">
      <div title={resultTitle} class="font-semibold truncate max-w-[50vw] sm:max-w-[56vw]">
        {resultTitle}
      </div>
      <div class="text-sm">
        {new Date(Date.parse(data.releaseDate)).toLocaleDateString()}
      </div>
    </div>

    <a href={data.artworkUrl100.replace(/100x100bb/g, "10000x10000-999")} target="_blank" rel="noreferrer noopener" class="flex items-center justify-center w-full h-full text-gray-600 transition-colors border-t-2 sm:w-16 sm:border-l-2 sm:border-t-0 hover:bg-gray-200 sm:rounded-r-md">
      <span class="sr-only">Download artwork</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
      </svg>
    </a>

  </div>
</div>
