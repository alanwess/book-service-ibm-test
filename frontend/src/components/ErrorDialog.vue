<template>
    <v-dialog v-if="showDialog">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" color="surface-variant" text="Open Dialog" variant="flat"></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
            <v-card title="Dialog">
                <v-card-text>
                    An unexpected error occurred, check the information entered and try again later!
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn @click="isActive.value = false; closeDialog">
                        <v-icon class="mr-2">mdi-close</v-icon> Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps(['showDialog', 'closeDialog'])
</script>