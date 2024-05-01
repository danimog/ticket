<script setup>

const user = useUserSession();

</script>


<template>
    
      <h3 class="u-stretch u-margin-20 eyebrow-heading-1">Monterosso Ticket</h3>

      Benvenuto! <span v-if="user.current.value">{{ user.current.value.providerUid }}</span>
    
  </template>
  