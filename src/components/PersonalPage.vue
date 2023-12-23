<template>
  <div class="container">
    <h1 class="centered">{{ username }}</h1>
    
    <div class="videos" v-if="videos.length > 0">
      <div class="video-item" v-for="video in videos" :key="video.id">
        <!-- Use the entire video item as a clickable area -->
        <a @click="openNewWindow(video.video_link)" href="javascript:void(0)" class="video-link">
          <div class="video-title">{{ video.video_name }}</div>
          <img :src="getDecodedImageUrl(video.video_image)" alt="Video Image" class="video-cover">
        </a>
        <div class="video-actions">
          <button @click="deleteVideo(video.video_id)" class="delete-button">Delete</button>
        </div>
      </div>
    </div>

    <div class="upload-section">
      <input type="file" @change="handleFileChange" class="file-input">
      <button @click="uploadSelectedVideo" class="upload-button">Upload Video</button>
    </div>

    <router-link :to="{ name: 'VideoDisplay' }" class="return-link">
      <button class="return-button">Return to Public Video Display</button>
    </router-link>
  </div>
</template>




<script>
export default {
  data() {
    return {
      username: '',
      videos: [], // Array to store video data
      file: null, // To store the selected file for upload
    }
  },
  inject: ['globalState'], // Injecting global state if used

  created() {
    this.GetVideos();
    this.getPara();
    localStorage.setItem('username', this.globalState.username.value);
  },

  methods: {
    // Function to open a video link in a new window
    openNewWindow(link) {
      window.open(link);
    },

    // Fetches videos from the server
    async GetVideos() {
      try {
        const response = await this.$axios.get(this.globalState.PersonalVideo.value);
        this.videos = response.data;
      } catch (error) {
        console.error('Error fetching public videos', error);
      }
    },

    // Deletes a video based on its ID
    async deleteVideo(videoId) {
      try {
        await this.$axios.delete(`${this.globalState.deleteVideo.value}/${videoId}`);
        this.videos = this.videos.filter(video => video.video_id !== videoId);
        console.log(`Video with ID ${videoId} deleted successfully.`);
      } catch (error) {
        console.error(`Error deleting video with ID ${videoId}`, error);
      }
    },

    // Handles file selection for upload
    handleFileChange(event) {
      this.file = event.target.files[0];
    },

    // Uploads the selected video
    async uploadSelectedVideo() {
      if (!this.file) {
        console.error('Please select a video to upload.');
        return;
      }
      
      const formData = new FormData();
      formData.append('file', this.file);
      
      try {
        await this.$axios.post(this.globalState.uploadVideo.value, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Video uploaded successfully.');
        window.location.reload();
      } catch (error) {
        console.error('Error uploading video', error);
      }
    },

    // Retrieves parameters from the route
    getPara() {
      const { UserName } = this.$route.params;
      this.username = this.globalState.username;
    },

    // Decodes a base64 image string
    getDecodedImageUrl(base64String) {
      return 'data:image/png;base64,' + base64String;
    },
  }
}
</script>



<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.centered {
  text-align: center;
  margin-bottom: 30px;
}

.videos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.video-item {
  width: calc(50% - 20px);
  margin: 10px;
  padding: 10px;
  border: 1px solid #e1e1e1;
  border-radius: 5px;
}

.video-cover {
  width: 100%;
  height: auto;
}

.video-title {
  margin-bottom: 10px;
  font-weight: bold;
}

.video-link {
  text-decoration: none;
  color: inherit;
}

.video-actions {
  display: flex;
  justify-content: space-between;
}

.delete-button, .upload-button, .return-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-button:hover, .upload-button:hover, .return-button:hover {
  background-color: #2980b9;
}

.upload-section {
  margin-top: 30px;
  text-align: center;
}

.file-input {
  margin-bottom: 10px;
}

@media (max-width: 600px) {
  .video-item {
    width: calc(100% - 20px);
  }
}
</style>
