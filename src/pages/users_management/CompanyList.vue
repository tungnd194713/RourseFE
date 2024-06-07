<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card>
                    <div slot="header" class="clearfix">
                        <h2>Company Management</h2>
                        <el-button style="float: right;" type="primary" @click="openAddCompanyDialog">Add Company</el-button>
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

                    <el-table :data="filteredCompanys" style="width: 100%;">
                        <el-table-column width="50" label="No.">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px;">{{ scope.$index + 1 }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="Name" width="180"></el-table-column>
                        <el-table-column prop="email" label="Email"></el-table-column>
                        <el-table-column prop="createdAt" label="Join Date"></el-table-column>
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
                                <el-button size="mini" type="primary" @click="openEditCompanyDialog(scope.row)">Edit</el-button>
                                <el-button size="mini" type="danger" @click="deleteCompany(scope.row.id)">Delete</el-button>
                            </template>
                            <template slot-scope="scope">
                                <el-dropdown split-button type="primary">
                                    Action
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>
                                            <div @click="openEditCompanyDialog(scope.row)">Sửa thông tin</div>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <div>Xem thông tin doanh nghiệp</div>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <div>Danh sách tin ứng tuyển</div>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <div>Danh sách ứng viên</div>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <div @click="deleteCompany(scope.row.id)">Xóa doanh nghiệp</div>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>

        <!-- Add/Edit Company Dialog -->
        <el-dialog :title="isEdit ? 'Edit Company' : 'Add Company'" :visible.sync="companyDialogVisible">
            <el-form :model="companyForm" :rules="companyFormRules" ref="companyForm" label-width="120px">
                <el-form-item label="Name" prop="name">
                    <el-input v-model="companyForm.name"></el-input>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="companyForm.email"></el-input>
                </el-form-item>
                <el-form-item label="Phone Number" prop="phone_number">
                    <el-input v-model="companyForm.phone_number"></el-input>
                </el-form-item>
                <el-form-item label="Point" prop="point_owned">
                    <el-input type="number" v-model="companyForm.point_owned"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="companyDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="handleSaveCompany">Save</el-button>
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
                companys: [
                    { id: 1, name: "John Doe", email: "john@example.com", status: "active" },
                    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive" },
                ],
                filters: {
                    name: "",
                    email: "",
                },
                companyDialogVisible: false,
                isEdit: false,
                companyForm: {
                    id: null,
                    name: "",
                    email: "",
                    status: "",
                },
                companyFormRules: {
                    name: [{ required: true, message: "Please input the name", trigger: "blur" }],
                    email: [
                        { required: true, message: "Please input the email", trigger: "blur" },
                        { type: "email", message: "Please input a valid email", trigger: "blur" },
                    ],
                    status: [{ required: true, message: "Please select a status", trigger: "change" }],
                },
                statusDialogVisible: false,
                selectedCompany: null,
                newStatus: null,
            };
        },
        computed: {
            filteredCompanys() {
                return this.companys.filter((company) => {
                    return (this.filters.name ? company.name.toLowerCase().includes(this.filters.name.toLowerCase()) : true) && (this.filters.email ? company.email.toLowerCase().includes(this.filters.email.toLowerCase()) : true);
                });
            },
        },
        methods: {
            openAddCompanyDialog() {
                this.isEdit = false;
                this.companyForm = { id: null, name: "", email: "", status: "" };
                this.companyDialogVisible = true;
            },
            openEditCompanyDialog(company) {
                this.isEdit = true;
                this.companyForm = { ...company };
                this.companyDialogVisible = true;
            },
            handleSaveCompany() {
                this.$refs.companyForm.validate((valid) => {
                    if (valid) {
                        if (this.isEdit) {
                            const index = this.companys.findIndex((company) => company.id === this.companyForm.id);
                            if (index !== -1) {
                                this.companys.splice(index, 1, { ...this.companyForm });
                            }
                        } else {
                            this.companyForm.id = Date.now();
                            this.companys.push({ ...this.companyForm });
                        }
                        this.companyDialogVisible = false;
                    }
                });
            },
            confirmStatusChange(company, newStatus) {
                this.originalStatus = company.status;
                this.selectedCompany = company;
                this.newStatus = newStatus;
                this.statusDialogVisible = true;
            },
            confirmStatusChangeConfirmed() {
                this.selectedCompany.status = this.newStatus;
                this.statusDialogVisible = false;
                // The status is already updated in the `confirmStatusChange` method.
            },
            cancelStatusChange() {
                this.statusDialogVisible = false;
            },
            deleteCompany(id) {
                this.companys = this.companys.filter((company) => company.id !== id);
            },
            applyFilters() {
                // This method will trigger the computed property `filteredCompanys` to recalculate
            },
            resetFilters() {
                this.filters = {
                    name: "",
                    email: "",
                };
                // This method will trigger the computed property `filteredCompanys` to recalculate
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
