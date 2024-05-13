<template>
	<div>
		<div class="px-4 py-4">
			<h2>Hồ sơ mentor </h2>
			<div>
				<div class="basic-info">
					<el-form :model="form">
						<div class="d-flex justify-content-between" style="width: 100%;">
							<div style="width: 45%">
								<el-form-item>
									<div>Tên hiển thị: </div>
									<el-input v-model="form.mentor_name"></el-input>
								</el-form-item>
								<el-form-item>
									<div>Số zalo: </div>
									<el-input v-model="form.zalo_number"></el-input>
								</el-form-item>
							</div>
							<div style="width: 45%">
								<el-form-item>
									<div>Link facebook: </div>
									<el-input v-model="form.facebook_link"></el-input>
								</el-form-item>
								<el-form-item>
									<div>Link twitter: </div>
									<el-input v-model="form.twitter_link"></el-input>
								</el-form-item>
							</div>
						</div>
						<el-form-item>
							<div>Tiểu sử: </div>
							<el-input type="textarea" v-model="form.biography"></el-input>
						</el-form-item>
						<el-form-item label="Chuyên môn: ">
							<el-select v-model="subject" placeholder="Chọn kỹ năng" style="margin-right: 16px">
								<el-option
									v-for="item in subjects"
									v-show="!item.is_removed"
									:key="item.id"
									:label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
							<el-select v-model="level" placeholder="Chọn cấp độ" style="margin-right: 16px">
								<el-option
									v-for="item in levels"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
							<el-button type="primary" @click="addSubject">Thêm</el-button>
						</el-form-item>
						<div>
							<el-button :type="'success'" v-for="tag in this.form.specialized_fields" :key="tag._id" class="my-2 skill-tag-btn py-2 px-2" style="cursor: unset; margin-right: 10px; margin-left: 0">
								{{ convertSubject(tag.subject) }} - {{ convertLevel(tag.level) }}
								<img src="@/assets/cross-circle.svg" alt="" width="20" style="cursor: pointer" @click="removeSubject(tag.subject)">
							</el-button>
            </div>
						<el-form-item>
							<el-button type="primary" @click="saveProfile">Lưu</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div class="mentor-avatar">
					<div>
						<img src="" alt="">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { MentorService, SubjectService } from '@/services'

export default {
  data() {
    return {
      form: {
        mentor_name: '',
        zalo_number: '',
        facebook_link: '',
        twitter_link: '',
        biography: '',
				specialized_fields: [],
      },
			subjects: [],
			subject: '',
			levels: [
				{
					label: 'Beginner',
					value: 1,
				},
				{
					label: 'Intermediate',
					value: 2,
				},
				{
					label: 'Advanced',
					value: 3,
				},
			],
			level: '',
    };
  },
	async created() {
		await this.getProfile();
		await this.getAllSubject();
	},
  methods: {
		async getProfile() {
			const { data } = await MentorService.getProfile();
			if (data) {
				this.form = {...data};
			}
		},
		async getAllSubject() {
			try {
				const { data } = await SubjectService.getAllSubject([]);
				this.subjects = [...data].map((item) => {
					if (this.form.specialized_fields.find((field) => field.subject === item.id)) {
						return {
							...item,
							is_removed: true,
						}
					} else {
						return {
							...item,
							is_removed: false
						}
					}
				})
			} catch (e) {
				this.$notify({
          title: 'Error',
          message: e.statusText
        });
			}
		},
		async saveProfile() {
			const body = {
				...this.form,
				specialized_fields: JSON.stringify(this.form.specialized_fields),
			}
			const { data } = await MentorService.updateProfile(body)
			if (data) {
				this.$notify({
          title: 'Success',
          message: data
        });
			}
		},
		addSubject() {
			if (!this.subject || !this.level) {
				this.$notify({
          title: 'Warning',
          message: 'Chọn kỹ năng và cấp độ'
        });
				return
			}
			this.form.specialized_fields.push({
				subject: this.subject,
				level: this.level
			})
			this.removeAddedSubject(this.subject);
			this.subject = ''
			this.level = ''
		},
		removeSubject(id) {
			const sindex = this.form.specialized_fields.findIndex((item) => item.subject === id);
			if (sindex !== -1) {
				this.form.specialized_fields.splice(sindex, 1)
			}
			const index = this.subjects.findIndex((item) => item.id === id);
			if (index !== -1) {
				this.subjects[index].is_removed = false
			} 
		},
		removeAddedSubject(id) {
			const index = this.subjects.findIndex((item) => item.id === id);
			if (index !== -1) {
				this.subjects[index].is_removed = true
			} 
		},
		convertSubject(id) {
			if (this.subjects.length) {
				return this.subjects.find((item) => item.id === id).name;
			}
		},
		convertLevel(value) {
			return this.levels.find((item) => item.value === value).label;
		},
  }
};
</script>

<style lang="scss" scoped>
.basic-info {
	width: 60%;
}
</style>
