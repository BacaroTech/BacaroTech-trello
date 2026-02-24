import { ref, computed, type Component } from 'vue'
import { defineStore } from 'pinia'
export interface BottomBar{
    id: string
    label: string
    component: Component
    active?: boolean
}
function isMobile(): boolean {
    return window.innerWidth < 768
}
export const useActiveBoardsStore = defineStore('boards', () => {
    const boards = ref<BottomBar[]>([])
    function toggleBoard(board: BottomBar) {
        if (isMobile()){
            console.log('here')
            boards.value.forEach(b => b.active = false)
            board.active = true
        } else {
            board.active = !board.active  
        }
    }
    const activeBoard = computed(() => boards.value.filter(e => e.active))
    return{
        boards,
        toggleBoard,
        activeBoard
    }
})