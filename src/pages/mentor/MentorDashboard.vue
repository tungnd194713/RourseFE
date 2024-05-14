<template>
	<div>
		<div class="px-4 py-4">
			<h2 class="mb-4">Mentor - {{ mentorName }} - {{ currentDate }}</h2>
			<div>
				<el-tabs v-model="activeName" @tab-click="getTabData">
					<el-tab-pane label="Ca làm hôm nay" name="TodayShift">
						<div class="table-container">
							<el-table
								class="table"
								border
								:data="todayShifts"
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
									label="Tên người học">
									<template slot-scope="scope">
										<span>{{ scope.row.user ? scope.row.user.name : '' }}</span>
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
									label="Giờ bắt đầu">
									<template slot-scope="scope">
										<div>{{ scope.row.shift_days ? decimalToHourMinute(scope.row.shift_days[todayOfWeek].start_hour) : null }}</div>
									</template>
								</el-table-column>
								<el-table-column
									label="Giờ kết thúc">
									<template slot-scope="scope">
										<div>{{ scope.row.shift_days ? decimalToHourMinute(scope.row.shift_days[todayOfWeek].end_hour) : null }}</div>
									</template>
								</el-table-column>
								<el-table-column
									label="Trạng thái hiện tại">
									<template slot-scope="scope">
										<div>{{ todayStatus(scope.row.shift_days[todayOfWeek]) }}</div>
									</template>
								</el-table-column>
								<el-table-column
									width="250"
									label="">
									<template slot-scope="scope">
										<el-button @click="$router.push({ name: 'MentorCourseDetail', params: { courseId: scope.row.course._id || scope.row.course.id } })">Chi tiết khóa học</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</el-tab-pane>
					<el-tab-pane label="Tất cả ca làm" name="AllShift">
						<div class="table-container">
							<el-table
								class="table"
								border
								:data="todayShifts"
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
									label="Tên người học">
									<template slot-scope="scope">
										<span>{{ scope.row.user ? scope.row.user.name : '' }}</span>
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
									label="Ngày trong tuần">
									<template slot-scope="scope">
										<div>{{ convertDayOfWeekEnglishToVietnamese(scope.row.day_of_week) }}</div>
									</template>
								</el-table-column>
								<el-table-column
									label="Giờ bắt đầu">
									<template slot-scope="scope">
										<div>{{ scope.row.shift_days ? decimalToHourMinute(scope.row.shift_days[scope.row.day_of_week].start_hour) : null }}</div>
									</template>
								</el-table-column>
								<el-table-column
									label="Giờ kết thúc">
									<template slot-scope="scope">
										<div>{{ scope.row.shift_days ? decimalToHourMinute(scope.row.shift_days[scope.row.day_of_week].end_hour) : null }}</div>
									</template>
								</el-table-column>
								<el-table-column
									label="Trạng thái hiện tại">
									<template slot-scope="scope">
										<div>{{ weekStatus(scope.row.day_of_week, scope.row.shift_days[scope.row.day_of_week]) }}</div>
									</template>
								</el-table-column>
								<el-table-column
									width="250"
									label="">
									<template slot-scope="scope">
										<el-button @click="$router.push({ name: 'MentorCourseDetail', params: { courseId: scope.row.course._id || scope.row.course.id } })">Chi tiết khóa học</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</el-tab-pane>
					<el-tab-pane label="Đăng kí ca làm" name="RegisterShift">
						<div class="shift-register">
							<el-row v-for="(shift, index) in registeredShift" :key="index" :gutter="20" class="mb-2" style="min-height: 40px">
								<el-col :span="6">
									<div>{{ convertDayOfWeekEnglishToVietnamese(shift.weekday) }}</div>
								</el-col>
								<el-col :span="18">
									<div class="d-flex" v-if="shift.start_hour && shift.end_hour">
										<div style="margin-right: 16px">
											<div v-if="isEdit === shift.weekday">
												<el-time-select
													v-model="start_hour"
													:picker-options="{
														start: '00:00',
														step: '00:30',
														end: '23:30',
														maxTime: end_hour
													}"
													placeholder="Chọn thời gian">
												</el-time-select>
												<span> ~ </span>
												<el-time-select
													v-model="end_hour"
													:picker-options="{
														start: '00:00',
														step: '00:30',
														end: '23:30',
														minTime: start_hour
													}"
													placeholder="Chọn thời gian">
												</el-time-select>
											</div>
											<div v-else>
												<span>{{ decimalToHourMinute(shift.start_hour) }}</span>
												<span> ~ </span>
												<span>{{ decimalToHourMinute(shift.end_hour) }}</span>
											</div>
										</div>
										<div>
											<div v-if="isEdit === shift.weekday">
												<i class="el-icon-check" style="transform: scale(1.5); color: green; margin-right: 20px; padding-top: 10px; cursor: pointer" @click="updateShift()"></i>
												<i class="el-icon-close" style="transform: scale(1.5); color: red; margin-right: 20px; padding-top: 10px; cursor: pointer" @click="closeEdit()"></i>
											</div>
											<div v-else>
												<i class="el-icon-edit-outline" style="transform: scale(1.5); color: gray; margin-right: 20px; cursor: pointer" @click="editShift(shift)"></i>
												<i class="el-icon-delete" style="transform: scale(1.5); color: gray; margin-right: 20px; cursor: pointer" @click="openDeleteShiftDialog(shift)"></i>
											</div>
										</div>
									</div>
									<div v-else>
										<el-button v-if="isEdit !== shift.weekday" type="primary" round @click="editShift(shift)">Thêm ca làm</el-button>
										<div v-else>
											<el-time-select
													v-model="start_hour"
													:picker-options="{
														start: '00:00',
														step: '00:30',
														end: '23:30',
														maxTime: end_hour
													}"
													placeholder="Chọn thời gian">
												</el-time-select>
												<span> ~ </span>
												<el-time-select
													v-model="end_hour"
													:picker-options="{
														start: '00:00',
														step: '00:30',
														end: '23:30',
														minTime: start_hour
													}"
													placeholder="Chọn thời gian">
												</el-time-select>
												<span v-if="isEdit === shift.weekday">
													<i class="el-icon-check" style="transform: scale(1.5); color: green; margin: 0 20px; padding-top: 10px; cursor: pointer" @click="updateShift()"></i>
													<i class="el-icon-close" style="transform: scale(1.5); color: red; margin-right: 20px; padding-top: 10px; cursor: pointer" @click="closeEdit()"></i>
												</span>
										</div>
									</div>
								</el-col>
							</el-row>
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
			<el-dialog
        :visible.sync="deleteDialog"
        width="450px"
				title="Xóa ca làm"
      >
				<span>Bạn có chắc muốn xóa ca làm vào <b>{{ convertDayOfWeekEnglishToVietnamese(deleteShift.weekday) }}</b> từ <b>{{ deleteShift.start_hour }}</b> đến <b>{{ deleteShift.end_hour }}</b></span>
				<span slot="footer" class="dialog-footer">
					<el-button type="secondary" @click="deleteDialog = false">Hủy bỏ</el-button>
					<el-button type="danger" @click="removeShift">Xóa</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>
