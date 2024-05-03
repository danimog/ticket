<!-- components/navbar.vue -->
<script setup>
const user = useUserSession();
</script>

<!-- <template>
  <div>
    <nav class="main-header u-padding-inline-end-0">
      <h1 class="text-3xl">Comune di Monterosso - Ticket</h1>
      <div
        class="main-header-end u-margin-inline-end-16"
        v-if="user.current.value"
        >
        <p>{{ user.current.providerUid }}</p>
        <button class="button" type="button" @click="user.logout()">
          Logout
        </button>
      </div>
      <NuxtLink v-else href="/login" class="button u-margin-inline-end-16">
        Login
      </NuxtLink>
    </nav>
  </div>
</template> -->


<template>
    <header class="bg-red-700 text-white">
        <nav class="w-full border-b border-gray-200 dark:border-gray-600">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <span class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">Monterosso al Mare - Ticket</span>
                </a>
                <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <div class="text-center" v-if="user.current.value">
                        <button type="button" @click="user.logout()"
                        class="text-white font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <Icon name="material-symbols-light:account-circle-outline" size="2.5em" />
                            Logout
                        </button>
                        <p>{{ user.current.value.providerUid }}</p>
                    </div>
                    <NuxtLink v-else href="/login" class="button u-margin-inline-end-16">
                        <button type="button"
                        class="text-white font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <Icon name="material-symbols-light:account-circle" size="2.5em" />
                            Login
                        </button>
                    </NuxtLink>

                    <button data-collapse-toggle="navbar-sticky" type="button"
                        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-sticky" aria-expanded="false">
                        <span class="sr-only">Menu</span>
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul
                        class="flex flex-col p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 text-white text-xl uppercase">
                        
                        <li>
                            <a href="/inserisci"
                                class="block py-2 px-3 rounded md:hover:bg-transparent md:p-0">Inserisci</a>
                        </li>
                        <li>
                            <a href="#" class="block py-2 px-3 rounded md:hover:bg-transparent md:p-0">Modifica</a>
                        </li>
                    </ul>
                </div>                
            </div>
        </nav>

    </header>

</template>