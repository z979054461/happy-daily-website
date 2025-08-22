# 开心快乐每一天 - 个人分享网站

[![Deploy to GitHub Pages](https://github.com/z979054461/happy-daily-website/actions/workflows/deploy.yml/badge.svg)](https://github.com/z979054461/happy-daily-website/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 项目简介

"开心快乐每一天"是一个非经营性个人网站，主要用于记录和分享在生活、学习、工作中的点点滴滴。通过文字的力量，希望能够给访问者带来一些启发和温暖，让我们一起开心快乐每一天！

## 网站信息

- **网站名称**: 开心快乐每一天
- **网站性质**: 非经营性个人网站
- **备案号**: 浙ICP备2025192124号-1
- **技术栈**: HTML5 + CSS3 + JavaScript (原生)
- **仓库地址**: https://github.com/z979054461/happy-daily-website
- **在线访问**: https://z979054461.github.io/happy-daily-website/

## 功能特色

### 三大分享模块

1. **🌈 生活分享**
   - 记录生活中的美好瞬间
   - 分享日常的小确幸
   - 传递生活的正能量和智慧

2. **📚 学习分享**
   - 记录学习过程中的心得体会
   - 分享知识点总结
   - 与大家一起成长进步

3. **💼 工作分享**
   - 分享工作中的经验技巧
   - 记录职场成长历程
   - 提供实用的工作建议

### 技术特性

- ✅ 响应式设计，适配多种设备
- ✅ 语义化HTML结构
- ✅ 无障碍访问设计
- ✅ SEO优化
- ✅ 深色模式支持
- ✅ 图片懒加载
- ✅ 平滑滚动
- ✅ 移动端友好

## 项目结构

```
happy-daily-website/
├── .github/                   # GitHub配置目录
│   ├── workflows/            # GitHub Actions工作流
│   │   └── deploy.yml        # 自动部署配置
│   └── PULL_REQUEST_TEMPLATE.md # PR模板
├── .gitignore                 # Git忽略文件配置
├── .gitattributes             # Git属性配置
├── LICENSE                    # MIT开源许可证
├── README.md                  # 项目说明文档
├── index.html                 # 网站首页
├── about.html                 # 关于我页面
├── life/                      # 生活分享模块
│   ├── index.html            # 生活分享首页
│   └── articles/             # 生活文章目录
├── study/                     # 学习分享模块
│   ├── index.html            # 学习分享首页
│   └── articles/             # 学习文章目录
├── work/                      # 工作分享模块
│   ├── index.html            # 工作分享首页
│   └── articles/             # 工作文章目录
└── assets/                    # 静态资源目录
    ├── css/                  # 样式文件
    │   ├── reset.css         # 样式重置
    │   ├── main.css          # 主样式文件
    │   └── responsive.css    # 响应式样式
    ├── js/                   # JavaScript文件
    │   ├── utils.js          # 工具函数
    │   └── main.js           # 主JavaScript文件
    ├── images/               # 图片资源
    └── fonts/                # 字体文件
```

## 快速开始

### 在线访问

直接访问已部署的网站：https://z979054461.github.io/happy-daily-website/

### 本地运行

1. **克隆项目**
   ```bash
   git clone https://github.com/z979054461/happy-daily-website.git
   cd happy-daily-website
   ```

2. **启动本地服务器**
   ```bash
   # 使用Python 3 (推荐)
   python3 -m http.server 8000
   
   # 或使用Node.js
   npx serve .
   
   # 或使用PHP
   php -S localhost:8000
   ```

3. **访问网站**
   打开浏览器访问：http://localhost:8000

### 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### 部署

#### 自动部署 (推荐)

本项目已配置GitHub Actions自动部署：

1. Push代码到main分支
2. GitHub Actions自动触发部署流程
3. 自动部署到GitHub Pages
4. 可通过以下地址访问：https://z979054461.github.io/happy-daily-website/

#### 手动部署选项

本项目为纯静态网站，也可以部署到其他平台：

- **GitHub Pages**: 已配置自动部署
- **Netlify**: 连接GitHub仓库即可
- **Vercel**: 导入GitHub项目
- **传统虚拟主机**: 直接上传文件到web目录

#### 部署流程说明

每次提交到main分支时，GitHub Actions会自动执行：

1. **代码质量检查**
   - HTML验证
   - CSS语法检查 (如果配置了stylelint)
   - JavaScript语法检查 (如果配置了eslint)
   - 本地服务器启动测试

2. **自动部署**
   - 部署到GitHub Pages
   - 生成可访问的URL

3. **性能测试** (部署后)
   - Lighthouse性能测试
   - 生成性能报告

## 设计理念

### 色彩方案
- **主色调**: #FF6B6B (温暖的珊瑚红)
- **辅助色**: #4ECDC4 (清新的青绿色)
- **背景色**: #F7F9FC (浅灰蓝)
- **文字色**: #2C3E50 (深灰蓝)

### 设计原则
- 简洁而温馨的视觉风格
- 良好的用户体验
- 快速的加载速度
- 无障碍访问支持

## 开发规范

### HTML规范
- 使用语义化HTML5标签
- 合理的标题层级结构
- 完善的ARIA属性
- 有效的表单验证

### CSS规范
- CSS变量统一管理
- 响应式设计优先
- 组件化样式结构
- 渐进增强的视觉效果

### JavaScript规范
- ES6+语法标准
- 模块化代码组织
- 错误处理和降级方案
- 性能优化最佳实践

## 性能优化

- CSS和JS文件压缩
- 图片懒加载技术
- 关键资源预加载
- 缓存策略优化
- 减少HTTP请求

## SEO优化

- 合理的meta标签设置
- 结构化数据标记
- 语义化URL结构
- 内部链接优化
- 站点地图生成

## 贡献指南

### 如何贡献

1. **Fork项目**
   ```bash
   # 点击GitHub页面右上角的Fork按钮
   ```

2. **创建特性分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **提交更改**
   ```bash
   git add .
   git commit -m "feat: 添加新功能描述"
   ```

4. **推送到分支**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **创建Pull Request**
   - 在GitHub上创建PR
   - 填写PR模板
   - 等待代码审查

### 提交规范

我们使用约定式提交规范：

- `feat`: 新功能
- `fix`: 错误修复
- `docs`: 文档更新
- `style`: 代码格式化
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

示例：
```bash
git commit -m "feat(页面): 添加生活分享页面"
git commit -m "fix(样式): 修复移动端导航问题"
git commit -m "docs: 更新README文档"
```

### 开发环境

推荐的开发工具：
- **编辑器**: VS Code
- **浏览器**: Chrome DevTools
- **版本控制**: Git
- **本地服务器**: Python http.server 或 Live Server扩展

### 测试清单

提交PR前请确保：

- [ ] 在不同浏览器中测试
- [ ] 移动端响应式测试
- [ ] 所有链接正常工作
- [ ] 图片和资源正确加载
- [ ] 深色模式功能正常
- [ ] 无障碍访问特性工作
- [ ] 代码通过本地服务器测试

## 更新日志

### v1.1.0 (2025-01-XX)
- 🚀 添加GitHub Actions自动部署
- 📝 完善项目文档和贡献指南
- 🔧 配置Git相关文件(.gitignore, .gitattributes)
- 📄 添加MIT开源许可证
- 🔗 集成GitHub Pages部署

### v1.0.0 (2024-01-25)
- ✨ 初始版本发布
- ✨ 完成首页和三大模块页面
- ✨ 实现响应式设计
- ✨ 添加深色模式支持
- ✨ 完善无障碍访问功能

## 联系方式

如果您有任何建议或想要交流，欢迎通过以下方式联系：

- 网站留言
- 邮箱联系

## 许可证

本项目基于 [MIT许可证](LICENSE) 开源。

## 致谢

感谢所有为这个项目做出贡献的人！

## 联系与反馈

如果您在使用过程中遇到问题，或者有改进建议，欢迎：

- 🐛 [提交Issue](https://github.com/z979054461/happy-daily-website/issues)
- 💡 [提交Feature Request](https://github.com/z979054461/happy-daily-website/issues)
- 🔀 [提交Pull Request](https://github.com/z979054461/happy-daily-website/pulls)

## 技术栈详情

- **前端框架**: 无框架，原生Web技术
- **构建工具**: 无需构建，直接部署
- **CI/CD**: GitHub Actions
- **托管平台**: GitHub Pages
- **版本控制**: Git
- **代码规范**: HTML5, CSS3, ES6+

---

**开心快乐每一天** - 让我们一起在分享中成长，在成长中快乐！ 😊