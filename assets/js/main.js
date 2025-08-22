/* 开心快乐每一天网站 - 主JavaScript文件 */
/* Main JavaScript file for Happy Daily Website */

// 网站主应用对象
const HappyDailyApp = {
    // 应用配置
    config: {
        // 回到顶部按钮显示阈值
        backToTopThreshold: 300,
        // 导航栏滚动检测阈值
        headerScrollThreshold: 100,
        // 文章搜索防抖延迟
        searchDebounceDelay: 300,
        // 懒加载根边距
        lazyLoadRootMargin: '50px'
    },
    
    // 初始化函数
    init() {
        this.initDOM();
        this.initEventListeners();
        this.initLazyLoading();
        this.initThemeToggle();
        this.initBackToTop();
        this.initMobileMenu();
        this.initNavigation();
        this.initAnimations();
        
        console.log('🎉 开心快乐每一天网站初始化完成！');
    },
    
    // 初始化DOM元素引用
    initDOM() {
        this.elements = {
            // 头部元素
            header: document.querySelector('.site-header'),
            mobileMenuToggle: document.querySelector('.mobile-menu-toggle'),
            mainNav: document.querySelector('.main-nav'),
            navLinks: document.querySelectorAll('.nav-link'),
            
            // 主题切换
            themeToggle: document.querySelector('.theme-toggle'),
            
            // 回到顶部按钮
            backToTop: document.querySelector('.back-to-top'),
            
            // 内容区域
            mainContent: document.querySelector('.main-content'),
            articleCards: document.querySelectorAll('.article-card'),
            featureCards: document.querySelectorAll('.feature-card'),
            
            // 搜索相关
            searchInput: document.querySelector('.search-input'),
            searchResults: document.querySelector('.search-results'),
            
            // 加载动画
            loadingSpinner: document.querySelector('.loading-spinner')
        };
    },
    
    // 初始化事件监听器
    initEventListeners() {
        // 窗口滚动事件
        window.addEventListener('scroll', throttle(() => {
            this.handleScroll();
        }, 100));
        
        // 窗口大小变化事件
        window.addEventListener('resize', debounce(() => {
            this.handleResize();
        }, 250));
        
        // 页面加载完成事件
        window.addEventListener('load', () => {
            this.handlePageLoad();
        });
        
        // 页面可见性变化事件
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });
        
        // 键盘事件
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
    },
    
    // 初始化移动端菜单
    initMobileMenu() {
        if (!this.elements.mobileMenuToggle || !this.elements.mainNav) return;
        
        this.elements.mobileMenuToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // 点击菜单项后关闭移动端菜单
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.closeMobileMenu();
                }
            });
        });
        
        // 点击菜单外部关闭菜单
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.site-header')) {
                this.closeMobileMenu();
            }
        });
    },
    
    // 切换移动端菜单
    toggleMobileMenu() {
        const isActive = this.elements.mobileMenuToggle.classList.contains('active');
        
        if (isActive) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    },
    
    // 打开移动端菜单
    openMobileMenu() {
        this.elements.mobileMenuToggle.classList.add('active');
        this.elements.mainNav.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // 添加ARIA属性
        this.elements.mobileMenuToggle.setAttribute('aria-expanded', 'true');
    },
    
    // 关闭移动端菜单
    closeMobileMenu() {
        this.elements.mobileMenuToggle.classList.remove('active');
        this.elements.mainNav.classList.remove('active');
        document.body.style.overflow = '';
        
        // 更新ARIA属性
        this.elements.mobileMenuToggle.setAttribute('aria-expanded', 'false');
    },
    
    // 初始化导航高亮
    initNavigation() {
        this.updateActiveNavLink();
        
        // 监听路由变化（如果使用单页应用）
        window.addEventListener('popstate', () => {
            this.updateActiveNavLink();
        });
    },
    
    // 更新当前页面导航高亮
    updateActiveNavLink() {
        const currentPath = window.location.pathname;
        
        this.elements.navLinks.forEach(link => {
            link.classList.remove('active');
            
            const linkPath = new URL(link.href).pathname;
            if (linkPath === currentPath || 
                (currentPath !== '/' && linkPath !== '/' && currentPath.startsWith(linkPath))) {
                link.classList.add('active');
            }
        });
    },
    
    // 初始化主题切换功能
    initThemeToggle() {
        // 从本地存储获取主题设置
        const savedTheme = storage.get('theme') || 'light';
        this.setTheme(savedTheme);
        
        if (this.elements.themeToggle) {
            this.elements.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
        
        // 监听系统主题变化
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                if (!storage.get('theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    },
    
    // 切换主题
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        storage.set('theme', newTheme);
    },
    
    // 设置主题
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        if (this.elements.themeToggle) {
            this.elements.themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
            this.elements.themeToggle.setAttribute('aria-label', 
                theme === 'light' ? '切换到深色模式' : '切换到浅色模式');
        }
    },
    
    // 初始化回到顶部功能
    initBackToTop() {
        if (!this.elements.backToTop) return;
        
        this.elements.backToTop.addEventListener('click', () => {
            smoothScrollTo(0, 800);
        });
    },
    
    // 初始化懒加载
    initLazyLoading() {
        initLazyLoading('[data-src]', {
            rootMargin: this.config.lazyLoadRootMargin,
            threshold: 0.1
        });
    },
    
    // 初始化页面动画
    initAnimations() {
        // 为卡片添加进入动画
        this.observeElements('.feature-card, .article-card', (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
            });
        });
        
        // 为页面标题添加动画
        this.observeElements('.page-title, .hero-title', (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInDown 0.8s ease forwards';
                }
            });
        });
    },
    
    // 通用元素观察器
    observeElements(selector, callback, options = {}) {
        const defaultOptions = {
            threshold: 0.1,
            rootMargin: '50px'
        };
        
        const observerOptions = { ...defaultOptions, ...options };
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(callback, observerOptions);
            
            document.querySelectorAll(selector).forEach(el => {
                observer.observe(el);
            });
        }
    },
    
    // 处理滚动事件
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 更新回到顶部按钮显示状态
        this.updateBackToTopVisibility(scrollTop);
        
        // 更新头部样式
        this.updateHeaderStyle(scrollTop);
    },
    
    // 更新回到顶部按钮可见性
    updateBackToTopVisibility(scrollTop) {
        if (!this.elements.backToTop) return;
        
        if (scrollTop > this.config.backToTopThreshold) {
            this.elements.backToTop.classList.add('visible');
        } else {
            this.elements.backToTop.classList.remove('visible');
        }
    },
    
    // 更新头部样式
    updateHeaderStyle(scrollTop) {
        if (!this.elements.header) return;
        
        if (scrollTop > this.config.headerScrollThreshold) {
            this.elements.header.classList.add('scrolled');
        } else {
            this.elements.header.classList.remove('scrolled');
        }
    },
    
    // 处理窗口大小变化
    handleResize() {
        // 如果是桌面端，关闭移动端菜单
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
        
        // 重新计算布局
        this.recalculateLayout();
    },
    
    // 重新计算布局
    recalculateLayout() {
        // 可以在这里添加需要重新计算的布局逻辑
        console.log('重新计算布局');
    },
    
    // 处理页面加载完成
    handlePageLoad() {
        // 隐藏加载动画
        if (this.elements.loadingSpinner) {
            this.elements.loadingSpinner.style.display = 'none';
        }
        
        // 添加页面加载完成的样式类
        document.body.classList.add('loaded');
        
        // 记录页面加载时间
        const loadTime = performance.now();
        console.log(`页面加载完成，耗时: ${Math.round(loadTime)}ms`);
    },
    
    // 处理页面可见性变化
    handleVisibilityChange() {
        if (document.hidden) {
            console.log('页面隐藏');
        } else {
            console.log('页面显示');
        }
    },
    
    // 处理键盘事件
    handleKeyboard(e) {
        // ESC键关闭移动端菜单
        if (e.key === 'Escape') {
            this.closeMobileMenu();
        }
        
        // Ctrl/Cmd + K 打开搜索（如果有搜索功能）
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (this.elements.searchInput) {
                this.elements.searchInput.focus();
            }
        }
    },
    
    // 文章搜索功能
    initArticleSearch() {
        if (!this.elements.searchInput) return;
        
        const debouncedSearch = debounce((query) => {
            this.performSearch(query);
        }, this.config.searchDebounceDelay);
        
        this.elements.searchInput.addEventListener('input', (e) => {
            debouncedSearch(e.target.value.trim());
        });
    },
    
    // 执行搜索
    performSearch(query) {
        if (!query) {
            this.clearSearchResults();
            return;
        }
        
        // 这里可以实现实际的搜索逻辑
        console.log(`搜索: ${query}`);
        
        // 模拟搜索结果
        this.displaySearchResults([
            { title: '搜索结果1', url: '#', excerpt: '搜索结果摘要...' }
        ]);
    },
    
    // 显示搜索结果
    displaySearchResults(results) {
        if (!this.elements.searchResults) return;
        
        if (results.length === 0) {
            this.elements.searchResults.innerHTML = '<p>没有找到相关结果</p>';
        } else {
            const html = results.map(result => `
                <div class="search-result">
                    <h3><a href="${result.url}">${result.title}</a></h3>
                    <p>${result.excerpt}</p>
                </div>
            `).join('');
            
            this.elements.searchResults.innerHTML = html;
        }
        
        this.elements.searchResults.style.display = 'block';
    },
    
    // 清空搜索结果
    clearSearchResults() {
        if (this.elements.searchResults) {
            this.elements.searchResults.innerHTML = '';
            this.elements.searchResults.style.display = 'none';
        }
    },
    
    // 显示通知消息
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // 添加到页面
        document.body.appendChild(notification);
        
        // 显示动画
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, duration);
    },
    
    // 错误处理
    handleError(error, context = '') {
        console.error(`错误发生在 ${context}:`, error);
        
        // 可以在这里添加错误上报逻辑
        // this.reportError(error, context);
    }
};

// 添加CSS动画关键帧
const animationStyles = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 4px;
        background: #333;
        color: white;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 9999;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        background: #4ECDC4;
    }
    
    .notification-error {
        background: #FF6B6B;
    }
    
    .notification-warning {
        background: #FFE66D;
        color: #333;
    }
`;

// 添加样式到页面
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// DOM加载完成后初始化应用
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        HappyDailyApp.init();
    });
} else {
    HappyDailyApp.init();
}

// 全局错误处理
window.addEventListener('error', (e) => {
    HappyDailyApp.handleError(e.error, '全局错误');
});

window.addEventListener('unhandledrejection', (e) => {
    HappyDailyApp.handleError(e.reason, 'Promise错误');
});

// 导出到全局（方便调试）
window.HappyDailyApp = HappyDailyApp;