<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { X } from 'lucide-vue-next'
import { Separator } from './ui/separator'
import type { DateValue } from '@internationalized/date'
import { getLocalTimeZone, today } from '@internationalized/date'
import { ChevronDownIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import CheckList from './CheckList.vue'
import { useCardCheckList, type CheckList as CheckModel } from '@/stores/card';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { ref } from 'vue'
import type { Ref } from 'vue'
const cardEntity = useCardCheckList()
const router = useRouter()
const route = useRoute()

function close() {
    router.push({ name: 'board', params: { id: route.params.id } })
}
const date = ref(today(getLocalTimeZone())) as Ref<DateValue>
const open = ref<Record<string, boolean>>(
    {
        date: false,
        checkList: false
    }
)
function addItemCheckList(item: CheckModel):void{
    cardEntity.addItem(item)
    open.value.checkList = false
}
const inputVal = ref<CheckModel>({label:''})
</script>

<template>
    <!-- Overlay -->
    <div class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        <!-- Modal Container -->
        <Card class="relative w-full max-w-3xl shadow-2xl h-full z-999">
            <CardHeader>
                <X @click="close" class="absolute right-4 top-4 cursor-pointer" />
                <CardTitle>To Do</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent >  
                <div class="flex flex-col">
                    <p>{{ $route.params.cardId }}</p>
                    <div class="mt-5 space-x-2">
                        <Popover v-model:open="open.date">
                            <PopoverTrigger as-child>
                                <Button id="date-picker" variant="outline" class="justify-between font-normal">
                                    Dates
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent class="w-auto overflow-hidden p-0" align="start">
                                <Calendar :model-value="date" @update:model-value="(value) => {
                                    if (value) {
                                        date = value
                                        open.date = false
                                    }
                                }" />
                            </PopoverContent>
                        </Popover>
                        <Popover v-model:open="open.checkList">
                            <PopoverTrigger as-child>
                                <Button variant="outline" class="justify-between font-normal">
                                    ChekList
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent class="w-auto overflow-hidden p-0" align="start">
                                <CardHeader class="mt-2 flex items-center justify-between">
                                    <CardTitle>Add Checklist</CardTitle>
                                    <div @click="open.checkList = false" class="hover:bg-accent p-2 rounded-lg cursor-pointer">
                                        <X class="size-4"/>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div class="flex flex-col mt-10 gap-4">
                                        <Label> Title</Label>
                                        <Input v-model="inputVal.label"/>
                                    </div>
                                </CardContent>
                                <CardFooter class="mt-2 mb-2 space-x-2">
                                    <Button @click="addItemCheckList(inputVal)">Add</Button>
                                </CardFooter>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div class="flex mt-10">
                    <Label>Description</Label>
                    <textarea name="text" ></textarea>
                </div>
                <div class="overflow-y-auto max-h-[70%]">

                    <CheckList />
                </div>
            </CardContent>
            <CardFooter>
                
            </CardFooter>
        </Card>
    </div>
</template>