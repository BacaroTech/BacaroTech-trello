<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue'
import draggable from 'vuedraggable'
import { useCardCheckList } from '@/stores/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
const { items, addNewListItem, editListItem } = useCardCheckList()
import type { CheckList, ListItem } from '@/stores/card';
import { ListChecks } from 'lucide-vue-next';
const newItem = ref<CheckList>({
    label: ''
})
const activeItems = ref<{
    label: string | number | null
}>({
    label: null
})
function addItemList(item: ListItem, listId: CheckList): void {
    if (item.label == '') return;
    addNewListItem(item, listId)
    item.label = ''
}
function editItem(item: ListItem, listId: CheckList): void{
    editListItem(item, listId)
    toggleItem(String(item.id))
}
function toggleItem(label: string | number): void {
    if (activeItems.value.label === label) {
        activeItems.value = { label: null }
    } else {
        activeItems.value = { label }
    }
    newItem.value.label = ''
}
</script>
<template>
    <section class="grid grid-cols-1 space-y-3" v-for="item in items">
        <div class="flex gap-2 items-start">
            <ListChecks class="size-s" />
            <span>{{ item.label }}</span>
        </div>
        <draggable v-model="item.lists" item-key="id" tag="ol" class="space-y-2 col-span-2">
            <template #item="{ element }">
                <li class="flex gap-2 cursor-move"
                    :class="{ 'py-5 items-start': activeItems.label === element.id, 'items-center': !(activeItems.label === element.id) }">
                    <Checkbox v-model="element.checked" />
                    <label @click="toggleItem(element.id)" v-show="!(activeItems.label === element.id)"
                        class="w-full hover:bg-accent p-2 rounded-lg text-sm">
                        {{ element.label }}
                    </label>
                    <div v-show="activeItems.label === element.id"
                        class="relative flex flex-col w-full items-start space-y-3 border bg-accent rounded-lg">
                        <Input v-model="element.label" />
                        <div class="flex gap-2 p-2">
                            <Button @click="editItem(element, item)">Save</Button>
                            <Button @click="toggleItem(element.id)">Cancel</Button>
                        </div>
                    </div>
                </li>
            </template>
        </draggable>
        <div v-show="!(activeItems.label === item.label)">
            <Button @click="toggleItem(item.label)">Add a item</Button>
        </div>
        <div v-show="activeItems.label === item.label">
            <Input v-model="newItem.label" />
            <div class="flex justify-start gap-2 py-2">
                <Button @click="addItemList(newItem, item)">Add</Button>
                <Button @click="toggleItem(item.label)">Cancel</Button>
            </div>
        </div>

    </section>
</template>