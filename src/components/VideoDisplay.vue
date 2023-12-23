<template>
    <div class="video-display-container">
        <h2 class="title">Public Video Display</h2>

        <div class="search-container">
            <input type="text" v-model="searchQuery" placeholder='Search videos' class='search-bar'>
            <button @click="searchVideos" class="search-button">Search</button>
        </div>

        <div v-if="loading" class="loading-message">Loading...</div>
        
        <div v-else class="video-grid">
            <div v-for="video in filteredVideos" :key="video.video_id" class="video-item">
                <!-- 使用 <a> 标签包裹视频封面和标题 -->
                <a @click="openNewWindow(video.video_link)" href="javascript:void(0)">
                    <div class="video-name">{{ video.video_name }}</div>
                    <img :src="getDecodedImageUrl(video.video_image)" alt="Decoded Image" class="decoded-image">
                </a>
            </div>

            <div v-if="filteredVideos.length === 0" class="no-videos-message">
                No Videos Found
            </div>
        </div>

        <button @click="goToUserPage" class="user-page-button">To User Page: {{ globalState.username }}</button>
        <button @click="refreshVideos" class="refresh-button">Refresh Videos</button>
        <button @click="goToLogin" class="login-button">Login</button>
    </div>
</template>





<script>
export default {
    data() {
        return {
            loading: true,
            videos: [],
            searchQuery: '',
        }
    },
    inject: ['globalState'],

    created() {
        this.fetchPublicVideos()
    },

    computed: {
        filteredVideos() {
            return this.videos.filter((video) => video.video_name.toLowerCase().includes(this.searchQuery.toLowerCase()));
        },
    },

    methods: {
        openNewWindow(link) {
            window.open(link);
        },

        async fetchPublicVideos() {
            try {
                const response = await this.$axios.get(this.globalState.findAllVideo.value);
                this.videos = response.data;
                this.loading = false;
            }
            catch (error) {
                console.error('Error fetching public videos', error);
                this.loading = false;
            }
        },

        searchVideos() {
            const searchEndpoint = `${this.globalState.findAllVideo.value}/search?query=${encodeURIComponent(this.searchQuery)}`;
            this.fetchVideos(searchEndpoint);
        },

        async fetchVideos(endpoint) {
            try {
                const response = await this.$axios.get(endpoint);
                this.videos = response.data;
                this.loading = false;
            }
            catch (error) {
                console.error('Error fetching videos', error);
                this.loading = false;
            }
        },

        getDecodedImageUrl(base64String) {
            return 'data:image/png;base64,' + base64String;
        },

        goToUserPage() {
            this.$router.push({ name: 'PersonalPage', params: { UserName: this.globalState.username.value } });
        },

        refreshVideos() {
            this.loading = true;
            this.fetchPublicVideos();
        },

        goToLogin() {
        this.$router.push({ name: 'LoginView' });
    },
    }
}
</script>


<style scoped>
.video-display-container {
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

.search-container {
    margin-bottom: 20px;
}

.search-bar {
    border-radius: 5px;
    padding: 10px 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border: 1px solid #dcdcdc;
}

.search-button {
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.search-button:hover {
    background-color: #2980b9;
}

.user-page-button {
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: block;
    margin: 20px auto;
    width: fit-content;
}

.user-page-button:hover {
    background-color: #2980b9;
}

.login-button {
    background-color: #3498db; /* A distinct color for the login button */
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: block;
    margin: 20px auto;
    width: fit-content;
}

.login-button:hover {
    background-color: #2980b9;

}

.loading-message {
    color: #3498db;
}

.video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 20px;
}

.video-item {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 15px;
    background-color: #f9f9f9;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
}

.video-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.decoded-image {
    width: 100%;
    height: auto;
    border-radius: 4px;
    margin-bottom: 10px;
}

.video-name {
    font-weight: bold;
    margin-bottom: 10px;
    color: #333; /* Optional: Adjust color for better visibility */
}

.refresh-button {
        background-color: #2ecc71;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        display: block;
        margin: 20px auto;
        width: fit-content;
    }

.refresh-button:hover {
        background-color: #27ae60;
}

@media (max-width: 600px) {
    .video-item {
        margin-bottom: 15px;
    }
}
</style>
