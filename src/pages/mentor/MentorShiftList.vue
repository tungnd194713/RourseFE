<template>
	<div>
		<div class="px-4 py-4">
			<h2>Danh sách khóa học hỗ trợ</h2>
			<div class="filter-container mb-3 d-flex">
				<div>
					Trạng thái: 
					<el-select 
						v-model="searchParams.status"
						@change="getMentorShifts">
						<el-option 
							v-for="opt in statusList" 
							:value="opt.value" 
							:key="opt.value"
							:label="opt.label">
						</el-option>
					</el-select>
				</div>
			</div>
			<div>
				<div class="table-container">
					<el-table
						class="table"
						border
						:data="tableData"
						empty-text="Không có dữ liệu"
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
							label="Khóa học">
							<template slot-scope="scope">
								<span>{{ scope.row.course ? scope.row.course.title : '' }}</span>
							</template>
						</el-table-column>
						<el-table-column
							width="200"
							label="Tên người học">
							<template slot-scope="scope">
								<span>{{ scope.row.user ? scope.row.user.name : '' }}</span>
							</template>
						</el-table-column>
						<el-table-column
							label="Thời gian hỗ trợ">
							<template slot-scope="scope">
								<div v-for="(data, index) in getShiftTime(scope.row.shift_days)" :key="index">{{ data }}</div>
							</template>
						</el-table-column>
						<el-table-column
							label="Thời gian bắt đầu">
							<template slot-scope="scope">
								<div>{{ scope.row.status === 2 || scope.row.status === 3 ? scope.row.date_start.split('T')[0] : 'Chưa bắt đầu' }}</div>
							</template>
						</el-table-column>
						<el-table-column
							label="Trạng thái">
							<template slot-scope="scope">
								<span>{{ mentorShiftStatus[scope.row.status - 1] }}</span>
							</template>
						</el-table-column>
						<el-table-column
							width="150"
							label="">
							<template slot-scope="scope">
								<el-dropdown split-button type="primary">
									Action
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item>
											<div @click="$router.push({ name: 'MentorCourseDetail', params: { courseId: scope.row.course._id || scope.row.course.id } })">Chi tiết khóa học</div>
										</el-dropdown-item>
										<el-dropdown-item v-if="scope.row.status === 1">
											<div @click="acceptShift(scope.row.id || scope.row._id)">Chấp nhận hỗ trợ</div>
										</el-dropdown-item>
										<el-dropdown-item v-if="scope.row.status === 1">
											<div @click="rejectShift(scope.row.id || scope.row._id)">Từ chối hỗ trợ</div>
										</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
						background
						layout="prev, pager, next"
						:total="1000">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import mentorShiftStatus from '@/constants/mentorShiftStatus'
import { MentorService } from '@/services'

export default {
	data() {
		return {
			tableData: [{}],
			mentorShiftStatus,
			searchParams: {
				status: 0,
			},
			statusList: [
				{
					label: 'Tất cả',
					value: 0,
				},
				{
					label: 'Đã gửi yêu cầu',
					value: 1,
				},
				{
					label: 'Đang hỗ trợ',
					value: 2,
				},
				{
					label: 'Đã hoàn thành',
					value: 3,
				},
				{
					label: 'Đã từ chối',
					value: 4,
				},
			]
		}
	},
	created() {
		this.getMentorShifts()
	},
	methods: {
		handleEdit(index, row) {
			console.log(index, row);
		},
		handleDelete(index, row) {
			console.log(index, row);
		},
		async getMentorShifts() {
			const { data } = await MentorService.getMentorShifts(this.searchParams)
			if (data) {
				this.tableData = [...data.results]
			}
		},
		async acceptShift(shiftId) {
			const { data } = await MentorService.acceptShift(shiftId)
			if (data) {
				this.$notify({
					title: 'Success',
					message: 'Đã nhận hỗ trợ'
				});
				this.getMentorShifts();
			}
		},
		async rejectShift(shiftId) {
			const { data } = await MentorService.rejectShift(shiftId)
			if (data) {
				this.$notify({
					title: 'Success',
					message: 'Đã từ chối hỗ trợ'
				});
				this.getMentorShifts();
			}
		},
		getShiftTime(shiftDays) {
			const shownData = [];
			for (var prop in shiftDays) {
				shownData.push(`${this.convertDayOfWeekEnglishToVietnamese(prop)} | ${this.decimalToHourMinute(shiftDays[prop].start_hour)} ~ ${this.decimalToHourMinute(shiftDays[prop].end_hour)}`)
			}
			return shownData
		},
		convertDayOfWeekEnglishToVietnamese(dayOfWeekEnglish) {
			const daysOfWeekMapping = {
				"monday": "Thứ Hai",
				"tuesday": "Thứ Ba",
				"wednesday": "Thứ Tư",
				"thursday": "Thứ Năm",
				"friday": "Thứ Sáu",
				"saturday": "Thứ Bảy",
				"sunday": "Chủ Nhật"
			};
			const lowercaseDay = dayOfWeekEnglish.toLowerCase();
			return daysOfWeekMapping[lowercaseDay] || dayOfWeekEnglish;
		},
		decimalToHourMinute(decimalHour) {
			const hour = Math.floor(decimalHour);
			const minute = Math.round((decimalHour - hour) * 60);
			const hourString = String(hour).padStart(2, '0');
			const minuteString = String(minute).padStart(2, '0');
			return `${hourString}:${minuteString}`;
		}
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

</style>
<style lang="scss">
.cell {
    word-break: keep-all !important;
}
.el-dropdown {
	vertical-align: top;
}
.el-dropdown + .el-dropdown {
	margin-left: 15px;
}
.el-icon-arrow-down {
	font-size: 12px;
}
</style>
