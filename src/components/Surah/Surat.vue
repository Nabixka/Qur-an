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

    const artiIsActive = ref(true)

    const getDetail = async () => {
        const res = await api.get(`/surat/${id}`)

        surat.value = res.data.data
    }

    const handleNavigate = () => {
        const url = state?.url
        router.push(`${url}`)
    }

    const handleButton = () => {
        artiIsActive.value = !artiIsActive.value
    }

    const artiToogleButton = () => {
        return [
            "bg-gray-100 outline outline-gray-200 overflow-hidden w-15 h-5 mt-3 rounded-full flex", artiIsActive.value == true ? "justify-start" : "justify-end"
        ]
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

        <div class="flex justify-end w-full lg:w-2/3 pr-5">
            <button @click="handleButton()" :class="artiToogleButton()">
                <h3 class="bg-green-500 text rounded-full w-7 h-5"></h3>
            </button>
        </div>

        <div class="flex flex-col gap-5 w-full lg:w-2/3 pt-5 pb-20">
            <div v-for="a in ayat" class="flex flex-col gap-5 pl-5 bg-gray-100 hover:bg-gray-200 pr-5 pt-5 pb-5">
                <h3 class="text-end text-3xl">{{ a.teksArab }}</h3>
                <div class="flex items-center gap-2">
                    <h3 class="text-3xl font-bold">{{ a.nomorAyat }}</h3>
                    <div class="flex flex-col gap-1">
                        <h3 class="font-bold text-blue-950">{{ a.teksLatin }}</h3>
                        <h3 v-if="artiIsActive">{{ a.teksIndonesia }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>