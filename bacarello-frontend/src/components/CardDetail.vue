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
const router = useRouter()
const route = useRoute()

function close() {
    router.push({ name: 'board', params: { id: route.params.id } })
}
</script>

<template>
    <!-- Overlay -->
    <div class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        <!-- Modal Container -->
        <Card class="relative w-full max-w-2xl shadow-2xl">
            <CardHeader>
                <X @click="close" class="absolute right-4 top-4 cursor-pointer" />
                <CardTitle>{{ $route.params.cardId }}</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>

        </Card>
    </div>
</template>