<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card>
                    <div slot="header" class="clearfix">
                        <h2>User Management</h2>
                        <el-button style="float: right;" type="primary" @click="openAddUserDialog">Add User</el-button>
                    </div>

                    <el-row :gutter="20" class="filters">
                        <el-col :span="6">
                            <el-input v-model="filters.name" placeholder="Filter by name"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-input v-model="filters.email" placeholder="Filter by email"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="primary" @click="applyFilters">Apply Filters</el-button>
                            <el-button @click="resetFilters">Reset Filters</el-button>
                        </el-col>
                    </el-row>

                    <el-table :data="filteredUsers" style="width: 100%;">
                        <el-table-column width="50" label="No.">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px;">{{ scope.$index + 1 }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="Name" width="180"></el-table-column>
                        <el-table-column prop="email" label="Email"></el-table-column>
                        <el-table-column prop="birthday" label="Birthday"></el-table-column>
                        <el-table-column prop="phone_number" label="Phone"></el-table-column>
                        <el-table-column prop="point_owned" label="Point"></el-table-column>
                        <el-table-column label="Status" width="150">
                            <template slot-scope="scope">
                                <el-select :value="scope.row.status" placeholder="Select Status" @change="confirmStatusChange(scope.row, $event)">
                                    <el-option label="Active" value="active"></el-option>
                                    <el-option label="Inactive" value="inactive"></el-option>
                                    <el-option label="Suspended" value="suspended"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="Actions" width="180">
                            <template slot-scope="scope">
                                <el-button size="mini" type="primary" @click="openEditUserDialog(scope.row)">Edit</el-button>
                                <el-button size="mini" type="danger" @click="deleteUser(scope.row.id)">Delete</el-button>
                            </template>
                            <template slot-scope="scope">
                                <el-dropdown split-button type="primary">
                                    Action
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>
                                            <div @click="openEditUserDialog(scope.row)">Sửa thông tin</div>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <div>Xem hồ sơ người dùng</div>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <div>Danh sách công việc đã tuyển</div>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <div>Danh sách khóa học đã học</div>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <div @click="deleteUser(scope.row.id)">Xóa người dùng</div>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>

        <!-- Add/Edit User Dialog -->
        <el-dialog :title="isEdit ? 'Edit User' : 'Add User'" :visible.sync="userDialogVisible">
            <el-form :model="userForm" :rules="userFormRules" ref="userForm" label-width="120px">
                <el-form-item label="Name" prop="name">
                    <el-input v-model="userForm.name"></el-input>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="userForm.email"></el-input>
                </el-form-item>
                <el-form-item label="Birthday" prop="birthday">
                    <el-date-picker v-model="userForm.birthday" type="date" placeholder="Pick a day"> </el-date-picker>
                </el-form-item>
                <el-form-item label="Phone Number" prop="phone_number">
                    <el-input v-model="userForm.phone_number"></el-input>
                </el-form-item>
                <el-form-item label="Point" prop="point_owned">
                    <el-input type="number" v-model="userForm.point_owned"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="userDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="handleSaveUser">Save</el-button>
            </div>
        </el-dialog>

        <!-- Status Change Confirmation Dialog -->
        <el-dialog title="Confirm Status Change" :visible.sync="statusDialogVisible">
            <span>Are you sure you want to change the status?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelStatusChange">Cancel</el-button>
                <el-button type="primary" @click="confirmStatusChangeConfirmed">Confirm</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                users: [
                    { id: 1, name: "John Doe", email: "john@example.com", status: "active" },
                    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive" },
                ],
                filters: {
                    name: "",
                    email: "",
                },
                userDialogVisible: false,
                isEdit: false,
                userForm: {
                    id: null,
                    name: "",
                    email: "",
                    status: "",
                },
                userFormRules: {
                    name: [{ required: true, message: "Please input the name", trigger: "blur" }],
                    email: [
                        { required: true, message: "Please input the email", trigger: "blur" },
                        { type: "email", message: "Please input a valid email", trigger: "blur" },
                    ],
                    status: [{ required: true, message: "Please select a status", trigger: "change" }],
                },
                statusDialogVisible: false,
                selectedUser: null,
                newStatus: null,
            };
        },
        computed: {
            filteredUsers() {
                return this.users.filter((user) => {
                    return (this.filters.name ? user.name.toLowerCase().includes(this.filters.name.toLowerCase()) : true) && (this.filters.email ? user.email.toLowerCase().includes(this.filters.email.toLowerCase()) : true);
                });
            },
        },
        methods: {
            openAddUserDialog() {
                this.isEdit = false;
                this.userForm = { id: null, name: "", email: "", status: "" };
                this.userDialogVisible = true;
            },
            openEditUserDialog(user) {
                this.isEdit = true;
                this.userForm = { ...user };
                this.userDialogVisible = true;
            },
            handleSaveUser() {
                this.$refs.userForm.validate((valid) => {
                    if (valid) {
                        if (this.isEdit) {
                            const index = this.users.findIndex((user) => user.id === this.userForm.id);
                            if (index !== -1) {
                                this.users.splice(index, 1, { ...this.userForm });
                            }
                        } else {
                            this.userForm.id = Date.now();
                            this.users.push({ ...this.userForm });
                        }
                        this.userDialogVisible = false;
                    }
                });
            },
            confirmStatusChange(user, newStatus) {
                this.originalStatus = user.status;
                this.selectedUser = user;
                this.newStatus = newStatus;
                this.statusDialogVisible = true;
            },
            confirmStatusChangeConfirmed() {
                this.selectedUser.status = this.newStatus;
                this.statusDialogVisible = false;
                // The status is already updated in the `confirmStatusChange` method.
            },
            cancelStatusChange() {
                this.statusDialogVisible = false;
            },
            deleteUser(id) {
                this.users = this.users.filter((user) => user.id !== id);
            },
            applyFilters() {
                // This method will trigger the computed property `filteredUsers` to recalculate
            },
            resetFilters() {
                this.filters = {
                    name: "",
                    email: "",
                };
                // This method will trigger the computed property `filteredUsers` to recalculate
            },
        },
    };
</script>

<style scoped>
    .filters {
        margin-bottom: 20px;
    }

    .cool-card {
        border: 1px solid #e4e7ed;
        border-radius: 10px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .header {
        font-size: 1.5em;
        font-weight: bold;
        text-align: center;
        background-color: #f5f7fa;
        padding: 10px 0;
        border-bottom: 1px solid #e4e7ed;
        border-radius: 10px 10px 0 0;
    }

    .body {
        padding: 20px;
    }

    .actions {
        text-align: center;
        margin-top: 20px;
    }

    .start-button {
        background-color: #409eff;
        border-color: #409eff;
        color: white;
    }
</style>