<script>
import { MentorService } from '@/services'

export default {
	data() {
		return {
			activeName: 'TodayShift',
			isEdit: '',
			start_hour: '',
			end_hour: '',
			registeredShift: [
				{
					weekday: 'monday',
				},
				{
					weekday: 'tuesday',
				},
				{
					weekday: 'wednesday',
				},
				{
					weekday: 'thursday',
				},
				{
					weekday: 'friday',
				},
				{
					weekday: 'saturday',
				},
				{
					weekday: 'sunday',
				},
			],
			deleteDialog: false,
			deleteShift: {},
			todayShifts: [],
			allShifts: [],
		}
	},
	computed: {
		currentDate() {
			const now = new Date();
			const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
			const dayIndex = now.getDay();
			const day = now.getDate().toString().padStart(2, '0');
			const month = (now.getMonth() + 1).toString().padStart(2, '0');
			const year = now.getFullYear();
			return this.convertDayOfWeekEnglishToVietnamese(daysOfWeek[dayIndex]) + ` Ngày ${day} Tháng ${month} Năm ${year}`;
		},
		todayOfWeek() {
			const day = new Date().getDay();
			const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
			return daysOfWeek[day]
		},
		mentorName() {
			return JSON.parse(localStorage.getItem('user')).name
		}
	},
	created() {
		this.getTodayShifts()
	},
	methods: {
		getTabData(tab, event) {
			console.log(event)
			if (tab.name === 'RegisterShift') {
				this.getRegisteredShift()
			} else if (tab.name === 'TodayShift') {
				this.getTodayShifts()
			} else if (tab.name === 'AllShift') {
				this.getAllShift()
			}
		},
		async getRegisteredShift() {
			const { data } = await MentorService.getProfile();
			if (data) {
				const shifts = data.weekdays;
				if (shifts) {
					this.registeredShift.forEach((item) => {
						if (Object.hasOwn(shifts, item.weekday) && shifts[item.weekday].start_hour && shifts[item.weekday].end_hour) {
							item.start_hour = shifts[item.weekday].start_hour
							item.end_hour = shifts[item.weekday].end_hour
						}
					})
				}
				this.registeredShift = [...this.registeredShift]
			}
		},
		async getTodayShifts() {
			const { data } = await MentorService.getMentorShifts({
				day: this.todayOfWeek,
				status: 2,
			})
			if (data) {
				this.todayShifts = [...data.results]
			}
		},
		compareMentorShiftsByDay(shiftA, shiftB) {
			const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
			const dayAIndex = daysOfWeek.indexOf(shiftA.shift_days.day_of_week.toLowerCase());
			const dayBIndex = daysOfWeek.indexOf(shiftB.shift_days.day_of_week.toLowerCase());
			return dayAIndex - dayBIndex;
		},
		async getAllShift() {
			const { data } = await MentorService.getMentorShifts({status: 2})
			if (data) {
				this.allShifts = [...data.results].sort(this.compareMentorShiftsByDay)
			}
		},
		async updateShift() {
			const { data } = await MentorService.updateShift({
				weekday: this.isEdit,
				start_hour: this.convertHourToNumber(this.start_hour),
				end_hour: this.convertHourToNumber(this.end_hour),
			});
			if (data) {
				const index = this.registeredShift.findIndex((item) => item.weekday === this.isEdit)
				if (index !== -1) {
					this.registeredShift[index].start_hour = this.convertHourToNumber(this.start_hour);
					this.registeredShift[index].end_hour = this.convertHourToNumber(this.end_hour);
				}
				this.closeEdit();
				this.$notify({
					title: 'Success',
					message: 'Đã cập nhật ca làm!'
				});
			}
		},
		async removeShift() {
			const { data } = await MentorService.deleteShift(this.deleteShift.weekday);
			if (data) {
				const index = this.registeredShift.findIndex((item) => item.weekday === this.deleteShift.weekday)
				if (index !== -1) {
					this.registeredShift[index] = {
						weekday: this.deleteShift.weekday
					}
				}
				this.deleteDialog = false
				this.$notify({
					title: 'Success',
					message: 'Đã cập nhật ca làm!'
				});
			}
		},
		editShift(shift) {
			this.isEdit = shift.weekday
			this.start_hour = shift.start_hour ? this.decimalToHourMinute(shift.start_hour) : ''
			this.end_hour = shift.end_hour ? this.decimalToHourMinute(shift.end_hour) : ''
		},
		closeEdit() {
			this.isEdit = ''
			this.start_hour = ''
			this.end_hour = ''
		},
		openDeleteShiftDialog(shift) {
			this.deleteShift = {
				weekday: shift.weekday,
				start_hour: this.decimalToHourMinute(shift.start_hour),
				end_hour: this.decimalToHourMinute(shift.end_hour),
			}
			this.deleteDialog = true
		},
		weekStatus(weekday, shift) {
			const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
			const today = daysOfWeek[new Date().getDay()];
			const sortedDaysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
			if (sortedDaysOfWeek.indexOf(today) < sortedDaysOfWeek.indexOf(weekday)) {
				return 'Chưa đến giờ hỗ trợ'
			} else if (sortedDaysOfWeek.indexOf(today) === sortedDaysOfWeek.indexOf(weekday)) {
				return this.todayStatus(shift)
			} else {
				return 'Hết giờ hỗ trợ'
			}
		},
		todayStatus(shift) {
			const convertedShift = {
				start_hour: this.decimalToHourMinute(shift.start_hour),
				end_hour: this.decimalToHourMinute(shift.end_hour),
			}
			const now = new Date();
			const hour = now.getHours().toString().padStart(2, '0');
			const minute = now.getMinutes().toString().padStart(2, '0');
			const thisHour = `${hour}:${minute}`;
			if (this.compareHours(thisHour, convertedShift.start_hour) === -1) {
				return 'Chưa đến giờ hỗ trợ';
			} else if (this.compareHours(thisHour, convertedShift.start_hour) === 1 && this.compareHours(thisHour, convertedShift.end_hour) === -1) {
				return 'Đang trong giờ hỗ trợ'
			} else if (this.compareHours(thisHour, convertedShift.start_hour) === 0 || this.compareHours(thisHour, convertedShift.end_hour) === 0) {
				return 'Đang trong giờ hỗ trợ'
			} else if (this.compareHours(thisHour, convertedShift.end_hour) === 1) {
				return 'Hết giờ hỗ trợ'
			}
		},
		convertDayOfWeekEnglishToVietnamese(dayOfWeekEnglish) {
			if (!dayOfWeekEnglish) return;
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
		},
		convertHourToNumber(hourString) {
			const [hour, minute] = hourString.split(":").map(Number);
			return hour + minute / 60;
		},
		compareHours(time1, time2) {
			const [hour1, minute1] = time1.split(':').map(Number);
			const [hour2, minute2] = time2.split(':').map(Number);

			if (hour1 === hour2) {
				if (minute1 === minute2) {
					return 0; // Times are equal
				} else if (minute1 < minute2) {
					return -1; // time1 is earlier
				} else {
					return 1; // time2 is earlier
				}
			} else if (hour1 < hour2) {
				return -1; // time1 is earlier
			} else {
				return 1; // time2 is earlier
			}
		}
	},
}
</script>
<style lang="scss" scoped>
.shift-register {
	width: 50%;
}
</style>