<script setup>
import { Query, Permission, Role } from 'appwrite';
// import func from '~/vue-temp/vue-editor-bridge';
import { account, database } from "../appwrite";

const user = useUserSession();

const database_id = import.meta.env.VITE_DATABASE_ID;
const collection_id = import.meta.env.VITE_COLLECTION_ID;

const getTickets = ref();

const ufficio = ref();

const utente = ref();
const utenteLoggato = ref()

const isActive = ref('underline');

const riga = ref([]);

const picked = ref();

utenteLoggato.value = await account.get();
// console.log(utenteLoggato.name)
// prende le preferenze dell'account loggato dove ho scritto in chiave:valore ufficio di appartenenza
const result = await account.getPrefs();

for (const property in result) {
    ufficio.value = result[property];
    //   console.log(`${property}: ${result[property]}`);
}
if (utenteLoggato.value.name == 'admin') {
    getTickets.value = database.listDocuments(
        database_id, collection_id,
        [Query.orderDesc("$createdAt")]
    );
    utente.value = user.current.value.providerUid;
    console.log("ADMIN!")
}
else if (user.current.value) {
    console.log("utente connesso!");
    getTickets.value = database.listDocuments(
        database_id, collection_id,
        [Query.equal('ufficio_tkt', ufficio.value),
        Query.orderDesc("$createdAt")]
        // [Query.equal('contatto_tkt', user.current.value.providerUid)]
    );
    utente.value = user.current.value.providerUid;
} else {
    console.log("utente NON connesso!");
    getTickets.value = database.listDocuments(
        database_id, collection_id,
        [Query.orderDesc("$createdAt")]
    );
}

const listTickets = ref();

// console.log(database.listDocuments(
//     database_id, collection_id,
//     [
//         Query.equal('contatto_tkt', 'danielemoggia@proton.me'),
//     ]
// ))
function selectedRow(idx) {
    riga.value = idx;
    console.log(riga.value)
    let modal = document.getElementById('modal');
    modal.style.display = 'block';

}

function modificaModal() {
    console.log(testotkt.value);
    console.log(urgente.checked);
    let data = {
        testo_tkt: testotkt.value,
        urgente_tkt: urgente.checked,
    }
    let id = ticketid.value;

    console.log(id);

    if (dbmodify(data, id)) {
        console.log("update con successo!!!")

        officeTickets();
    }


    let modal = document.getElementById('modal');
    modal.style.display = 'none';
}

const dbmodify = (data, id) =>
    database.updateDocument(
        database_id,
        collection_id,
        id,
        data,
        [
            Permission.update(Role.user('65f3f1fd6345a3b7c4fc')),        // Admins can update this document
            Permission.delete(Role.user('65f3f1fd6345a3b7c4fc'))          // Admins can delete this document
        ]
    );


function chiudiModal() {
    let modal = document.getElementById('modal');
    modal.style.display = 'none';
}

function myTickets() {
    console.log("solo i miei tickets..... " + utenteLoggato.name);

    getTickets.value = database.listDocuments(
        database_id, collection_id,
        [Query.equal('contatto_tkt', utente.value),
        Query.orderDesc("$createdAt")]
    );

    getTickets.value.then(
        function (res) {
            listTickets.value = res.documents;
        }
    );
}

