<template>
	<div>
		<div class="px-4 py-4">
			<h2>Danh sách tin tuyển dụng đăng ký đào tạo</h2>
            <el-row :gutter="20" class="filters mb-4">
                <el-col :span="6">
                    <el-input v-model="filters.jobName" placeholder="Lọc theo tên vị trí công việc"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input v-model="filters.companyName" placeholder="Lọc theo tên công ty"></el-input>
                </el-col>
                <el-col :span="3">
                    <el-select 
                        v-model="filters.status"
                        class="full-width">
                        <el-option 
                            :value="null"
                            key="all"
                            label="Trạng thái">
                        </el-option>
                        <el-option 
                            :value="1" 
                            key="1"
                            label="Đang xử lý">
                        </el-option>
                        <el-option 
                            :value="2" 
                            key="2"
                            label="Đã gửi">
                        </el-option>
                        <el-option 
                            :value="3" 
                            key="3"
                            label="Mở đào tạo">
                        </el-option>
                        <el-option 
                            :value="4" 
                            key="4"
                            label="Yêu cầu thay đổi">
                        </el-option>
                        <el-option 
                            :value="5" 
                            key="5"
                            label="Đóng đào tạo">
                        </el-option>
                        <el-option 
                            :value="6" 
                            key="6"
                            label="Đã hủy">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" v-loading.fullscreen.lock="loading" @click="getEducationRequests">Tìm</el-button>
                    <el-button @click="resetFilters">Reset</el-button>
                </el-col>
            </el-row>
			<div class="table-container">
				<el-table
					class="table"
					border
					:data="tableData"
					style="width: 100%">
                    <el-table-column
                        width="50"
						label="No.">
						<template slot-scope="scope">
							<span>{{ scope.$index + 1 }}</span>
						</template>
					</el-table-column>
					<el-table-column
                        width="200"
						label="Tuyển dụng">
						<template slot-scope="scope">
							<span>{{ scope.row.job ? scope.row.job.title : '' }}</span>
						</template>
					</el-table-column>
					<el-table-column
                        width="200"
						label="Nhà tuyển dụng">
						<template slot-scope="scope">
                            <span>{{ scope.row.company ? scope.row.company.company_name : '' }}</span>
						</template>
					</el-table-column>
                    <el-table-column
						label="Thời gian đào tạo tối đa">
						<template slot-scope="scope">
                            <span>{{ scope.row.max_education_month }} tháng</span>
						</template>
					</el-table-column>
                    <el-table-column
						label="Học bổng">
						<template slot-scope="scope">
                            <span>{{ scope.row.scholarship }}%</span>
						</template>
					</el-table-column>
                    <el-table-column
						label="Số lượng khóa học">
						<template slot-scope="scope">
                            <span>{{ scope.row.courses.length || 0 }}</span>
						</template>
					</el-table-column>
                    <el-table-column
						label="Yêu cầu">
						<template slot-scope="scope">
                            <el-button style="width: 100%" type="primary" @click="showRequirement(scope.row.requirements, scope.row.custom_requirement)">Xem</el-button>
						</template>
					</el-table-column>
                    <el-table-column
						label="Trạng thái">
						<template slot-scope="scope">
                            <div :class="{ 'change-request-text': scope.row.status === 4 }" @click="openChangeRequestDialog(scope.row)">{{ jobEducationStatus[scope.row.status - 1] }}</div>
						</template>
					</el-table-column>
					<el-table-column
                        width="250"
						label="">
						<template slot-scope="scope">
							<el-dropdown split-button type="primary">
								Hành động
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item>
										<div @click="$router.push({ name: 'EducationRoadmap', params: { jobEducationId: scope.row._id } })">Xem chi tiết</div>
									</el-dropdown-item>
									<el-dropdown-item v-if="scope.row.status === 1 || scope.row.status === 4">
										<div @click="checkRoadmap(scope.row._id || scope.row.id)">Gửi</div>
									</el-dropdown-item>
									<el-dropdown-item v-if="scope.row.status === 2">
										<div @click="unsendRoadmap(scope.row._id || scope.row.id)">Hoàn tác</div>
									</el-dropdown-item>
									<el-dropdown-item v-if="scope.row.status === 4">
										<div @click="openChangeRequestDialog(scope.row)">Xem yêu cầu thay đổi</div>
									</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					background
                    layout="prev, pager, next"
                    @current-change="getEducationRequests"
                    :current-page.sync="query.page"
                    :page-size="10"
                    :total="totalResults">
				</el-pagination>
			</div>
		</div>
		<el-dialog
      title="Từ chối thay đổi"
      :visible.sync="rejectChangeDialog"
      width="40%"
      :before-close="handleClose"
    >
      <el-form ref="changeForm" :model="changeForm" label-position="top">
        <el-form-item label="Lý do từ chối">
          <el-input v-model="changeForm.rejectReason" type="textarea" class="full-width-input"></el-input>
					<!-- <VueEditor v-model="changeForm.content" :editor-toolbar="customToolbar" class="full-width-input"/> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">Hủy</el-button>
        <el-button type="primary" @click="rejectRequest">Lưu</el-button>
      </span>
    </el-dialog>

    <el-drawer
      title="Yêu cầu thay đổi"
      :visible.sync="drawerVisible"
      direction="rtl"
      size="30%"
      :before-close="handleDrawerClose"
    >
      <el-collapse v-model="activeNames" style="margin: 0 20px">
        <el-collapse-item
          v-for="blog in changeRequests"
          :key="blog.id"
          :name="blog.id"
        >
          <template slot="title">
						{{ blog.title }}
						<i v-if="blog.status === 2" class="el-icon-error" style="color: red; font-size: 20px; margin-left: 8px"></i>
						<i v-else-if="blog.status === 1" class="el-icon-success" style="color: green; font-size: 20px; margin-left: 8px"></i>
						<i v-else class="el-icon-info" style="font-size: 20px; margin-left: 8px"></i>
					</template>
          <el-card class="blog-card">
            <div class="blog-content">
							<span v-html="`<div>${blog.content}</div>`"></span>
						</div>
						<div v-if="blog.status === 2" class="blog-content" style="color: red">
							<div>Lý do từ chối: </div>
							<div>{{ blog.reject_reason }}</div>
						</div>
            <div class="blog-dates">
              <el-tag type="info">Ngày tạo: {{ formatDate(blog.requested_date) }}</el-tag>
              <el-tag v-if="blog.replied_date" :type="blog.status === 1 ? 'success' : 'danger'">Ngày xử lý: {{ formatDate(blog.replied_date) }}</el-tag>
            </div>
						<div class="blog-actions">
              <el-button v-if="!blog.status" type="danger" size="small" @click="openModal(blog)">Từ chối</el-button>
              <el-button v-if="!blog.status" type="success" size="small" @click="markAsComplete(blog)">Hoàn thành</el-button>
              <el-button v-else-if="blog.status" type="primary" size="small" @click="undoStatus(blog)">Hoàn tác</el-button>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
      
      <span slot="footer" class="drawer-footer">
        <el-button @click="handleDrawerClose">Close</el-button>
      </span>
    </el-drawer>
        <el-dialog
					title="Yêu cầu công việc"
					:visible.sync="dialogVisible"
					width="30%"
					:before-close="handleClose"
					class="custom-dialog"
				>
					<div class="dialog-content">
						<ul v-if="requirement.majorColleges.length" class="requirement-list">
							<li v-for="(major, index) in requirement.majorColleges" :key="index">
								Tốt nghiệp đại học
								<span v-if="major.colleges.length">
									<span v-for="(college, cindex) in major.colleges" :key="cindex">
										{{ college.name }}
										<span v-if="cindex !== major.colleges.length - 1" class="fw-bold">hoặc</span>
									</span>
								</span>
								chuyên ngành
								<span v-for="(iitem, iindex) in major.majors" :key="iindex">
									{{ iitem.name }}
									<span v-if="iindex !== major.majors.length - 1">hoặc</span>
								</span>
							</li>
						</ul>
						<ul v-if="requirement.beginnerSkills.length" class="requirement-list">
							<li v-for="(skill, index) in requirement.beginnerSkills" :key="index">
								Đã có kinh nghiệm
								<span v-for="(iitem, iindex) in skill" :key="iindex">
									{{ iitem.name }}
									<span v-if="iindex !== skill.length - 1">hoặc</span>
								</span>
							</li>
						</ul>
						<ul v-if="requirement.intermediateSkills.length" class="requirement-list">
							<li v-for="(skill, index) in requirement.intermediateSkills" :key="index">
								Hiểu rõ về
								<span v-for="(iitem, iindex) in skill" :key="iindex">
									{{ iitem.name }}
									<span v-if="iindex !== skill.length - 1">hoặc</span>
								</span>
							</li>
						</ul>
						<ul v-if="requirement.advancedSkills.length" class="requirement-list">
							<li v-for="(skill, index) in requirement.advancedSkills" :key="index">
								Thành thạo
								<span v-for="(iitem, iindex) in skill" :key="iindex">
									{{ iitem.name }}
									<span v-if="iindex !== skill.length - 1">hoặc</span>
								</span>
							</li>
						</ul>
						<ul v-if="requirement.certificates.length" class="requirement-list">
							<li v-for="(certificate, index) in requirement.certificates" :key="index">
								Đạt được chứng chỉ
								<span v-for="(citem, cindex) in certificate.certificates" :key="cindex">
									{{ citem.name }}
									<span v-if="cindex !== certificate.certificates.length - 1">hoặc</span>
								</span>
								hoặc tương đương
							</li>
						</ul>
						<span v-html="requirement.custom_requirement"></span>
					</div>
					<span slot="footer" class="dialog-footer">
						<el-button @click="dialogVisible = false">OK</el-button>
					</span>
				</el-dialog>
        <el-dialog
            title="Gửi khóa học"
            :visible.sync="checkDialog"
            width="30%"
            :before-close="handleClose"
        >
            <div v-if="tagsFulfilled">
                Bạn có chắc muốn gửi cho nhà tuyển dụng?
            </div>
            <div v-else>
                Roadmap chưa sở hữu đủ các kỹ năng cần thiết!
            </div>
            <span slot="footer" class="dialog-footer">
                <div v-if="tagsFulfilled">
                    <el-button type="primary" @click="sendRoadmap">Xác nhận</el-button>
                    <el-button @click="checkDialog = false">Hủy</el-button>
                </div>
                <div v-else>
                    <el-button type="primary" @click="$router.push({ name: 'EducationRoadmap', params: { jobEducationId: checkingRoadmap } })">Tìm hiểu thêm</el-button>
                </div> 
            </span>
        </el-dialog>
        <el-dialog
            title="Yêu cầu thay đổi"
            :visible.sync="changeRequestDialog"
            width="30%"
            :before-close="handleClose"
        >
            <ul v-if="changeRequest && changeRequest.length">
                <li v-for="(item, index) in changeRequest" :key="index">
                    {{ item.content }}
                </li>
            </ul>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changeRequestDialog = false">OK</el-button>
            </span>
        </el-dialog>
	</div>	
