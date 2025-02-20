<script setup>
import { useUsers } from '../composables/useUsers';
import AddEditDialog from './AddEditDialog.vue';
import DeleteDialog from './DeleteDialog.vue';

const {
    users,
    headers,
    addEditDialog,
    deleteDialog,
    toBeEditedUser,
    isEditing,
    openAddEditDialog,
    closeAddEditDialog,
    openDeleteDialog,
    closeDeleteDialog,
    handleSaveUser,
    handleDeleteUser
} = useUsers();
</script>

<template>
    <div class="full-container">
        <h6 class="user-management-title">User Management</h6>
        <div class="table-container">
            <div>
                <v-btn size="large" @click="openAddEditDialog" color="#2c3e50">Add Users</v-btn>
                <AddEditDialog :show="addEditDialog" :user="toBeEditedUser" :isEditing="isEditing"
                    @close="closeAddEditDialog" @saveUser="handleSaveUser" />
                <DeleteDialog :show="deleteDialog" @close="closeDeleteDialog" @deleteUser="handleDeleteUser" />
            </div>
            <div>
                <v-data-table :headers="headers" :items="users" class="mt-5 custom-table" hide-default-footer>
                    <template v-slot:item.actions="{ item }">
                        <v-icon class="me-2" size="small" @click="openAddEditDialog(item)">
                            mdi-pencil
                        </v-icon>
                        <v-icon size="small" @click="openDeleteDialog(item)">
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </div>
        </div>
    </div>
</template>

<style scoped>
::v-deep(.v-data-table thead tr th) {
    background-color: #2c3e50;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
}

::v-deep(.v-data-table) {
    border: 1px solid lightgrey;
    border-radius: 7px;
}

.full-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: lightgrey;
    gap: 20px;
}

.user-management-title {
    text-align: center;
    font-size: 24px;
    color: #2c3e50;
}

.table-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: white;
    gap: 20px;
    border-radius: 10px;
}
</style>
