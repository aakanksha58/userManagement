import { ref, onMounted } from 'vue';

export function useUsers() {
    const users = ref([]);
    const addEditDialog = ref(false);
    const deleteDialog = ref(false);
    const toBeDeletedUser = ref(null);
    const toBeEditedUser = ref(null);
    const isEditing = ref(false);

    const headers = ref([
        { title: 'Username', key: 'name' },
        { title: 'Phone', key: 'phone' },
        { title: 'Email', key: 'email' },
        { title: 'Role', key: 'role' },
        { title: 'Actions', key: 'actions', sortable: false }
    ]);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/users');
            const data = await res.json();

            if (data.success) {
                users.value = data.data;
            } else {
                console.error('Error:', data.error);
            }
        } catch (err) {
            console.error('Fetch error:', err);
        }
    };

    const openAddEditDialog = (user = null) => {
        if (user?.name) {
            isEditing.value = true;
            toBeEditedUser.value = { ...user };
        } else {
            isEditing.value = false;
            toBeEditedUser.value = { name: '', email: '', phone: '', role: '' };
        }
        addEditDialog.value = true;
    };

    const closeAddEditDialog = () => {
        addEditDialog.value = false;
    };

    const openDeleteDialog = (user) => {
        toBeDeletedUser.value = user;
        deleteDialog.value = true;
    };

    const closeDeleteDialog = () => {
        deleteDialog.value = false;
    };

    const handleSaveUser = async (userData) => {
        try {
            const method = userData.id ? 'PUT' : 'POST';

            const res = await fetch('/api/users', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            if (data.success) {
                fetchUsers()
                closeAddEditDialog();
            } else {
                console.error('API Error:', data.error);
            }
        } catch (err) {
            console.error('Save error:', err);
        }
    };

    const handleDeleteUser = async () => {
        try {
            const res = await fetch('/api/users', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: toBeDeletedUser.value.id }) 
            });

            const data = await res.json();
            if (data.success) {
                fetchUsers()
                closeDeleteDialog();
            } else {
                console.error('Error:', data.error);
            }
        } catch (err) {
            console.error('DELETE error:', err);
        }
    };

    onMounted(fetchUsers);

    return {
        users,
        headers,
        addEditDialog,
        deleteDialog,
        toBeDeletedUser,
        toBeEditedUser,
        isEditing,
        openAddEditDialog,
        closeAddEditDialog,
        openDeleteDialog,
        closeDeleteDialog,
        handleSaveUser,
        handleDeleteUser
    };
}
