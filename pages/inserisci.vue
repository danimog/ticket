<template>
    <div class="container mx-auto">
        <div class="mt-20">
            <h1 class="text-4xl text-center">Inserisci ticket
                <Icon name="material-symbols-light:edit-outline" size="1.5em" />
            </h1>
            <p class="my-5 text-center">
                <em>{{ utente }}</em><br>
                {{ ufficio }}
            </p>
            <p class="my-10 text-center text-2xl text-red-700">{{ ticket_ok }}</p>

            <div v-if="ticket_insert_ok" class="w-16 md:w-32 lg:w-48">

                <div data-dialog-backdrop="dialog" data-dialog-backdrop-close="true"
                    class="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-0 backdrop-blur-sm transition-opacity duration-300">
                    <div data-dialog="dialog">
                        Ticket inserito correttamente..
                    </div>
                </div>

            </div>
            <form @submit.prevent="invia">

                <div class="mt-10 border rounded p-20">
                    <div class="grid grid-cols-3 gap-4 w-8/12 mx-auto">
                        <div>
                            <label for="problem"
                                class="inline-block align-middle text-xl font-medium text-gray-900 text-right">Problema</label>
                        </div>
                        <div class="col-span-2">
                            <div @onfocus="resetta"
                                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset focus-within:ring-gray-300 sm:max-w-md">
                                <textarea id="problem" rows="4" v-model="problem"
                                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                                    placeholder="Descrivi il problema.." required></textarea>
                            </div>
                        </div>

                        <!-- <div class="mt-5">
                            <label for="email"
                                class="inline-block align-middle text-xl font-medium text-gray-900 text-right">Contatto</label>
                        </div>
                        <div class="col-span-2 mt-5">
                            <div class="p-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                                <input type="text" name="email" id="email" v-model="email" required
                                    class="block flex-1 border-0 bg-transparent text-gray-900"
                                    placeholder="nome o indirizzo @email" />
                            </div>
                        </div> -->

                        <!-- <div class="mt-5">
                            <label for="ufficio"
                                class="inline-block align-middle text-xl font-medium text-gray-900 text-right">Ufficio</label>
                        </div>
                        <div class="col-span-2 mt-5">
                            <div class="p-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                                <select name="ufficio" id="ufficio" v-model="ufficio" required
                                    class="block flex-1 border-0 bg-transparent text-gray-900"
                                    placeholder="seleziona ufficio"
                                    @change="cambioSelect($event)"
                                    >
                                    <option v-for="u in uffici" :value="u.id">{{ u.nome_ufficio }}</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="mt-5">
                            <label for="utenti"
                                class="inline-block align-middle text-xl font-medium text-gray-900 text-right">Utente</label>
                        </div>
                        <div class="col-span-2 mt-5">
                            <div class="p-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                                <select name="utente" id="utente" v-model="utente" required
                                    class="block flex-1 border-0 bg-transparent text-gray-900"
                                    placeholder="seleziona utente"
                                    >
                                    <option v-for="ut in selectUtenti" :value="ut">{{ ut }}</option>
                                </select>
                            </div>
                        </div> -->

                        <div class="mt-5">
                            <label for="urgente"
                                class="inline-block align-middle text-xl font-medium text-gray-900 text-right">Urgente</label>
                        </div>
                        <div class="col-span-2 mt-5">
                            <div>
                                <label class="inline-flex items-center me-5 cursor-pointer">
                                    <input type="checkbox" v-model="urgente" id="urgente" name="urgente"
                                        class="sr-only peer" />

                                    <div
                                        class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600">
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div class="col-span-3 mt-5">
                            <div class="w-full mx-auto text-center">
                                <button class="rounded-full bg-red-900 text-white p-5" type="submit">Invia
                                    ticket</button>
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ID } from 'appwrite';
import { account, database } from "../appwrite";
const { data:utenti } = await useFetch('uffici.json')

const user = useUserSession();
// console.log(user)
const utente = ref();
const ufficio = ref();
const utenteLoggato = await account.get()
const result = await account.getPrefs();
for (const property in result) {
    ufficio.value = result[property];
    // console.log(`${property}: ${result[property]}`);
}
// console.log(user.current.value)
utente.value = user.current.value.providerUid;

const database_id = import.meta.env.VITE_DATABASE_ID;
const collection_id = import.meta.env.VITE_COLLECTION_ID;

const selectUffici = ref();
const selectUtenti = ref([]);

const uffici = ref([]);

const tickets = ref([]);
const input = reactive({
    ticket: "",
});

const ticket_ok = ref("");
const ticket_insert_ok = ref(false);

const results = ref();
const email = ref("");
const problem = ref("");
const urgente = ref(false);
// const ufficio = ref("");

function cambioSelect(event) {
    selectUtenti.value = []
    let id = event.target.value;
    if (uffici.value[id-1].utenti) {
        let user = uffici.value[id-1].utenti;
        for (let i=0; i<user.length; i++) {
            selectUtenti.value.push(user[i].nominativo)
        }
    }
    
}

function invia() {
    results.value = {
        testo_tkt: problem.value,
        contatto_tkt: utente.value,
        urgente_tkt: urgente.value,
        ufficio_tkt: ufficio.value
    }

    if (dbinsert(results.value)) {
        email.value = ""
        problem.value = ""
        urgente.value = false
        ufficio.value = ""
        ticket_insert_ok.value = true;
        ticket_ok.value = "Ticket inserito correttamente! grazie"
    }

}

function resetta() {
    ticket_ok.value = "";
}

const dbinsert = (data) =>
    database.createDocument(
        database_id,
        collection_id,
        ID.unique(),
        data
    );

onMounted(async () => {

    for (let i=0; i<utenti.value.length; i++){
        let newVal = utenti.value[i];
        uffici.value.push(newVal);
    }
    // console.log(uffici.value)
});

</script>

<style lang="scss" scoped></style>