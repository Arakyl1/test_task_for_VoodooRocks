<template>
    <article>
        <div class="bg-white px-4 py-3 flex flex-col" v-if="data">
            <h1 class="text-blue-50 mb-1 text-xl leading-3">{{ capitalizeFirstLetter(data.title) }}</h1>
            <p class="leading-4 line-clamp-5 mb-3 grow">{{  capitalizeFirstLetter(data.body)  }}</p>
            <div>
                <p class="leading-3 text-gray-40" v-if="data.author">{{ data.author.name  }}</p>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts" generic="T extends number">
import { type ArticleCard, type AtricleUser } from "@/type";
import { capitalizeFirstLetter } from '@/utils/other'
const pros = defineProps<{ data: ArticleCard & { author: AtricleUser | null } | null }>()
</script>