/* 工具函数库 - Utility Functions */
/* 开心快乐每一天网站 - 通用工具函数 */

/**
 * 防抖函数 - 防止函数频繁调用
 * @param {Function} func - 需要防抖的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * 节流函数 - 限制函数调用频率
 * @param {Function} func - 需要节流的函数
 * @param {number} delay - 节流间隔（毫秒）
 * @returns {Function} 节流后的函数
 */
function throttle(func, delay) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), delay);
        }
    };
}

/**
 * 平滑滚动到指定元素
 * @param {string|Element} target - 目标元素或选择器
 * @param {number} duration - 滚动持续时间（毫秒）
 * @param {number} offset - 偏移量（像素）
 */
function smoothScrollTo(target, duration = 800, offset = 0) {
    const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
    
    if (!targetElement) {
        console.warn(`目标元素未找到: ${target}`);
        return;
    }
    
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    // 缓动函数 - easeInOutQuad
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

/**
 * 日期格式化函数
 * @param {Date|string} date - 日期对象或日期字符串
 * @param {string} format - 格式字符串 (YYYY-MM-DD, MM/DD/YYYY 等)
 * @returns {string} 格式化后的日期字符串
 */
function formatDate(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    
    if (isNaN(d.getTime())) {
        console.warn(`无效的日期: ${date}`);
        return '';
    }
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}

/**
 * 相对时间格式化（几分钟前、几小时前等）
 * @param {Date|string} date - 日期对象或日期字符串
 * @returns {string} 相对时间字符串
 */
function getRelativeTime(date) {
    const now = new Date();
    const targetDate = new Date(date);
    const diffInSeconds = Math.floor((now - targetDate) / 1000);
    
    if (diffInSeconds < 60) {
        return '刚刚';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes}分钟前`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours}小时前`;
    } else if (diffInSeconds < 2592000) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days}天前`;
    } else if (diffInSeconds < 31536000) {
        const months = Math.floor(diffInSeconds / 2592000);
        return `${months}个月前`;
    } else {
        const years = Math.floor(diffInSeconds / 31536000);
        return `${years}年前`;
    }
}

/**
 * 计算阅读时间估算
 * @param {string} text - 文本内容
 * @param {number} wordsPerMinute - 每分钟阅读字数（中文）
 * @returns {string} 阅读时间字符串
 */
function calculateReadTime(text, wordsPerMinute = 300) {
    if (!text || typeof text !== 'string') {
        return '0分钟';
    }
    
    // 移除HTML标签
    const cleanText = text.replace(/<[^>]*>/g, '');
    const wordCount = cleanText.length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    
    return minutes === 1 ? '1分钟' : `${minutes}分钟`;
}

/**
 * 图片懒加载函数
 * @param {string} selector - 图片选择器
 * @param {Object} options - 观察器选项
 */
function initLazyLoading(selector = '[data-src]', options = {}) {
    const defaultOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };
    
    const observerOptions = { ...defaultOptions, ...options };
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src;
                    
                    if (src) {
                        img.src = src;
                        img.classList.remove('lazy');
                        img.classList.add('lazy-loaded');
                        observer.unobserve(img);
                    }
                }
            });
        }, observerOptions);
        
        document.querySelectorAll(selector).forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // 降级处理：直接加载所有图片
        document.querySelectorAll(selector).forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('lazy-loaded');
            }
        });
    }
}

/**
 * 本地存储工具函数
 */
const storage = {
    /**
     * 设置本地存储
     * @param {string} key - 键名
     * @param {any} value - 值
     * @param {number} expiry - 过期时间（毫秒）
     */
    set(key, value, expiry = null) {
        try {
            const item = {
                value,
                expiry: expiry ? Date.now() + expiry : null
            };
            localStorage.setItem(key, JSON.stringify(item));
        } catch (error) {
            console.warn('无法设置本地存储:', error);
        }
    },
    
    /**
     * 获取本地存储
     * @param {string} key - 键名
     * @returns {any} 存储的值
     */
    get(key) {
        try {
            const itemStr = localStorage.getItem(key);
            if (!itemStr) return null;
            
            const item = JSON.parse(itemStr);
            
            // 检查是否过期
            if (item.expiry && Date.now() > item.expiry) {
                localStorage.removeItem(key);
                return null;
            }
            
            return item.value;
        } catch (error) {
            console.warn('无法获取本地存储:', error);
            return null;
        }
    },
    
    /**
     * 删除本地存储
     * @param {string} key - 键名
     */
    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.warn('无法删除本地存储:', error);
        }
    },
    
    /**
     * 清空本地存储
     */
    clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.warn('无法清空本地存储:', error);
        }
    }
};

/**
 * DOM 操作工具函数
 */
const dom = {
    /**
     * 查询单个元素
     * @param {string} selector - CSS选择器
     * @param {Element} context - 查询上下文
     * @returns {Element|null}
     */
    $(selector, context = document) {
        return context.querySelector(selector);
    },
    
    /**
     * 查询多个元素
     * @param {string} selector - CSS选择器
     * @param {Element} context - 查询上下文
     * @returns {NodeList}
     */
    $$(selector, context = document) {
        return context.querySelectorAll(selector);
    },
    
    /**
     * 添加事件监听器
     * @param {Element|string} element - 元素或选择器
     * @param {string} event - 事件名称
     * @param {Function} handler - 事件处理函数
     * @param {Object} options - 事件选项
     */
    on(element, event, handler, options = {}) {
        const el = typeof element === 'string' ? this.$(element) : element;
        if (el) {
            el.addEventListener(event, handler, options);
        }
    },
    
    /**
     * 移除事件监听器
     * @param {Element|string} element - 元素或选择器
     * @param {string} event - 事件名称
     * @param {Function} handler - 事件处理函数
     */
    off(element, event, handler) {
        const el = typeof element === 'string' ? this.$(element) : element;
        if (el) {
            el.removeEventListener(event, handler);
        }
    },
    
    /**
     * 添加CSS类
     * @param {Element|string} element - 元素或选择器
     * @param {string} className - 类名
     */
    addClass(element, className) {
        const el = typeof element === 'string' ? this.$(element) : element;
        if (el) {
            el.classList.add(className);
        }
    },
    
    /**
     * 移除CSS类
     * @param {Element|string} element - 元素或选择器
     * @param {string} className - 类名
     */
    removeClass(element, className) {
        const el = typeof element === 'string' ? this.$(element) : element;
        if (el) {
            el.classList.remove(className);
        }
    },
    
    /**
     * 切换CSS类
     * @param {Element|string} element - 元素或选择器
     * @param {string} className - 类名
     */
    toggleClass(element, className) {
        const el = typeof element === 'string' ? this.$(element) : element;
        if (el) {
            el.classList.toggle(className);
        }
    }
};

/**
 * 检测用户设备信息
 * @returns {Object} 设备信息对象
 */
function getDeviceInfo() {
    const userAgent = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent);
    const isDesktop = !isMobile && !isTablet;
    
    return {
        isMobile,
        isTablet,
        isDesktop,
        userAgent,
        platform: navigator.platform,
        language: navigator.language,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine
    };
}

/**
 * 检测浏览器支持的功能
 * @returns {Object} 功能支持对象
 */
function getBrowserSupport() {
    return {
        localStorage: typeof Storage !== 'undefined',
        sessionStorage: typeof Storage !== 'undefined',
        intersectionObserver: 'IntersectionObserver' in window,
        fetch: 'fetch' in window,
        webp: canUseWebP(),
        touchEvents: 'ontouchstart' in window,
        serviceWorker: 'serviceWorker' in navigator
    };
}

/**
 * 检测WebP支持
 * @returns {boolean}
 */
function canUseWebP() {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

/**
 * 生成唯一ID
 * @param {string} prefix - 前缀
 * @returns {string} 唯一ID
 */
function generateId(prefix = 'id') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 深拷贝对象
 * @param {any} obj - 要拷贝的对象
 * @returns {any} 拷贝后的对象
 */
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    
    if (obj instanceof Array) {
        return obj.map(item => deepClone(item));
    }
    
    if (typeof obj === 'object') {
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
}

/**
 * URL参数解析
 * @param {string} url - URL字符串（可选，默认为当前页面URL）
 * @returns {Object} 参数对象
 */
function parseUrlParams(url = window.location.href) {
    const params = {};
    const urlObj = new URL(url);
    
    for (const [key, value] of urlObj.searchParams) {
        params[key] = value;
    }
    
    return params;
}

/**
 * 简单的模板引擎
 * @param {string} template - 模板字符串
 * @param {Object} data - 数据对象
 * @returns {string} 渲染后的字符串
 */
function renderTemplate(template, data) {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return data[key] !== undefined ? data[key] : match;
    });
}

// 导出所有工具函数（如果使用模块系统）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        smoothScrollTo,
        formatDate,
        getRelativeTime,
        calculateReadTime,
        initLazyLoading,
        storage,
        dom,
        getDeviceInfo,
        getBrowserSupport,
        canUseWebP,
        generateId,
        deepClone,
        parseUrlParams,
        renderTemplate
    };
}