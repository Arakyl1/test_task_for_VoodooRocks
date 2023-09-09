<script setup lang="ts">
import OrganismmsSearch from "@/components/Organisms/Form/Search.vue";
import MoleculesItemCard from "@/components/Molecules/Item/Card.vue";
import { computed, onBeforeMount, ref } from "vue";
import type { ArticleCard, AtricleUser } from "./type";

const data = ref<ArticleCard[] | null>(null)
const userData = ref<AtricleUser[] | null>(null)
const searchData = ref<(ArticleCard & { author: AtricleUser | null })[] | null>(null)
const searchText = ref<string | null>(null)
const searchActive = ref<boolean>(false)
const mapUser = computed(() => {
  if (userData.value) {
    const mapUser = new Map<number, AtricleUser>()
    for (let i = 0, l = userData.value.length; i < l; i++) {
      const item = userData.value[i];
      if (!mapUser.has(item.id)) {
        mapUser.set(item.id, item)
      }
    }
    return mapUser
  }
  return null
})


const ArrCardWithInfoAuthor = computed<(ArticleCard & { author: AtricleUser | null })[]>(() => {
  if (data.value && mapUser.value && data.value.length) {
    return JSON.parse(JSON.stringify(data.value)).map((_: ArticleCard) => ({ ..._, author: mapUser.value!.has(_.userId as never) ? mapUser.value!.get(_.userId as never) : null }))
  }
})



function searchCardUser(text: string | null) {
  if (text) {
    if (!searchActive.value) {
      searchActive.value = true
      searchText.value = text
      const responseChange = (JSON.parse(JSON.stringify(searchData.value && searchData.value.length ? searchData.value : ArrCardWithInfoAuthor.value)) as (ArticleCard & { author: AtricleUser | null })[]).filter(_ => (_.author ?
        (_.author.username.toUpperCase()).includes(text!.toUpperCase()) ||
        (_.author.name.toUpperCase()).includes(text!.toUpperCase()) :
        false))
      if (text !== searchText.value) {
        searchCardUser(searchText.value)
      } else {
        searchData.value = responseChange
        searchActive.value = false
      }
    } else {
      searchText.value = text
    }
  } else {
    searchData.value = null
  }
}


onBeforeMount(async () => {
  const cardDataRes = await getData<ArticleCard[]>('/posts')
  if (cardDataRes) {
    if ((Array.isArray(cardDataRes))) {
      data.value = cardDataRes
    }
  }

  const userDataRes = await getData<AtricleUser[]>('/users')
  if (userDataRes) {
    if ((Array.isArray(userDataRes))) {
      userData.value = userDataRes
    }
  }

})

type getDataUrl = `/${'posts' | 'users'}`
async function getData<T extends any>(url: getDataUrl): Promise<T | null> {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com' + url)
    if (res.status < 400) {
      return await res.json()
    }
    return null
  } catch (error) {
    console.log("Something went wrong")
    return null
  }
}


</script>

<template>
  <header></header>
  <main class="bg-blue-10 min-h-screen">
    <div class="container mx-auto px-4">
      <div class="h-2"></div>
      <div class="flex justify-center">
        <div class="w-full md:w-1/2 lg:w-1/3 sm:px-1">
          <OrganismmsSearch @search="(e) => searchCardUser(e)" />
        </div>
      </div>
      <div class="h-2"></div>
      <div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          v-if="data && Array.isArray(ArrCardWithInfoAuthor)">
          <template v-for="item in (searchData ? searchData : ArrCardWithInfoAuthor)" :key="item.id">
            <MoleculesItemCard class="flex" :data="item" />
          </template>
        </div>
      </div>
    </div>
  </main>
  <footer></footer>
</template>

<style lang="css"></style>
