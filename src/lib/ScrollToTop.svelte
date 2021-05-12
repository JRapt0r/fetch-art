<script>
  import { fly } from 'svelte/transition';
  import { scrollToTop } from "svelte-scrollto";

  let scroll;
  let screen_height = window.innerHeight;
</script>

<svelte:window bind:scrollY={scroll} />

{#if (scroll > screen_height)}
  <button in:fly={{ y: 200, duration: 700 }} out:fly={{ y: 200, duration: 400 }} on:click={() => scrollToTop()} aria-label="Scroll to top"
    class="fixed bottom-0 right-0 p-3.5 m-4 md:m-8 text-white bg-purple-700 rounded-full shadow-md hover:bg-purple-800 focus-within:outline-none">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
    </svg>
  </button>
{/if}