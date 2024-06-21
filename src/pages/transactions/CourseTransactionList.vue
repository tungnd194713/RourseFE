<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <h2>Lịch sử thanh toán</h2>
          </div>

          <el-row :gutter="20" class="filters">
            <el-col :span="6">
              <el-input v-model="filters.userName" placeholder="Tìm theo tên học viên"></el-input>
            </el-col>
            <el-col :span="6">
              <el-input v-model="filters.courseName" placeholder="Tìm theo tên khóa học"></el-input>
            </el-col>
						<el-col :span="6">
							<el-select 
								v-model="filters.scholarship_paid"
								class="full-width">
								<el-option 
									value="all"
									key="all"
									label="Tất cả">
								</el-option>
								<el-option 
									value="true" 
									key="true"
									label="Đã thanh toán">
								</el-option>
								<el-option 
									value="false" 
									key="false"
									label="Chưa thanh toán">
								</el-option>
							</el-select>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" @click="applyFilters">Tìm</el-button>
              <el-button @click="resetFilters">Reset</el-button>
            </el-col>
          </el-row>

          <el-table :data="transactionData" style="width: 100%;">
            <el-table-column width="50" label="No.">
              <template slot-scope="scope">
                <span style="margin-left: 10px;">{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="userName" label="Tên học viên" width="180"></el-table-column>
            <el-table-column prop="courseName" label="Khóa học"></el-table-column>
            <el-table-column prop="position" label="Vị trí"></el-table-column>
            <el-table-column prop="scholarship" label="Học bổng">
              <template slot-scope="scope">
                <span style="margin-right: 10px;"><span style="color: #409EFF">{{ scope.row.scholarship }}%</span> | {{ scope.row.companyName }}</span>
              </template>
            </el-table-column>
						<el-table-column label="Chi phí (point)">
              <template slot-scope="scope">
                <span style="margin-right: 4px; text-decoration: line-through; color: #a1a1a1">{{ scope.row.course_point }}</span>
                <span class="fw-bold">{{ scope.row.paid_point }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="unlocked_at" label="Ngày mở khóa">
							<template slot-scope="scope">
                <span style="margin-right: 10px;">{{ scope.row.unlocked_at ? scope.row.unlocked_at.split('T')[0] : '' }}</span>
              </template>
						</el-table-column>
            <el-table-column label="Trạng thái" width="150">
              <template slot-scope="scope">
                <span :style="{ color: scope.row.scholarship_paid ? '#67C23A' : '#E6A23C' }">{{ scope.row.scholarship_paid ? 'Đã thanh toán' : 'Chưa thanh toán' }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column fixed="right" label="Hành động" width="180">
              <template slot-scope="scope">
                <el-dropdown split-button type="primary">
                  Action
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <div @click="openEditUserDialog(scope.row)">Sửa thông tin</div>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <div @click="deleteUser(scope.row.id)">Xóa người dùng</div>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column> -->
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

    <!-- Status Change Point Dialog -->
    <el-dialog title="Thêm point" :visible.sync="pointDialogVisible">
			<el-form :model="pointForm" label-width="200px">
				<el-form-item label="Tên người tìm việc" prop="name">
					<el-input v-model="pointForm.name" disabled></el-input>
				</el-form-item>
				<el-form-item label="Email" prop="email">
					<el-input v-model="pointForm.email" disabled></el-input>
				</el-form-item>
				<el-form-item label="Số point hiện tại">
					<el-input v-model="pointForm.point" disabled></el-input>
				</el-form-item>
				<el-form-item label="Số point thêm" prop="email">
					<el-input v-model="pointForm.addingPoint" type="number"></el-input>
				</el-form-item>
			</el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pointDialogVisible = false">Hủy bỏ</el-button>
        <el-button type="primary" @click="updateUserPoint()">Xác nhận</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { CourseService, UserService } from '@/services'

  export default {
    data() {
      return {
        transactionData: [],
        filters: {
          userName: "",
          courseName: "",
					scholarship_paid: 'all'
        },
        userDialogVisible: false,
        pointDialogVisible: false,
        pointForm: {},
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
				query: {
					role: 'user',
					page: 1,
					limit: 10,
					sortBy: 'createdAt',
				}
      };
    },
		created() {
			this.getTransactions()
		},
    methods: {
			async getTransactions() {
				try {
					const { data } = await CourseService.getCourseTransactions(this.filters);
					if (data) {
						this.transactionData = data.results
					}
				} catch (e) {
					this.$notify({
						title: 'Error',
						message: e
					});
				}
			},
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
      async confirmStatusChangeConfirmed() {
				try {
					await UserService.updateUser(this.selectedUser.id || this.selectedUser._id, { status: this.newStatus });
					this.$notify({
						title: 'Success',
						message: 'Status updated'
					});
					this.getUsers()
				} catch (e) {
					this.$notify({
						title: 'Error',
						message: e
					});
				}
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
				this.getTransactions()
      },
      resetFilters() {
        this.filters = {
          userName: "",
          courseName: "",
					scholarship_paid: 'all'
        };
        // This method will trigger the computed property `filteredUsers` to recalculate
      },
      openEditPointDialog(user) {
        this.pointForm = {
					id: user.id || user._id,
          name: user.name,
          email: user.email,
          point: user.point_owned,
          addingPoint: 0,
        };
        this.pointDialogVisible = true;
      },
      async updateUserPoint() {
				try {
					await UserService.updateUser(this.pointForm.id, { point_owned: this.pointForm.point + this.pointForm.addingPoint });
					this.$notify({
						title: 'Success',
						message: 'Point updated'
					});
					this.getUsers()
				} catch (e) {
					this.$notify({
						title: 'Error',
						message: e
					});
				}
        this.pointDialogVisible = false;
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
