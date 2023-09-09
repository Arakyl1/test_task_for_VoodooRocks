<template>
    <div>
        <form>
            <fieldset>
                <p class=" pl-12 relative border border-gray-20 bg-gray-5">
                    <IconSearch :addClass="'stroke-gray-40'"
                        class="absolute left-2 top-1/2 -translate-y-1/2" aria-hidden="true" />
                    <input type="text" tabindex="0" placeholder="Search" @input.stop="onInputSearch"
                        class="input-border w-full p-2 ">
                </p>
            </fieldset>
        </form>
    </div>
</template>

<script setup lang="ts">
import IconSearch from "@/components/Icon/search-alt-2.vue";
const emit = defineEmits<{
    (e: 'search', text: string | null): void
}>()

function onInputSearch({ type, target}: Event) {
    if (type === 'input') {
        const _target = target as HTMLInputElement
        emit('search', _target.value.length ? _target.value : null)
    }
}
</script>