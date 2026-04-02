<script setup>
    import { ref, onMounted, computed } from 'vue';
    import { api } from '../../utils/axios';
    import { Icon } from '@iconify/vue';
    import { useRouter } from 'vue-router';

    const router = useRouter()
    const { state } = history
    const surat = ref({})
    const ayat = computed(() => surat.value?.ayat)
    const id = state?.nomor

    const latinIsActive = ref(true)
    const artiIsActive = ref(true)
    const qariIsActive = ref(true)
    const isPlay = ref(false)

    const playAudio = async (url) => {
        if(!isPlay.value){
            isPlay.value = new Audio()
        }

        isPlay.value.src =  url
        isPlay.value.play()
    }

    const getDetail = async () => {
        const res = await api.get(`/surat/${id}`)

        surat.value = res.data.data
    }

    const handleNavigate = () => {
        const url = state?.url
        router.push(`${url}`)
    }

    const handleButton = (type) => {
        if(type == "arti"){
            artiIsActive.value = !artiIsActive.value
        }
        if(type == "latin"){
            latinIsActive.value = !latinIsActive.value
        }
        if(type == "qari"){
            qariIsActive.value = !qariIsActive.value
        }
    }

    const ToogleButton = (type) => {
        if(type == "arti"){
            return [
                "bg-gray-100 outline outline-gray-200 overflow-hidden w-15 h-5 mt-3 rounded-full flex", artiIsActive.value == true ? "justify-end" : "justify-start"
            ]
        }
        if(type == "latin"){
            return [
                "bg-gray-100 outline outline-gray-200 overflow-hidden w-15 h-5 mt-3 rounded-full flex", latinIsActive.value == true ? "justify-end" : "justify-start"
            ]
        }
        if(type == "qari"){
            return [
                "bg-gray-100 outline outline-gray-200 overflow-hidden w-15 h-5 mt-3 rounded-full flex", qariIsActive.value == true ? "justify-end" : "justify-start"
            ]
        }
    }

    onMounted(() => {
        getDetail()
    })

</script>

<template>
    <div class="flex pt-10 flex-col items-center pl-5 pr-5">
        <div class="bg-blue-950 text-white flex flex-col gap-3 pt-5 pb-5 w-full lg:w-2/3 pl-5">
            <button @click="handleNavigate()" class="flex items-center gap-1">
                <Icon class="font-extrabold" icon="ep:back" width="20" height="20" />
                <h3 class="font-semibold">Kembali Ke Halaman Surat</h3>
            </button>
            <h3 class="text-2xl font-bold">{{ surat.nomor }}. QS. {{ surat.namaLatin }}</h3>
            <h3 class="font-semibold">{{ surat.arti }} | {{ surat.jumlahAyat }} Ayat</h3>
        </div>

        <div class="flex justify-end w-full gap-5 lg:w-2/3 pr-5">
            <div class="flex flex-col items-center font-semibold">
                <h3>Qari</h3>
                <button @click="handleButton('qari')" :class="ToogleButton('qari')">
                    <div :class="['text rounded-full w-7 h-5', qariIsActive ? 'bg-blue-500' : 'bg-gray-400'  ]"></div>
                </button>
            </div>
            <div class="flex flex-col items-center font-semibold">
                <h3>Latin</h3>
                <button @click="handleButton('latin')" :class="ToogleButton('latin')">
                    <div :class="['text rounded-full w-7 h-5', latinIsActive ? 'bg-red-500' : 'bg-gray-400' ]"></div>
                </button>
            </div>
            <div class="flex flex-col items-center font-semibold">
                <h3>Arti</h3>
                <button @click="handleButton('arti')" :class="ToogleButton('arti')">
                    <div :class="['text rounded-full w-7 h-5', artiIsActive ? 'bg-green-500' : 'bg-gray-400'  ]"></div>
                </button>
            </div>
        </div>

        <div class="flex flex-col gap-5 w-full lg:w-2/3 pt-5 pb-20">
            <div v-for="a in ayat" class="flex flex-col gap-5 pl-5 bg-gray-100 hover:bg-gray-200 pr-5 pt-5 pb-5">
                <h3 class="text-end text-3xl">{{ a.teksArab }}</h3>
                <div class="flex items-center gap-2">
                    <h3 class="text-3xl font-bold">{{ a.nomorAyat }}</h3>
                    <div class="flex flex-col gap-1">
                        <h3 v-if="latinIsActive" class="font-bold text-blue-950">{{ a.teksLatin }}</h3>
                        <h3 v-if="artiIsActive">{{ a.teksIndonesia }}</h3>
                    </div>
                </div>
                <div v-if="qariIsActive" class="pt-2 grid grid-cols-1 lg:grid-cols-3">
                    <div>
                        <h3 class="font-semibold">Abdullah-Al-Juhan</h3>
                        <button @click="playAudio(a.audio['01'])" class="bg-yellow-950 text-white rounded-lg px-5 py-1">
                            <Icon icon="solar:play-bold" width="24" height="24" />
                        </button>
                    </div>
                    <div>
                        <h3 class="font-semibold">Abdul-Muhsin-Al-Qasim</h3>
                        <button @click="playAudio(a.audio['02'])" class="bg-yellow-950 text-white rounded-lg px-5 py-1">
                            <Icon icon="solar:play-bold" width="24" height="24" />
                        </button>
                    </div>
                    <div> 
                        <h3 class="font-semibold">Abdurrahman-as-Sudais</h3>
                        <button @click="playAudio(a.audio['03'])" class="bg-yellow-950 text-white rounded-lg px-5 py-1">
                            <Icon icon="solar:play-bold" width="24" height="24" />
                        </button>
                    </div>
                    <div>
                        <h3 class="font-semibold">Ibrahim-Al-Dossari</h3>
                        <button @click="playAudio(a.audio['04'])" class="bg-yellow-950 text-white rounded-lg px-5 py-1">
                            <Icon icon="solar:play-bold" width="24" height="24" />
                        </button>
                    </div>
                    <div>
                        <h3 class="font-semibold">Misyari-Rasyid-Al-Afasi</h3>
                        <button @click="playAudio(a.audio['05'])" class="bg-yellow-950 text-white rounded-lg px-5 py-1">
                            <Icon icon="solar:play-bold" width="24" height="24" />
                        </button>
                    </div>
                    <div> 
                        <h3 class="font-semibold">Yasser-Al-Dosari</h3>
                        <button @click="playAudio(a.audio['06'])" class="bg-yellow-950 text-white rounded-lg px-5 py-1">
                            <Icon icon="solar:play-bold" width="24" height="24" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>