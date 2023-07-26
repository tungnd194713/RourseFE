<template>
  <div>
    <div class="create-course-container">
      <div class="title-input">
        <input type="text" placeholder="Course title" v-model="title" />
      </div>
      <div class="desc-input">
        <textarea
          name=""
          id=""
          cols="30"
          rows="5"
          placeholder="Course description"
          v-model="description"
        ></textarea>
      </div>
      <div class="module-container">
        <h2>Module List</h2>
        <ul class="module-list">
          <li v-for="module in modules" :key="module.id" class="module-item">
            <div class="module-thumbnail">
              <img :src="module.thumbnail" alt="Module Thumbnail" />
            </div>
            <div class="module-details">
              <h3>{{ module.title }}</h3>
              <p class="module-description">{{ module.description }}</p>
            </div>
          </li>
        </ul>
        <el-button
          type="primary"
          @click="() => $router.push({ path: '/create-module', query: {title, description, added_modules: addedModuleIds.toString()} })"
          >Add new module</el-button
        >
        <el-button type="primary" @click="isAddExisting = !isAddExisting"
          >Add existing module</el-button
        >
        <div v-if="isAddExisting" class="transfer-container">
          <el-transfer
            v-model="transferData"
            :data="data"
            :titles="['Source', 'Target']"
            @change="handleChange"
          >
            <template #default="{ option }">
              <div class="transfer-item">
                <img :src="option.image" alt="Image" class="transfer-image" />
                <span>{{ option.label }}</span>
              </div>
            </template>
          </el-transfer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateCourse",
  data() {
    return {
      modules: [
        {
          id: 1,
          title: "Module 1",
          description:
            "This is the first module of the course. It covers the basics of the topic.",
          thumbnail: "https://picsum.photos/id/237/200/300", // Add the path to the first module's thumbnail image here
        },
        {
          id: 2,
          title: "Module 2",
          description:
            "In this module, you will learn about advanced concepts and practical examples.",
          thumbnail: "https://picsum.photos/id/238/200/300", // Add the path to the second module's thumbnail image here
        },
        {
          id: 3,
          title: "Module 3",
          description:
            "The final module focuses on real-world projects and hands-on exercises.",
          thumbnail: "https://picsum.photos/id/239/200/300", // Add the path to the third module's thumbnail image here
        },
      ],
      isAddExisting: false,
      transferData: [],
      data: [
        // Sample data with image and label
        {
          key: 1,
          label: "Item 1 asdasd as das ds",
          image: "https://picsum.photos/id/240/200/300",
        },
        {
          key: 2,
          label: "Item 2",
          image: "https://picsum.photos/id/241/200/300",
        },
        // Add more items as needed
      ],
      title: '',
      description: '',
      addedModuleIds: [1, 2, 3]
    };
  },
};
</script>

<style lang="scss" scoped>
.create-course-container {
  margin: 30px 30%;
  .title-input input {
    width: 100%;
    border: none;
    font-size: 36px;
    outline: none;
    font-weight: bold;
  }
  .desc-input textarea {
    width: 100%;
    resize: none;
    font-size: 20px;
    border: none;
    outline: none;
  }
  h3 {
    margin-top: 0;
  }
}

.course-header {
  text-align: center;
  margin-bottom: 20px;
}

.course-cover {
  max-width: 300px;
  max-height: 200px;
  border-radius: 5px;
}

.module-list {
  list-style: none;
  padding: 0;
}

.module-item {
  display: flex;
  margin-bottom: 15px;
}

.module-thumbnail {
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 5px;
}

.module-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.module-details {
  margin-left: 10px;
}
.transfer-container {
  margin-top: 20px;
}
.transfer-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  span {
    max-width: 70px;
    white-space: normal;
    line-height: 16px;
  }
}

.transfer-image {
  width: 100px; /* Adjust the width to your desired fixed size */
  height: 70px; /* Adjust the height to your desired fixed size */
  margin-right: 8px;
  object-fit: cover;
}
</style>
<style lang="scss">
.create-course-container {
  .el-transfer-panel__item {
    height: unset;
  }
  .el-transfer-panel {
    width: 250px;
  }
}
</style>