<script setup>
    import { useRouter } from 'vue-router';
    import { api } from '../utils/axios';
    import { ref, onMounted } from 'vue';

    const surah = ref([])
    const router = useRouter()

    const getSurah = async () => {
        try{
            const res = await api.get("/surat")

            surah.value = res.data.data
        }
        catch(err){
            console.log(err)
        }
    }

    const handleNavigate = async (nomor, url) => {
        router.push({
            name: "Surat",
            state: {nomor, url}
        })
    }

    onMounted(() => {
        getSurah()
    })
</script>

<template>
    <div class="flex justify-between pl-3 pr-3 lg:pl-20 lg:pr-20 pt-3 pb-10">
        <h3 class="italic text-blue-950 font-bold text-4xl">Dunia Islami</h3>
        <div>
            <h3 class="text-blue-950 font-bold text-4xl">=</h3>
        </div>
    </div>
    <div class="italic pl-3 pr-3 lg:pl-20 lg:pr-20">
        <h3 class="border-b font-bold text-blue-950 text-2xl pb-2">Al-Qur'an Digital</h3>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div class="w-full" v-for="surat in surah">
                <button class="w-full hover:bg-blue-950 hover:text-white border border-gray-100 p-5 flex items-center gap-5 mt-5 rounded" @click="handleNavigate(surat.nomor, '/')">
                    <h3 class="font-bold text-4xl">{{ surat.nomor }}</h3>
                    <div class="flex flex-col items-start">
                        <h3 class="text-2xl font-bold">{{ surat.namaLatin  }}</h3>
                        <h3 class="font-semibold">{{ surat.arti }}</h3>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>