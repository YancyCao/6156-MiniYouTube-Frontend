<template>
  <div id='title_bar'> <!-- Title bar -->
    <div id='titles'>
      <div id='group_title'>Mission-Possible</div>
      <div id='mini_youtube_title'>Mini YouTube</div>
    </div>
    <div id='temperature'>{{ temperature }}</div>
  </div>

  <div id='app'><router-view></router-view></div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      temperature: 'Loading...', // 默认显示 Loading...
    };
  },
  mounted() {
    this.fetchTemperature();
  },
  methods: {
    async fetchTemperature() {
      try {
        const response = await fetch('https://cors-anywhere.herokuapp.com/http://66.205.162.34.bc.googleusercontent.com:1024/weather/nyc', {
          headers: {
            'Origin': 'http://localhost:5173', // 前端应用的实际来源
          }
        });
        const data = await response.json();
        const tempInKelvin = data.current.temp;
        this.temperature = this.kelvinToFahrenheit(tempInKelvin).toFixed(1) + '°F'; // 转换为华氏度并更新
      } catch (error) {
        console.error('Error fetching temperature:', error);
        this.temperature = 'Error'; // 出错时显示 Error
      }
    },
    kelvinToFahrenheit(kelvin) {
      return (kelvin - 273.15) * 9/5 + 32; // 开尔文转华氏度
    }
  }
}
</script>



<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
  background-color: #f4f4f4;
}

#app {
  font-family: 'Roboto', sans-serif;
  text-align: center;
  color: #34495e;
  margin-top: 60px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

#title_bar {
  background: linear-gradient(to right, #6dd5ed, #2193b0); /* Gradient background */
  padding: 15px 20px; /* Adjusted padding */
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Align items to the left */
}

#titles {
  text-align: left;
}

#group_title, #mini_youtube_title {
  font-size: 28px;
  color: white; /* Font color white for contrast */
  font-weight: 700;
  margin: 0;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}

#temperature {
  margin-left: auto; /* Push to the right */
  color: white;
  font-size: 18px;
  font-weight: 700;
}


@media only screen and (max-width: 600px) {
  #app {
    margin-top: 20px;
  }

  #group_title, #mini_youtube_title {
    font-size: 24px;
  }
}
</style>
