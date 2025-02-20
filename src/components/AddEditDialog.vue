<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
    show: Boolean,
    user: Object,
    isEditing: Boolean
});

const emit = defineEmits(['close', 'saveUser']);

const closeDialog = () => {
    emit('close');
};

const user = ref({
    name: '',
    email: '',
    phone: '',
    role: ''
});

const form = ref(null);
const valid = ref(false);

watch(() => props.user, (newUser) => {
    if (newUser) {
        user.value = { ...newUser };
    } else {
        user.value = { name: '', email: '', phone: '', role: '' };
    }
}, { immediate: true });

const saveUser = async () => {
    const { valid: isValid } = await form.value.validate();
    if (isValid) {
        emit('saveUser', user.value);
        emit('close');
    }
};

const required = (value) => !!value || 'This field is required';
const emailRule = (value) => /.+@.+\..+/.test(value) || 'Enter a valid email';
const phoneRule = (value) => /^\d{10}$/.test(value) || 'Enter a valid 10-digit phone number';
const nameRule = (value) => /^[A-Za-z\s]+$/.test(value) || 'Name should contain only letters';
</script>

<template>
    <v-dialog v-model="props.show" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <span class="text-h5">Add User</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field v-model="user.name" label="User Name" variant="outlined" :rules="[required, nameRule]"
                        required style="padding: 5px;"></v-text-field>
                    <v-text-field v-model="user.email" label="User Email" variant="outlined"
                        :rules="[required, emailRule]" required style="padding: 5px;"></v-text-field>
                    <v-text-field v-model="user.phone" label="Phone Number" variant="outlined"
                        :rules="[required, phoneRule]" required style="padding: 5px;"></v-text-field>
                    <v-select v-model="user.role" label="Select role" :items="['Viewer', 'Admin']" variant="outlined"
                        :rules="[required]" required style="padding: 5px;"></v-select>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="closeDialog">Cancel</v-btn>
                <v-btn color="#2c3e50" :disabled="!valid" @click="saveUser">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
