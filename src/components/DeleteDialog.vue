<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    show: Boolean,
});

const emit = defineEmits(['close', 'deleteUser']);

const closeDialog = () => {
    emit('close');
};

const deleteUser =  () => {
    emit('deleteUser');
    emit('close');
};
</script>

<template>
    <v-dialog v-model="props.show" persistent max-width="500px">
        <v-card text="Are you sure you want to delete the user?" title="Delete user?">
            <template v-slot:actions>
                <v-spacer></v-spacer>
                <v-btn @click="closeDialog">
                    Cancel
                </v-btn>
                <v-btn @click="deleteUser" color="#2c3e50">
                    Ok
                </v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>
