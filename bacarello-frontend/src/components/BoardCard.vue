<script lang="ts" setup>
import draggable from 'vuedraggable'
import { Plus, X } from 'lucide-vue-next';
import { ref, watch } from 'vue';
import type { Task, Column } from '../layout/Board.vue';
import Button from '@/components/ui/button/Button.vue';
import { useRouter } from 'vue-router';
const addNewToggle = ref<string | undefined>()
const newTaskTitle = ref<string>('')
const tasksProp = defineProps<{ tasks: Column[] }>()
import { useCardCheckList, type LabelItem } from '@/stores/card';
const { selectedLabels } = useCardCheckList()
const router = useRouter()
const emit = defineEmits<{
    (e: 'add-task', payload: { columnId: string; task: Task }): void
}>()
function addTask(columnId: string) {
    if (!newTaskTitle.value.trim()) return

    emit('add-task', {
        columnId,
        task: {
            id: crypto.randomUUID(),
            title: newTaskTitle.value
        }
    })

    newTaskTitle.value = ''
    addNewToggle.value = undefined
}
function openCardDetail(card: Task){
    router.push({ name: 'card', params: { cardId: card.id } })
}
function setColor(id: string, label: LabelItem):string{
    if (id === label.id) {
        return label.color        
    } else {
        return ""
    }
}
</script>
<template>
    <ol class="flex gap-6 mt-3 overflow-x-auto overflow-y-hidden">
        <li v-for="column in tasksProp.tasks" :key="column.id" class="w-64 bg-muted p-4 rounded-xl shrink-0 h-auto">
            <h3 class="font-semibold mb-3">{{ column.name }}</h3>
            <draggable v-model="column.tasks" group="tasks" item-key="id" class="space-y-2 cursor-pointer">
                <template #item="{ element }">
                    <div class="bg-background p-3 rounded-lg shadow-sm" @click="openCardDetail(element)">
                        <div class="flex">
                            <div :class="setColor(element.id, label)" class="w-4 h-4 rounded-xl" v-for="label in selectedLabels" v-show="label.id == element.id"></div>
                        </div>
                        <p class="font-medium">{{ element.title }}</p>
                        <p v-if="element.description" class="text-sm text-muted-foreground">
                            {{ element.description }}
                        </p>
                    </div>
                </template>
            </draggable>
            <div v-show="addNewToggle != column.id"
                class="mt-2 flex space-x-2 hoover-section p-2 rounded-lg cursor-pointer"
                @click="addNewToggle = column.id">
                <Plus />
                <label for="addNewCard">Add a card</label>
            </div>
            <div class="mt-2" v-show="addNewToggle === column.id">
                <div class="bg-background p-3 rounded-lg shadow-sm">
                    <input v-model="newTaskTitle" type="text" name="add-task" :id="column.id"
                        placeholder="Enter a title or paste a link">
                </div>
                <div class="flex items-center">
                    <Button title="Add New" @click="addTask(column.id)"> Add New</Button>
                    <X @click="addNewToggle = ''" />
                </div>
            </div>
        </li>
    </ol>
</template>