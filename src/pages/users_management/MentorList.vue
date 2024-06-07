<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card>
                    <div slot="header" class="clearfix">
                        <h2>Mentor Management</h2>
                        <el-button style="float: right;" type="primary" @click="openAddMentorDialog">Add Mentor</el-button>
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

                    <el-table :data="filteredMentors" style="width: 100%;">
                        <el-table-column width="50" label="No.">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px;">{{ scope.$index + 1 }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="Name" width="180"></el-table-column>
                        <el-table-column prop="email" label="Email"></el-table-column>
                        <el-table-column prop="birthday" label="Birthday"></el-table-column>
                        <el-table-column prop="phone_number" label="Phone"></el-table-column>
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
                                <el-button size="mini" type="primary" @click="openEditMentorDialog(scope.row)">Edit</el-button>
                                <el-button size="mini" type="danger" @click="deleteMentor(scope.row.id)">Delete</el-button>
                            </template>
                            <template slot-scope="scope">
                                <el-dropdown split-button type="primary">
                                    Action
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>
                                            <div @click="openEditMentorDialog(scope.row)">Sửa thông tin</div>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <div>Xem thông tin mentor</div>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <div>Danh sách khóa học hỗ trợ</div>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <div @click="deleteMentor(scope.row.id)">Xóa người dùng</div>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>

        <!-- Add/Edit Mentor Dialog -->
        <el-dialog :title="isEdit ? 'Edit Mentor' : 'Add Mentor'" :visible.sync="mentorDialogVisible">
            <el-form :model="mentorForm" :rules="mentorFormRules" ref="mentorForm" label-width="120px">
                <el-form-item label="Name" prop="name">
                    <el-input v-model="mentorForm.name"></el-input>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="mentorForm.email"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="mentorDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="handleSaveMentor">Save</el-button>
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
                mentors: [
                    { id: 1, name: "John Doe", email: "john@example.com", status: "active" },
                    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive" },
                ],
                filters: {
                    name: "",
                    email: "",
                },
                mentorDialogVisible: false,
                isEdit: false,
                mentorForm: {
                    id: null,
                    name: "",
                    email: "",
                    status: "",
                },
                mentorFormRules: {
                    name: [{ required: true, message: "Please input the name", trigger: "blur" }],
                    email: [
                        { required: true, message: "Please input the email", trigger: "blur" },
                        { type: "email", message: "Please input a valid email", trigger: "blur" },
                    ],
                    status: [{ required: true, message: "Please select a status", trigger: "change" }],
                },
                statusDialogVisible: false,
                selectedMentor: null,
                newStatus: null,
            };
        },
        computed: {
            filteredMentors() {
                return this.mentors.filter((mentor) => {
                    return (this.filters.name ? mentor.name.toLowerCase().includes(this.filters.name.toLowerCase()) : true) && (this.filters.email ? mentor.email.toLowerCase().includes(this.filters.email.toLowerCase()) : true);
                });
            },
        },
        methods: {
            openAddMentorDialog() {
                this.isEdit = false;
                this.mentorForm = { id: null, name: "", email: "", status: "" };
                this.mentorDialogVisible = true;
            },
            openEditMentorDialog(mentor) {
                this.isEdit = true;
                this.mentorForm = { ...mentor };
                this.mentorDialogVisible = true;
            },
            handleSaveMentor() {
                this.$refs.mentorForm.validate((valid) => {
                    if (valid) {
                        if (this.isEdit) {
                            const index = this.mentors.findIndex((mentor) => mentor.id === this.mentorForm.id);
                            if (index !== -1) {
                                this.mentors.splice(index, 1, { ...this.mentorForm });
                            }
                        } else {
                            this.mentorForm.id = Date.now();
                            this.mentors.push({ ...this.mentorForm });
                        }
                        this.mentorDialogVisible = false;
                    }
                });
            },
            confirmStatusChange(mentor, newStatus) {
                this.originalStatus = mentor.status;
                this.selectedMentor = mentor;
                this.newStatus = newStatus;
                this.statusDialogVisible = true;
            },
            confirmStatusChangeConfirmed() {
                this.selectedMentor.status = this.newStatus;
                this.statusDialogVisible = false;
                // The status is already updated in the `confirmStatusChange` method.
            },
            cancelStatusChange() {
                this.statusDialogVisible = false;
            },
            deleteMentor(id) {
                this.mentors = this.mentors.filter((mentor) => mentor.id !== id);
            },
            applyFilters() {
                // This method will trigger the computed property `filteredMentors` to recalculate
            },
            resetFilters() {
                this.filters = {
                    name: "",
                    email: "",
                };
                // This method will trigger the computed property `filteredMentors` to recalculate
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
