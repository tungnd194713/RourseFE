<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <h2>Quản lý công ty</h2>
          </div>

          <el-row :gutter="20" class="filters">
            <el-col :span="6">
              <el-input v-model="filters.company_name" placeholder="Lọc theo tên công ty"></el-input>
            </el-col>
            <el-col :span="6">
              <el-input v-model="filters.email" placeholder="Lọc theo email"></el-input>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" @click="applyFilters">Tìm</el-button>
              <el-button @click="resetFilters">Reset</el-button>
            </el-col>
          </el-row>

          <el-table :data="companys" style="width: 100%;">
            <el-table-column width="50" label="STT">
              <template slot-scope="scope">
                <span style="margin-left: 10px;">{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="company_name" label="Tên công ty" width="180"></el-table-column>
            <el-table-column prop="email" label="Email"></el-table-column>
            <el-table-column prop="createdAt" label="Ngày tham gia">
							<template slot-scope="scope">
                <span>{{ scope.row.createdAt ? scope.row.createdAt.split('T')[0] : '' }}</span>
              </template>
						</el-table-column>
            <el-table-column prop="phone" label="Số điện thoại"></el-table-column>
            <el-table-column prop="point_owned" label="Point">
              <template slot-scope="scope">
                <span style="margin-right: 10px;">{{ scope.row.point_owned || 0 }}</span>
                <span @click="openEditPointDialog(scope.row)"><i class="el-icon-circle-plus" style="cursor: pointer; scale: 1.5; color: rgb(64, 158, 255);"></i></span>
              </template>
            </el-table-column>
            <el-table-column prop="manager_name" label="Tên người phụ trách"></el-table-column>
            <el-table-column label="Trạng thái" width="150">
              <template slot-scope="scope">
                <el-select :value="scope.row.status" placeholder="Chọn trạng thái" @change="confirmStatusChange(scope.row, $event)">
                  <el-option label="Active" value="active"></el-option>
                  <el-option label="Inactive" value="inactive"></el-option>
                  <el-option label="Suspended" value="suspended"></el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <!-- Status Change Confirmation Dialog -->
    <el-dialog title="Xác nhận thay đổi trạng thái" :visible.sync="statusDialogVisible">
      <span>Bạn có chắc chắn muốn thay đổi trạng thái không?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelStatusChange">Hủy</el-button>
        <el-button type="primary" @click="confirmStatusChangeConfirmed">Xác nhận</el-button>
      </span>
    </el-dialog>

		<!-- Status Change Point Dialog -->
    <el-dialog title="Thêm point" :visible.sync="pointDialogVisible">
			<el-form :model="pointForm" label-width="200px">
				<el-form-item label="Tên công ty" prop="name">
					<el-input v-model="pointForm.company_name" disabled></el-input>
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
import { UserService } from '@/services'
export default {
  data() {
    return {
      companys: [{}],
      filters: {
        name: "",
        email: "",
      },
      companyDialogVisible: false,
			pointDialogVisible: false,
			pointForm: {},
      isEdit: false,
      companyForm: {
        id: null,
        name: "",
        email: "",
        status: "",
      },
      companyFormRules: {
        name: [{ required: true, message: "Vui lòng nhập tên", trigger: "blur" }],
        email: [
          { required: true, message: "Vui lòng nhập email", trigger: "blur" },
          { type: "email", message: "Vui lòng nhập email hợp lệ", trigger: "blur" },
        ],
        status: [{ required: true, message: "Vui lòng chọn trạng thái", trigger: "change" }],
      },
      statusDialogVisible: false,
      selectedCompany: null,
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
    this.getUsers()
  },
  methods: {
    async getUsers() {
      try {
        const { data } = await UserService.getCompanies(this.query, {});
        if (data) {
          this.companys = data.results;
        }
      } catch (e) {
        this.$notify({
          title: 'Lỗi',
          message: e
        });
      }
    },
    openAddCompanyDialog() {
      this.isEdit = false;
      this.companyForm = { id: null, name: "", email: "", status: "" };
      this.companyDialogVisible = true;
    },
		openEditPointDialog(user) {
			this.pointForm = {
				id: user.id || user._id,
				company_name: user.company_name,
				email: user.email,
				point: user.point_owned,
				addingPoint: 0,
			};
			this.pointDialogVisible = true;
		},
		async updateUserPoint() {
				try {
					await UserService.updateCompany(this.pointForm.id, { point_owned: this.pointForm.point + this.pointForm.addingPoint });
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
    async confirmStatusChangeConfirmed() {
      try {
        await UserService.updateCompany(this.selectedCompany.id || this.selectedCompany._id, { status: this.newStatus });
        this.$notify({
          title: 'Thành công',
          message: 'Trạng thái đã được cập nhật'
        });
        this.getUsers()
      } catch (e) {
        this.$notify({
          title: 'Lỗi',
          message: e
        });
      }
      this.statusDialogVisible = false;
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
