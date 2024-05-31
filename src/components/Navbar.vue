<script setup></script>

<template>
  <div class="w-full">
    <nav
      class="w-full flex flex-col lg:flex-row justify-between items-center gap-8 py-12 px-14 border-b-2 border-orange-100 bg-gradient-to-r from-neutral-700 via-black to-neutral-700"
    >
      <div class="w-full flex justify-center items-center gap-12">
        <a href="/">
          <div
            class="w-max flex flex-col items-center gap-4 px-4 lg:px-5 py-4 border-2 border-orange-100 rounded-md tokenGradient"
          >
            <img
              src="../assets/sigma-tracker-logo.svg"
              alt="sigma tracker logo"
              class="w-10 lg:w-32"
            />
          </div>
        </a>
        <h1 class="eb-garamond text-xl lg:text-2xl animated-gradient-title">SIGMA Tracker</h1>
      </div>
      <ul
        class="w-full flex justify-center items-start gap-8 pt-8 font-semibold text-slate-300 eb-garamond"
      >
        <li class="hover:text-violet-300 cursor-pointer">Cryptocurrencies</li>
        <li class="hover:text-violet-300 cursor-pointer">Exchanges</li>
        <a href="/about" class="hover:text-violet-300 cursor-pointer">About</a>
      </ul>
    </nav>
  </div>
</template>
