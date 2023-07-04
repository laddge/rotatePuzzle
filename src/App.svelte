<script lang="ts">
  import { data } from './lib/store'

  let size: number = 4
  let count: number = 0

  const move = (i: number) => {
    data.move(i)
    count++
  }

  const reset = () => {
    data.reset()
    count = 0
  }

  $: cleared = (() => {
    const answer = []
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        answer.push([x, y])
      }
    }
    return JSON.stringify($data) == JSON.stringify(answer)
  })()
</script>

<main>
  <div class="p-6">
    {#if $data.length == 0}
      <div class="max-w-sm mx-auto mt-8">
        <div class="text-center text-4xl font-bold font-mono mb-4">
          size: {size}x{size}
        </div>
        <input type="range" min="3" max="8" step="1" bind:value={size} class="range range-primary" />
        <div class="w-full flex justify-between text-xs px-2">
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
        </div>
        <button on:click={() => data.init(size)} class="btn btn-primary w-full mt-6">Start</button>
      </div>
    {:else}
      <div class="text-center text-4xl font-bold font-mono mt-8">
        size: {size}x{size}
      </div>
      <div class="max-w-md mx-auto relative aspect-square border border-primary mt-8">
        {#each {length: size ** 2} as _, i}
          <button
            on:click={() => move(i)}
            class="absolute aspect-square transition"
            style="
              width: calc(100% / {size});
              left: calc(100% / {size} * {$data[i][0]});
              top: calc(100% / {size} * {$data[i][1]});
              transition-property: left, top;
            ">
            <div class="h-full flex justify-center items-center bg-primary border-base-100 border-2 rounded text-primary-content text-xl">{i + 1}</div>
          </button>
        {/each}
      </div>
    {/if}
    <input type="checkbox" checked={cleared} class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-xl flex gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-6 h-6 stroke-success">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Cleared!
        </h3>
        <p class="py-4">{count} moves</p>
        <div class="modal-action">
          <button on:click={reset} class="btn">Close</button>
        </div>
      </div>
    </div>
  </div>
</main>
