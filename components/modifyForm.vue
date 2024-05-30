<!-- components/authForm.vue -->

<template>
    <div class="border border-red-700 py-20 px-40 rounded-md">
        <!-- {{ myData }} -->
        <form class="form" @submit.prevent="modifica">
            <ul class="form-list">

                <li class="form-item">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="testotkt">
                            Testo del ticket
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="testotkt" type="text" name="testotkt" :value=myData.testo_tkt required>
                        <input type="hidden" id="ticketid" name="ticketid" :value=myData.$id />
                    </div>
                </li>

                <li class="form-item">
                    <div class="mb-4">

                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Urgente
                        </label>
                        <div class="col-span-2 mt-5">
                            <div>
                                <label class="inline-flex items-center me-5 cursor-pointer">
                                    <input type="checkbox" v-model="urgente" id="urgente" name="urgente"
                                        :checked=myData.urgente_tkt class="sr-only peer" />

                                    <div
                                        class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600">
                                    </div>
                                </label>
                            </div>
                        </div>
                        <!-- <input type="checkbox" :checked=myData.urgente_tkt v-model="urgente" id="urgente" name="urgente"
                            class="sr-only peer" /> -->
                    </div>

                </li>
            </ul>
            <ul class="buttons-list u-margin-block-start-16">
                <!-- Login button  -->
                <li class="buttons-list-item text-center">
                    <button
                        class="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        aria-label="invia" type="submit">
                        Modifica
                    </button>
                    <button
                        class="ml-7 bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        aria-label="invia" @click="chiudi">
                        Chiudi
                    </button>
                </li>
            </ul>
        </form>

    </div>


</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    modifica: {
        type: Function,
        required: true
    },
    chiudi: {
        type: Function,
        required: true
    },
    myData: {
        type: Array,
        required: true
    }
})
</script>