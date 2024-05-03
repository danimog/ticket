<script setup>
import { Query } from 'appwrite';
import { account, database } from "../appwrite";

const user = useUserSession();

const database_id = import.meta.env.VITE_DATABASE_ID;
const collection_id = import.meta.env.VITE_COLLECTION_ID;

const getTickets = ref();

console.log(user.current.value);

if (user.current.value) {
    getTickets.value = database.listDocuments(
    database_id, collection_id,
    [ Query.equal('contatto_tkt', user.current.value.providerUid) ]
);
} else {
    getTickets.value = database.listDocuments(
    database_id, collection_id
);
}

const listTickets = ref();

// console.log(database.listDocuments(
//     database_id, collection_id,
//     [
//         Query.equal('contatto_tkt', 'danielemoggia@proton.me'),
//     ]
// ))

function formatDate(time) {
    const date = new Date(time);

    // Get year, month, and day part from the date
    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const day = date.toLocaleString("default", { day: "2-digit" });

    return `${day}.${month}.${year}`;

}

onMounted(() => {
    getTickets.value.then(
        function (response) {
            listTickets.value = response.documents;
        },
        function (error) {
            console.log(error);
        }
    );
});

</script>


<template>
    <div class="container mx-auto">
        <div v-if="user.current.value">
            <!-- <p>{{ user }}</p> -->
            <h1 class="text-4xl text-center my-20">
                Ticket aperti
                <Icon name="material-symbols-light:event-list-outline" size="1.5em" />
            </h1>

            <table class="m-20 table-fixed w-full text-center border-collapse border border-slate-400">
                <thead>
                    <tr class="bg-slate-100 ">
                        <th class="border border-slate-300 p-3">Problema</th>
                        <th class="border border-slate-300 p-3">Contatto</th>
                        <th class="border border-slate-300 p-3">Ufficio</th>
                        <th class="border border-slate-300 p-3">Data</th>
                        <th class="border border-slate-300 p-3">Urgente ?</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in listTickets" key="t.id">
                        <td class="text-left border border-slate-300 p-2">{{ item.testo_tkt }}</td>
                        <td class="text-left border border-slate-300 p-2">{{ item.contatto_tkt }}</td>
                        <td class="text-left border border-slate-300 p-2">{{ item.ufficio_tkt }}</td>
                        <td class="text-center border border-slate-300 p-2">{{ formatDate(item.$createdAt) }}</td>
                        <td class="border border-slate-300 p-2">
                            <span v-if="item.urgente_tkt == true">
                                <Icon name="material-symbols-light:arrow-circle-up" color="red" size="2em" />
                            </span>
                            <span v-else>
                                <Icon name="material-symbols-light:arrow-circle-down" color="green" size="2em" />
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- {{ listTickets }} -->
        </div>

    </div>
</template>
