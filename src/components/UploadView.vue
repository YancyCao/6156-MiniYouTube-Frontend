<template>
    <div class="upload-container">
      <el-upload
        class="upload-demo"
        drag
        action="/api/upload-video"
        accept=".mp4"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
      >
        <upload-filled class="upload-icon" />
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          Only .mp4 files can be uploaded
        </div>
      </el-upload>
    </div>
  </template>
  
  <script setup lang="js">
  import { UploadFilled } from '@element-plus/icons-vue';
  
  const handlePreview = (file) => {
    // Handle file preview
  };
  
  const handleRemove = (file, fileList) => {
    // Handle file removal
  };
  
  const beforeUpload = (file) => {
    // Validate file before upload
    return file.type === 'video/mp4';
  };
  </script>
  
  <style scoped>
  .upload-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 4px;
    text-align: center;
  }
  
  .upload-demo {
    padding: 20px 0;
  }
  
  .upload-icon {
    font-size: 40px;
    color: #3498db;
  }
  
  .el-upload__text {
    margin-top: 16px;
    font-size: 14px;
    color: #606266;
  }
  
  .el-upload__text em {
    color: #3498db;
    cursor: pointer;
  }
  
  .el-upload__tip {
    margin-top: 10px;
    font-size: 12px;
    color: #909399;
  }
  </style>
  