<script setup lang="ts">
import {
  Menubar
} from '@/components/ui/menubar'
import Button from '@/components/ui/button/Button.vue';
import { Inbox, Grid3x2,Calendar, Grid3x2Icon } from 'lucide-vue-next';
import Board from './Board.vue';
import { ref } from 'vue';
import { useActiveBoardsStore } from '@/stores/active-board';
import type { BottomBar } from '@/stores/active-board';
const storeBoard = useActiveBoardsStore()
import { markRaw } from 'vue';
storeBoard.$patch({boards:[
    {
        id: "inbox",
        label: "Inbox",
        active: false,
    },
    {
      id: "planner",
      label: "Planner",
      active: false
    },
    {
        id: "board",
        label: "Board",
        component: markRaw(Board),
        active: true,
    }
]})
</script>

<template>
  <Menubar class="navbar-bg mb-5 py-6">
    <div v-for="item in storeBoard.boards" :key="item.id">

        <Button class="cursor-pointer bg-transparent text-foreground" 
        :class="{'bottom-btn-active': item.active, 'bottom-btn': !item.active}"
        @click="storeBoard.toggleBoard(item)"> 
            <Inbox v-if="item.id === 'inbox'"/>
            <Grid3x2 v-else-if="item.id === 'board'"/>
            <Calendar v-else-if="item.id === 'planner'"/>
            {{ item.label }}
        </Button>
    </div>
  </Menubar>
</template>
