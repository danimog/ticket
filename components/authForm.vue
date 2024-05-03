<!-- components/authForm.vue -->

<template>
    <div class="border border-red-700 py-20 px-40 rounded-md">
        <form class="form" @submit.prevent="handleSubmit">
            <ul class="form-list">
                <!-- Input field e-mail -->
                <li class="form-item">
                    <!-- <label class="label">Email</label>
                    <div class="input-text-wrapper">
                        <input type="email" name="email" class="input-text rounded-sm" placeholder="Email" required />
                    </div> -->
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                            Utente/email
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email" type="text" name="email" placeholder="Username" required>
                    </div>
                </li>
                <!-- Input field e-mail -->
                <li class="form-item">
                    <div class="mb-4">

                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input
                            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password" type="password" name="password" placeholder="******************">
                        <p class="text-red-500 text-xs italic">Inserisci la tua password.</p>


                    </div>
                    <!-- <label class="label">Password</label>
                    <div class="input-text-wrapper">
                        <input type="password" name="password" class="input-text" placeholder="Password" required />
                    </div> -->
                </li>
            </ul>
            <ul class="buttons-list u-margin-block-start-16">
                <!-- Login button  -->
                <li class="buttons-list-item text-center">
                    <button 
                    class="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                     aria-label="Login" @click="handleSubmit">
                        {{ submitType }}
                    </button>
                </li>
            </ul>
        </form>

    </div>


</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    handleSubmit: {
        type: Function,
        required: true
    },
    submitType: {
        type: String,
        required: true
    }
})
</script>