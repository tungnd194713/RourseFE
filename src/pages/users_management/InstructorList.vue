<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card>
                    <div slot="header" class="clearfix">
                        <h2>Instructor Management</h2>
                        <el-button style="float: right;" type="primary" @click="openAddInstructorDialog">Add Instructor</el-button>
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

                    <el-table :data="filteredInstructors" style="width: 100%;">
                        <el-table-column width="50" label="No.">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px;">{{ scope.$index + 1 }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="Name" width="180"></el-table-column>
                        <el-table-column prop="email" label="Email"></el-table-column>
                        <el-table-column prop="birthday" label="Birthday">
                            <template slot-scope="scope">
                                <span>{{ scope.row.birthday ? scope.row.birthday.split('T')[0] : '' }}</span>
                            </template>
                        </el-table-column>
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
                                <el-button size="mini" type="primary" @click="openEditInstructorDialog(scope.row)">Edit</el-button>
                                <el-button size="mini" type="danger" @click="deleteInstructor(scope.row.id)">Delete</el-button>
                            </template>
                            <template slot-scope="scope">
                                <el-dropdown split-button type="primary">
                                    Action
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>
                                            <div @click="openEditInstructorDialog(scope.row)">Sửa thông tin</div>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <div>Xem hồ sơ Instructor</div>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <div>Danh sách khóa học</div>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <div @click="deleteInstructor(scope.row.id)">Xóa người dùng</div>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>

        <!-- Add/Edit Instructor Dialog -->
        <el-dialog :title="isEdit ? 'Edit Instructor' : 'Add Instructor'" :visible.sync="instructorDialogVisible">
            <el-form :model="instructorForm" :rules="instructorFormRules" ref="instructorForm" label-width="150px">
                <el-form-item label="Name" prop="name">
                    <el-input v-model="instructorForm.name"></el-input>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="instructorForm.email"></el-input>
                </el-form-item>
                <el-form-item label="Birthday" prop="birthday">
                    <el-date-picker v-model="instructorForm.birthday" type="date" placeholder="Pick a day"> </el-date-picker>
                </el-form-item>
                <el-form-item label="Phone Number" prop="phone_number">
                    <el-input v-model="instructorForm.phone_number"></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input v-model="instructorForm.password"></el-input>
                </el-form-item>
                <!-- <el-form-item label="Password Confirm" prop="repassword">
                    <el-input v-model="instructorForm.repassword"></el-input>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="instructorDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="handleSaveInstructor">Save</el-button>
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
import { UserService } from '@/services';
    export default {
        data() {
            return {
                instructors: [
                    { id: 1, name: "John Doe", email: "john@example.com", status: "active" },
                    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive" },
                ],
                filters: {
                    name: "",
                    email: "",
                },
                instructorDialogVisible: false,
                isEdit: false,
                instructorForm: {
                    name: "",
                    email: "",
                    password: '',
                    birthday: '',
                    phone_number: '',
                    // repassword: '',
                },
                instructorFormRules: {
                    name: [{ required: true, message: "Please input the name", trigger: "blur" }],
                    email: [
                        { required: true, message: "Please input the email", trigger: "blur" },
                        { type: "email", message: "Please input a valid email", trigger: "blur" },
                    ],
                },
                statusDialogVisible: false,
                selectedInstructor: null,
                newStatus: null,
                query: {
					role: 'instructor',
					page: 1,
					limit: 10,
					sortBy: 'createdAt',
				},
            };
        },
        computed: {
            filteredInstructors() {
                return this.instructors.filter((instructor) => {
                    return (this.filters.name ? instructor.name.toLowerCase().includes(this.filters.name.toLowerCase()) : true) && (this.filters.email ? instructor.email.toLowerCase().includes(this.filters.email.toLowerCase()) : true);
                });
            },
        },
        created() {
            this.getUsers();
        },
        methods: {
            async getUsers() {
				try {
					const { data } = await UserService.getUsers(this.query);
					if (data) {
						this.instructors = data.results;
					}
				} catch (e) {
					this.$notify({
						title: 'Error',
						message: e
					});
				}
			},
            openAddInstructorDialog() {
                this.isEdit = false;
                this.instructorForm = {
                    name: "",
                    email: "",
                    password: '',
                    birthday: '',
                    phone_number: '',
                    // repassword: '',
                };
                this.instructorDialogVisible = true;
            },
            openEditInstructorDialog(instructor) {
                this.isEdit = true;
                this.instructorForm = { ...instructor };
                this.instructorDialogVisible = true;
            },
            handleSaveInstructor() {
                this.$refs.instructorForm.validate((valid) => {
                    if (valid) {
                        if (this.isEdit) {
                            const index = this.instructors.findIndex((instructor) => instructor.id === this.instructorForm.id);
                            if (index !== -1) {
                                this.instructors.splice(index, 1, { ...this.instructorForm });
                            }
                        } else {
                            UserService.createUser({
                                ...this.instructorForm,
                                role: 'instructor',
                            }).then((value) => {
                                this.instructors.push(value);
                                this.$notify({
                                    title: 'Success',
                                    message: 'Đã thêm Instructor'
                                })
                            }, (error) => {
                                this.$notify({
                                    title: 'Error',
                                    message: error.statusText
                                })
                            })
                        }
                        this.instructorDialogVisible = false;
                    }
                });
            },
            confirmStatusChange(instructor, newStatus) {
                this.originalStatus = instructor.status;
                this.selectedInstructor = instructor;
                this.newStatus = newStatus;
                this.statusDialogVisible = true;
            },
            confirmStatusChangeConfirmed() {
                this.selectedInstructor.status = this.newStatus;
                this.statusDialogVisible = false;
                // The status is already updated in the `confirmStatusChange` method.
            },
            cancelStatusChange() {
                this.statusDialogVisible = false;
            },
            deleteInstructor(id) {
                this.instructors = this.instructors.filter((instructor) => instructor.id !== id);
            },
            applyFilters() {
                // This method will trigger the computed property `filteredInstructors` to recalculate
            },
            resetFilters() {
                this.filters = {
                    name: "",
                    email: "",
                };
                // This method will trigger the computed property `filteredInstructors` to recalculate
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
