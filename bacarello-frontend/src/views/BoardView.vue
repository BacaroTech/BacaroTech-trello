<script lang="ts" setup>
import Navbar from '@/layout/Navbar.vue';
import BottomBar from '@/layout/BottomBar.vue';

import { useActiveBoardsStore } from '@/stores/active-board';
const bottom = useActiveBoardsStore();
</script>
<template>
    <div class="flex flex-col min-h-screen">
        <header>
            <Navbar />
        </header>
        <main class="h-screen">
            <TransitionGroup name="fade" tag="div" class="flex gap-6 h-full">
                <div v-for="board in bottom.activeBoard" :key="board.id" :class="[
                    'shrink-0 h-full min-w-0',
                    board.id === 'board'
                        ? 'flex-3'
                        : 'flex-1'
                ]">
                    <component :is="board.component" class="h-full" />
                </div>
            </TransitionGroup>
            <router-view />
        </main>
        <footer class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            <BottomBar />
        </footer>
    </div>
</template>