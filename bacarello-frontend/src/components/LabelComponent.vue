<script lang="ts" setup>
import { Checkbox } from './ui/checkbox'
import { SquarePen } from 'lucide-vue-next';
const props = defineProps(['open', 'colorVal'])
import { useCardCheckList } from '@/stores/card';
const { addLabel } = useCardCheckList()
</script>
<template>
    <!-- Master-->
    <div v-show="!open.editLabel">
        <div class="flex flex-col mt-10 gap-4">
            <Label class="justify-center"> Labels</Label>
            <div v-for="color in colorVal" class="flex gap-2">
                <div class="hover:opacity-100 flex w-full gap-2"
                    :class="{ 'opacity-50': !color.checked, 'opacity-100': color.checked }">
                    <Checkbox class="m-1" v-model="color.checked" @click="addLabel(color)" />
                    <span :class="color.color" @click="addLabel(color)"
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
</template>