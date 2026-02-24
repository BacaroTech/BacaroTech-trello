<script lang="ts" setup>
import Navbar from '@/layout/Navbar.vue';
import BottomBar from '@/layout/BottomBar.vue';
import { useRouter } from 'vue-router';
const router = useRouter()
import Button from '@/components/ui/button/Button.vue';
import { ref } from 'vue';
import Separator from '@/components/ui/separator/Separator.vue';
interface BoardView {
    id: number
    label: string
}
function getBoardId(id: number): void {
    router.push({
        name: 'board',
        params: { id: id }
    })
}
const homeUserBoards = ref<BoardView[]>([
    {
        id: 1,
        label: 'Bacaro Test'
    },
    {
        id: 2,
        label: 'Bacaro Prova'
    }
])
</script>
<template>
    <div class="flex flex-col min-h-screen">
        <header>
            <Navbar />
        </header>

        <main class="flex-1 items-center p-10 bg-muted/40">
            <div >
                <h1 class="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance"> Your Boards</h1>
                <Separator class="my-4" />
                <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div v-for="board in homeUserBoards" :key="board.id" @click="getBoardId(board.id)" class="cursor-pointer rounded-xl p-6 h-32
                       bg-linear-to-br from-indigo-500 to-purple-600
                       text-white shadow-md
                       transition-transform duration-200
                       hover:scale-105 hover:shadow-xl">
                        <h3 class="text-lg font-semibold font-mono">
                            {{ board.label }}
                        </h3>
                    </div>
                </div>

            </div>
        </main>
    </div>
</template>