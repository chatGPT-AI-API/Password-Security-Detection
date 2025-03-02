# 密码安全检测工具

这是一个基于Web的密码安全检测工具，可以帮助用户评估密码的强度并提供安全建议。

## 功能特点

- 实时密码强度评估
- 可视化强度指示条
- 详细的安全建议
- 多维度密码分析：
  - 长度检查
  - 字符类型多样性
  - 熵值计算
  - 重复字符检测
  - 连续字符检测
  - 键盘布局模式检测
  - 常见密码检查
  - 字符分布分析

## 使用方法

1. 克隆仓库到本地：
   ```bash
   git clone [仓库URL]
   ```

2. 进入项目目录：
   ```bash
   cd password-strength-checker
   ```

3. 启动本地服务器：
   - Windows用户可以直接运行 `start_server.bat`
   - 或者使用Python启动服务器：
     ```bash
     python -m http.server 8000
     ```

4. 在浏览器中访问：
   ```
   http://localhost:8000
   ```

## 技术栈

- HTML5
- CSS3
- JavaScript (原生)

## 安全特性

- 纯前端实现，不存储任何密码信息
- 所有分析都在本地进行，保护用户隐私
- 全面的密码强度评估算法

## 贡献

欢迎提交Issue和Pull Request来帮助改进这个项目！

## 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。