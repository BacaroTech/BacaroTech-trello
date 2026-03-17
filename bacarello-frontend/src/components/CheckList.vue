<script lang="ts" setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'
import { useCardCheckList } from '@/stores/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
const cardEntity = useCardCheckList()
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
    cardEntity.addNewListItem(item, listId)
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
    <section class="grid grid-cols-1 space-y-3" v-for="items in cardEntity.items">
        <div class="flex gap-2 items-start">
            <ListChecks class="size-s"/>
            <span>{{ items.label }}</span>
        </div>
        <draggable v-model="items.lists" item-key="id" tag="ol" class="space-y-2 col-span-2">
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
                            <Button @click="addItemList(element.label, items)">Save</Button>
                            <Button @click="toggleItem(element.id)">Cancel</Button>
                        </div>
                    </div>
                </li>
            </template>
        </draggable>
        <div v-show="!( activeItems.label === items.label)">
            <Button @click="toggleItem(items.label)">Add a item</Button>
        </div>
        <div v-show="activeItems.label === items.label">
            <Input v-model="newItem.label" />
            <div class="flex justify-start gap-2 py-2">
                <Button @click="addItemList(newItem, items)">Add</Button>
                <Button @click="toggleItem(items.label)">Cancel</Button>
            </div>
        </div>

    </section>
</template>