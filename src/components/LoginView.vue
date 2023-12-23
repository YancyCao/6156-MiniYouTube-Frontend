<template>
    <div class="form-container">
        <el-form :model="form" label-width="300px">
            <el-form-item label="I have an account!">
                <el-switch v-model="form.login" />
            </el-form-item>
            <el-form-item label="Email Address">
                <el-input v-model="form.email" />
            </el-form-item>
            <el-form-item label="Verification Code" class="verification_code">
                <el-input v-model="form.code" class="input-with-button" />
                <el-button @click="onSendCode">Send Verification Code</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">{{ form.login ? "Login" : "Create" }}</el-button>
            </el-form-item>
            <el-button type="primary" @click="onGoogleAuth" class="google-auth-button">Authenticate with Google</el-button>
        </el-form>
        
    </div>
   
</template>

<script lang="js" setup>
import { ElMessage } from 'element-plus'
import { inject, reactive, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const globalState = inject('globalState')
const form = reactive({
    login: false,
    email: '',
    code: '',
})


const onSubmit = async () => {
    if (form.login) {
        const email = form.email
        const test = (await axios.post(`${globalState.origin.value}/verify-login/`, { email: email, code: form.code })).data
        if (test.status === 'login successful') {
            globalState.username.value = email
            router.push({
                name: 'PersonalPage',
                params: { UserName: globalState.username.value },
            })
        }
        ElMessage({
            message: test.status,
            type: test.status === 'login successful' ? 'success' : 'error',
        })
    } else {
        const test = (await axios.post(`${globalState.origin.value}/verify/`, { email: form.email, code: form.code })).data
        ElMessage({
            message: test.status,
            type: test.status === 'verified' ? 'success' : 'error',
        })
    }
}

const onSendCode = async () => {
    if (form.login) {
        const test = (await axios.post(`${globalState.origin.value}/login/`, { email: form.email })).data
        ElMessage({
            message: test.status,
            type: test.status === 'verification email sent' ? 'success' : 'error',
        })
    } else {
        const test = (await axios.post(`${globalState.origin.value}/register/`, { email: form.email })).data
        ElMessage({
            message: test.status,
            type: test.status === 'subscription email sent' || test.status === 'verification code sent' ? 'success' : 'error',
        })
    }
}

const onGoogleAuth = () => {
    const googleWindow = window.open('http://ec2-3-138-106-167.us-east-2.compute.amazonaws.com:1024/authenticate/', '_blank');
    const pollTimer = window.setInterval(() => {
        if (googleWindow.closed) {
            clearInterval(pollTimer);
            // Check for the authentication response here (usually with a local state check or a server request)
            // Assuming a function checkGoogleAuthStatus() that verifies if the user is authenticated
            checkGoogleAuthStatus().then(isAuthenticated => {
                if (isAuthenticated) {
                    globalState.username.value = 'GoogleUser';
                    router.push({ name: 'PersonalPage', params: { UserName: globalState.username.value } });
                }
            });
        }
    }, 500);
};

// Example function to check Google authentication status (adjust as per your backend logic)
async function checkGoogleAuthStatus() {
    // Implement a method to check if the user is authenticated with Google
    // For example, a request to your backend to verify the session
    return true; // Replace with actual authentication check
}

</script>

<style scoped>
.form-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.verification_code {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.input-with-button {
    flex: 1;
    padding-right: 10px;
}

el-button {
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

el-button:hover {
    background-color: #2980b9;
}

.google-auth-button {
    margin-top: 20px;
    /* Additional styling for Google Auth button */
}


@media only screen and (max-width: 600px) {
    .form-container {
        padding: 10px;
    }
}

</style>
