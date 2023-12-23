<template>
    <div class="video-details-container">
        <h2 class="title">Video Details</h2>

        <div v-if="loading" class="loading-indicator">Loading...</div>

        <div v-else class="video-content">
            <h3 class="video-title">{{ video.title }}</h3>
            <p class="video-description">{{ video.description }}</p>
            <div class="video-cover">
                <img :src="video.cover" alt="Video Cover" class="cover-image">
            </div>
        </div>

        <router-link :to="{ name: 'VideoDisplay' }" class="link-container">
            <button class="return-button">Return to Video Display</button>
        </router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: true,
            video: { id: 1, title: 'Video Title 1', cover: 'https://placehold.co/600x400', description: 'Description here' },
            searchQuery: ''
        }
    },
    created() {
        this.fetchVideoDetails();
    },
    methods: {
        async fetchVideoDetails() {
            const { videoId } = this.$route.params;
            try {
                const response = await this.$axios.get(`/api/video/public/${videoId}`);
                this.video = response.data;
                this.loading = false;
            } catch (error) {
                console.error(`Error fetching video details for ID ${videoId}`, error);
                this.loading = false;
            }
        }
    }
}
</script>

<style scoped>
.video-details-container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.title {
    color: #34495e;
    margin-bottom: 20px;
}

.loading-indicator {
    color: #3498db;
}

.video-content {
    margin-bottom: 20px;
}

.video-title {
    color: #2c3e50;
    margin-bottom: 10px;
}

.video-description {
    color: #606266;
    margin-bottom: 15px;
}

.video-cover .cover-image {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
}

.link-container {
    text-align: center;
    margin-top: 20px;
}

.return-button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.return-button:hover {
    background-color: #2980b9;
}
</style>
