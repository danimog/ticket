<script setup>

const user = useUserSession();

if (user.current.value) window.location.replace('/home');
else window.location.replace('/login')

</script>

<template>
    <div class="container mx-auto mt-20 mb-20">
        Monterosso Ticket
        <!-- <p>{{ user.current }}</p> -->
        <!-- <p>{{ user }}</p> -->
    </div>
</template>