function officeTickets() {
    console.log(".....tickets ufficio ");
    if (utenteLoggato.value.name == 'admin') {
        getTickets.value = database.listDocuments(
            database_id, collection_id,
            [Query.orderDesc("$createdAt")]
        );
    } else {
        getTickets.value = database.listDocuments(
            database_id, collection_id,
            [Query.equal('ufficio_tkt', ufficio.value)],
            [Query.orderDesc("$createdAt")]
        );
    }
    getTickets.value.then(
        function (res) {
            listTickets.value = res.documents;
        }
    );
}

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
    <div v-if="utenteLoggato.name == 'admin'">
        <div class="fixed hidden insert-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="modal">
            <div class="relative top-20 mx-auto p-5 border w-3/4 h-3/4 shadow-lg rounded-md bg-white">

                <ModifyForm :myData="riga" :modifica="modificaModal" :chiudi="chiudiModal"></ModifyForm>

            </div>
        </div>
        <!-- {{ riga }} -->
    </div>

    <div class="container mx-auto">
        <div v-if="user.current.value">
            <h1 class="text-4xl text-center mt-20">
                Ticket aperti
                <Icon name="material-symbols-light:event-list-outline" size="1.5em" />
            </h1>
            <div class="my-10">
                <p class="text-center text-xl font-bold mb-3" v-if="ufficio">ufficio: {{ ufficio }}</p>
                <p class="text-center" v-if="utente">user: {{ utente }}</p>
            </div>
            <div class="my-10">
                <!-- <button :style="{ active: isActive }" @click="myTickets">Solo miei</button> | 
                <button :style="{ active: isActive }" @click="officeTickets">Ufficio</button> -->

                <!-- <button
                    class="mr-5 w-32 rounded-lg bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring focus:bg-amber-700"
                    @click="officeTickets">ufficio</button>
                <button
                    class="mr-5 w-32 rounded-lg bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring focus:bg-amber-700"
                    @click="myTickets">solo miei</button>
 -->

                <h3 class="mb-5 text-lg font-medium text-gray-900">Selezione ticket</h3>
                <ul class="grid w-full gap-6 md:grid-cols-2">
                    <li>
                        <input type="radio" id="hosting-small" name="hosting" value="hosting-small" :onClick="myTickets"  class="hidden peer"
                            required />
                        <label for="hosting-small"
                            class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer 
                            peer-checked:border-red-600 peer-checked:text-red-600 hover:text-gray-600 hover:bg-gray-100 ">
                            <div class="block">
                                <div class="w-full text-lg font-semibold">Solo i miei</div>
                                <div class="w-full">Solo i tuoi ticket</div>
                            </div>
                            <svg class="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </label>
                    </li>
                    <li>
                        <input type="radio" id="hosting-big" name="hosting" checked value="hosting-big" :onClick="officeTickets" class="hidden peer">
                        <label for="hosting-big"
                            class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer 
                             peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 ">
                            <div class="block">
                                <div class="w-full text-lg font-semibold">Di ufficio</div>
                                <div class="w-full">Tutti i ticket del tuo ufficio</div>
                            </div>
                            <svg class="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </label>
                    </li>
                </ul>


            </div>




            <table class="table-auto w-full text-center border-collapse border border-slate-400">
                <thead>
                    <tr class="bg-slate-100 ">
                        <th class="border border-slate-300 p-3"> # </th>
                        <th class="border border-slate-300 p-3">Problema</th>
                        <th class="border border-slate-300 p-3">Contatto</th>
                        <th class="border border-slate-300 p-3">Ufficio</th>
                        <th class="border border-slate-300 p-3">Data</th>
                        <th class="border border-slate-300 p-3">Urgente ?</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in listTickets" @click="selectedRow(item)" :key="i">
                        <td class="text-left border border-slate-300 p-2"> {{ i }}</td>
                        <td class="text-left border border-slate-300 p-2">{{ item.testo_tkt }}</td>
                        <td class="text-left border border-slate-300 p-2">{{ item.contatto_tkt }}</td>
                        <td class="text-left border border-slate-300 p-2">{{ item.ufficio_tkt }}</td>
                        <td class="text-center border border-slate-300 p-2">{{ formatDate(item.$createdAt) }}
                        </td>
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

        <div v-else>
            <div class="">
                <h3 class="text-2xl text-center my-20">
                    Vai alla <a class="underline hover:no-underline" href="/login">pagina di login</a> per vedere e
                    inserire nuovi ticket!!
                </h3>
            </div>
        </div>

    </div>
</template>