</template>
<script>
import jobEducationStatus from '@/constants/jobEducationStatus'
import { RoadMapService } from '@/services'

export default {
	data() {
		return {
			tableData: [{
                title: 'Frontend Developer',
                company: 'FPT Corporation',
                max_education_month: 3,
                scholarship: 50,
                course_count: 10,
                status: 1,
            }],
            requirement: {
                majorColleges: [],
                certificates: [],
                beginnerSkills: [],
                intermediateSkills: [],
                advancedSkills: [],
            },
			dialogVisible: false,
            jobEducationStatus,
            tagsFulfilled: false,
            checkDialog: false,
            checkingRoadmap: 0,
            changeRequest: [],
            changeRequestDialog: false,
            filters: {
                jobName: '',
                companyName: '',
                status: null,
            },
            query: {
                page: 1,
                limit: 10,
                sortBy: 'createdAt',
            },
            totalResults: 0,
			rejectChangeDialog: false,
			drawerVisible: false,
			activeNames: [],
			changeRequests: [
				{ id: '1', title: 'First Blog', content: 'Content of the first blog', requested_date: new Date(), replied_date: new Date() },
				{ id: '2', title: 'Second Blog', content: 'Content of the second blog', requested_date: new Date(), replied_date: new Date() },
				// Add more blog objects here
			],
			changeForm: {
				rejectReason: '',
			},
			requestEducationId: '',
			rejectRequestId: '',
		}
	},
    created() {
        this.getEducationRequests()
    },
	methods: {
        resetFilters() {
            this.filters = {
                jobName: '',
                companyName: '',
                status: null,
            }
        },
		handleEdit(index, row) {
			console.log(index, row);
		},
		handleDelete(index, row) {
			console.log(index, row);
		},
        async getEducationRequests() {
            const { data } = await RoadMapService.getEducationRequests(this.query, this.filters)
            this.tableData = [...data.results]
        },
        showRequirement(requirements, custom_requirement = null) {
            this.requirement.majorColleges = requirements.filter((item) => item.type === 'Major');
            this.requirement.certificates = requirements.filter((item) => item.type === 'Certificate');
            this.requirement.beginnerSkills = requirements.filter((item) => item.type === 'Skill' && item.level === 'Beginner').map(obj => obj.skills)
            this.requirement.intermediateSkills = requirements.filter((item) => item.type === 'Skill' && item.level === 'Intermediate').map(obj => obj.skills);
            this.requirement.advancedSkills = requirements.filter((item) => item.type === 'Skill' && item.level === 'Advanced').map(obj => obj.skills);
            this.requirement.custom_requirement = custom_requirement
            this.dialogVisible = true;
        },
        async checkRoadmap(jobEducationId) {
            const data = await RoadMapService.checkRoadmap(jobEducationId)
            try {
                if (data.status === 200) {
                    if (data.data) {
                        this.tagsFulfilled = true;
                    } else {
                        this.tagsFulfilled = true;
                    }
                    this.checkingRoadmap = jobEducationId;
                    this.checkDialog = true
                }
            } catch (e) {
                console.log(e)
            }
        },
        async sendRoadmap() {
            const data = await RoadMapService.sendRoadmap(this.checkingRoadmap)
            if (data.status === 200) {
                this.$notify({
                    title: 'Success',
                    message: 'Đã gửi nhà tuyển dụng'
                });
                this.getEducationRequests()
                this.checkDialog = false
            }
        },
        async unsendRoadmap(jobEducationId) {
            const data = await RoadMapService.sendRoadmap(jobEducationId)
            if (data.status === 200) {
                this.$notify({
                    title: 'Success',
                    message: 'Đã hoàn tác'
                });
                this.getEducationRequests()
            }
        },
			openChangeRequestDialog(item) {
					if (item.status === 4) {
							// this.changeRequest = [...item.change_requests];
							// this.changeRequestDialog = true
						this.drawerVisible = true
						this.changeRequests = [...item.change_requests]
						this.requestEducationId = item.id || item._id;
					}
			},
		openModal(request) {
      this.rejectChangeDialog = true;
			this.rejectRequestId = request._id
    },
    handleClose() {
      this.rejectChangeDialog = false;
			this.changeForm.rejectReason = ''
			this.rejectRequestId = ''
    },
    openDrawer() {
      this.drawerVisible = true;
    },
    handleDrawerClose() {
      this.drawerVisible = false;
			this.requestEducationId = '';
    },
    formatDate(date) {
      return date ? new Date(date).toLocaleString() : '';
    },
		async markAsComplete(request) {
			const now = Date.now()
			const index = this.changeRequests.findIndex((item) => item._id === request._id);
				if (index !== -1) {
					this.changeRequests[index].status = 1
					this.changeRequests[index].replied_date = now
				} else {
					this.$notify({
						title: 'Error',
						message: 'Kong tim thay'
					});
					return
				}
			const data = await RoadMapService.replyChangeRequest(this.requestEducationId, request._id || request.id, {
				status: 1,
				replied_date: now,
			})
			if (data.status === 200) {
				this.$notify({
						title: 'Success',
						message: 'Đã đánh dấu đối ứng yêu cầu'
				});
			}
		},
		async undoStatus(request) {
			const index = this.changeRequests.findIndex((item) => item._id === request._id);
				if (index !== -1) {
					this.changeRequests[index].status = 0
					this.changeRequests[index].replied_date = null
				} else {
					this.$notify({
						title: 'Error',
						message: 'Kong tim thay'
					});
					return
				}
			const data = await RoadMapService.replyChangeRequest(this.requestEducationId, request._id || request.id, {
				status: 0,
				replied_date: '',
			})
			if (data.status === 200) {
				this.$notify({
						title: 'Success',
						message: 'Đã hoàn tác đối ứng yêu cầu'
				});
			}
		},
		async rejectRequest() {
			if (!this.changeForm?.rejectReason) {
				this.$notify({
					title: 'Error',
					message: 'Chưa nhập lý do từ chối'
				});
				return
			}
			const now = Date.now()
			const index = this.changeRequests.findIndex((item) => item._id === this.rejectRequestId);
			if (index !== -1) {
				this.changeRequests[index].status = 2
				this.changeRequests[index].replied_date = now
			} else {
				this.$notify({
					title: 'Error',
					message: 'Kong tim thay'
				});
				return
			}
			this.rejectChangeDialog = false
			const data = await RoadMapService.replyChangeRequest(this.requestEducationId, this.rejectRequestId || this.rejectRequestId, {
				status: 2,
				replied_date: now,
				reject_reason: this.changeForm.rejectReason,
			})
			if (data.status === 200) {
				this.$notify({
						title: 'Success',
						message: 'Đã từ chối đối ứng yêu cầu'
				});
			}
		},
	}
}
</script>
<style scoped lang="scss">
.table-container {
	
}
.change-request-text {
    text-decoration: underline;
    color: blue;
    cursor: pointer
}
.table {
	margin-bottom: 20px;
}
.el-pagination {
	float: right;
}
.full-width-input {
  width: 100%;
}
.drawer-footer {
  text-align: right;
}
.blog-card {
  margin-bottom: 20px;
}
.blog-content {
  margin-bottom: 10px;
}
.blog-dates {
  display: flex;
  justify-content: space-between;
}
.blog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}
</style>
<style lang="scss">
.cell {
    word-break: keep-all !important;
}
thead {
	color: #909399 !important;
}
.custom-dialog {
	.el-dialog__header {
		background-color: #409eff;
		color: white;
		text-align: center;
		border-bottom: none;
		padding: 15px;
		font-size: 18px;
		border-radius: 10px 10px 0 0;
	}

	.el-dialog__body {
		padding: 20px;
		background-color: #f5f7fa;
	}

	.el-dialog__footer {
		background-color: #f5f7fa;
		border-top: none;
		text-align: right;
		padding: 10px 20px;
	}

	.dialog-content {
		background-color: #ffffff;
		padding: 15px;
		border-radius: 5px;
	}

	.requirement-list {
		list-style-type: none;
		padding: 0;
		margin: 0px 0;
	}

	.requirement-list li {
		padding: 5px 0;
		border-bottom: 1px solid #ebeef5;
	}

	.fw-bold {
		font-weight: bold;
		margin: 0 5px;
	}

	.dialog-footer {
		text-align: right;
	}

	.dialog-footer .el-button {
		background-color: #409eff;
		color: white;
		border: none;
	}

	.dialog-footer .el-button:hover {
		background-color: #66b1ff;
	}
}
</style>