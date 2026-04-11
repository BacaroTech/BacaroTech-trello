<script lang="ts" setup>
import { Checkbox } from './ui/checkbox'
import { SquarePen } from 'lucide-vue-next';
const props = defineProps(['open', 'colorVal', 'list'])
import { useCardCheckList, type LabelItem } from '@/stores/card';
const { addLabel } = useCardCheckList()
import { Label } from './ui/label';
function addNewLabel(color: LabelItem, taskId: string){
    if (taskId) {
        addLabel(color, taskId)
    }
}
</script>
<template>
    <div>
        <!-- Master-->
        <div v-show="!open.editLabel">
            <div class="flex flex-col mt-10 gap-4">
                <Label class="justify-center"> Labels</Label>
                <div v-for="color in colorVal" class="flex gap-2">
                    <div class="hover:opacity-100 flex w-full gap-2"
                        :class="{ 'opacity-50': !color.checked, 'opacity-100': color.checked }">
                        <Checkbox class="m-1" v-model="color.checked" @click="addNewLabel(color, list)" />
                        <span :class="color.color" @click="addLabel(color, list)"
                            class="w-full border h-auto rounded-sm cursor-pointer"></span>
                    </div>
                    <div class="hover:bg-gray-400 rounded-xs cursor-pointer">
                        <SquarePen class="h-4 mt-1 " />
                    </div>
                </div>
            </div>
        </div>
        <!-- CHild-->
        <div v-show="open.editLabel">
        </div>
    </div>
</template>