// Main JavaScript for Dukjil Business Website

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Starting initialization');
    
    // Initialize all components
    initMobileNavigation();
    initSmoothScrolling();
    initShareFunctionality();
    initScrollToTop();
    initImageLazyLoading();
    
    // Try to load articles dynamically, but also initialize filters for static content
    loadArticlesData();
    
    // Add small delay to ensure DOM is fully ready
    setTimeout(() => {
        initFilterSystem(); // This will work with both dynamic and static content
    }, 100);
    
    initViewTracking();
    initAnalytics();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', function() {
        const isOpen = navMenu.classList.contains('nav-menu--open');
        
        if (isOpen) {
            closeNavMenu();
        } else {
            openNavMenu();
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('nav-menu--open')) {
            closeNavMenu();
        }
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('nav-menu--open')) {
            closeNavMenu();
        }
    });
    
    function openNavMenu() {
        navMenu.classList.add('nav-menu--open');
        navToggle.classList.add('nav-toggle--open');
        navToggle.setAttribute('aria-expanded', 'true');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';
    }
    
    function closeNavMenu() {
        navMenu.classList.remove('nav-menu--open');
        navToggle.classList.remove('nav-toggle--open');
        navToggle.setAttribute('aria-expanded', 'false');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                event.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Share Functionality
 */
function initShareFunctionality() {
    // Add global copyURL function for share buttons
    window.copyURL = function() {
        const url = window.location.href;
        
        if (navigator.clipboard && window.isSecureContext) {
            // Use modern clipboard API
            navigator.clipboard.writeText(url).then(() => {
                showShareNotification('URL이 클립보드에 복사되었습니다.');
            }).catch(() => {
                fallbackCopyToClipboard(url);
            });
        } else {
            // Fallback for older browsers
            fallbackCopyToClipboard(url);
        }
    };
    
    function fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showShareNotification('URL이 클립보드에 복사되었습니다.');
        } catch (err) {
            showShareNotification('URL 복사에 실패했습니다.');
        }
        
        document.body.removeChild(textArea);
    }
    
    function showShareNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.share-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'share-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #1a1a1a;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 1000;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease-out;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        });
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

/**
 * Scroll to Top Functionality
 */
function initScrollToTop() {
    // Create scroll to top button
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '↑';
    scrollToTopButton.className = 'scroll-to-top';
    scrollToTopButton.setAttribute('aria-label', '맨 위로 이동');
    scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #1a1a1a;
        color: white;
        border: none;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease-out;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(scrollToTopButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopButton.style.opacity = '1';
            scrollToTopButton.style.visibility = 'visible';
            scrollToTopButton.style.transform = 'translateY(0)';
        } else {
            scrollToTopButton.style.opacity = '0';
            scrollToTopButton.style.visibility = 'hidden';
            scrollToTopButton.style.transform = 'translateY(20px)';
        }
    });
    
    // Scroll to top when clicked
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Image Lazy Loading (for future image additions)
 */
function initImageLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Basic Analytics Tracking (placeholder for future implementation)
 */
function initAnalytics() {
    // Track page views
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_TRACKING_ID', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
    
    // Track article reading
    if (document.querySelector('.article')) {
        trackArticleReading();
    }
}

/**
 * Track Article Reading Progress
 */
function trackArticleReading() {
    const article = document.querySelector('.article-content');
    if (!article) return;
    
    let maxScroll = 0;
    const milestones = [25, 50, 75, 100];
    const trackedMilestones = new Set();
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = Math.round((scrollTop / (docHeight - winHeight)) * 100);
        
        maxScroll = Math.max(maxScroll, scrollPercent);
        
        milestones.forEach(milestone => {
            if (maxScroll >= milestone && !trackedMilestones.has(milestone)) {
                trackedMilestones.add(milestone);
                
                // Track with analytics (if available)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'scroll', {
                        event_category: 'Article',
                        event_label: `${milestone}%`,
                        value: milestone
                    });
                }
            }
        });
    });
}

/**
 * Enhanced Card Interactions
 */
function initCardInteractions() {
    const cards = document.querySelectorAll('.featured-card, .category-card, .article-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

/**
 * Keyboard Navigation Support
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
        // Handle Escape key for closing modals/menus
        if (event.key === 'Escape') {
            const openMenu = document.querySelector('.nav-menu--open');
            if (openMenu) {
                closeNavMenu();
            }
        }
        
        // Handle Tab navigation
        if (event.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Remove keyboard navigation class when mouse is used
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

/**
 * Load Articles Data from JSON
 */
async function loadArticlesData() {
    console.log('Loading articles data...');
    try {
        // Detect GitHub Pages base path
        const isGitHubPages = window.location.hostname.includes('github.io');
        const basePath = isGitHubPages ? '/dukjil-website' : '';
        
        // Try multiple possible paths for GitHub Pages compatibility
        const possiblePaths = [
            './data/articles.json',
            `${basePath}/data/articles.json`,
            'data/articles.json'
        ];
        
        let response = null;
        let lastError = null;
        
        for (const path of possiblePaths) {
            try {
                console.log(`Trying to fetch from: ${path}`);
                response = await fetch(path);
                if (response.ok) {
                    console.log(`Successfully fetched from: ${path}`);
                    break;
                }
            } catch (err) {
                lastError = err;
                console.log(`Failed to fetch from ${path}:`, err);
            }
        }
        
        if (!response || !response.ok) {
            throw new Error(`HTTP error! status: ${response?.status || 'No response'}, last error: ${lastError}`);
        }
        
        const data = await response.json();
        console.log('Articles data loaded successfully:', data);
        
        if (data && data.articles) {
            console.log(`Found ${data.articles.length} articles`);
            renderArticles(data.articles);
            renderFilters(data.categories, data.keywords);
            initFilterSystem();
        } else {
            throw new Error('Invalid data structure');
        }
    } catch (error) {
        console.error('Failed to load articles data:', error);
        console.log('Falling back to static content...');
        // Fallback to hardcoded articles if JSON fails
        loadFallbackArticles();
    }
}

/**
 * Fallback Articles (in case JSON loading fails)
 */
function loadFallbackArticles() {
    console.log('Loading fallback articles...');
    const fallbackArticles = [
        {
            id: "limited-edition-idol",
            title: "11%의 데뷔 확률, 1.5년의 활동 – 다시 없을 '한정판' 아이돌",
            category: "프로듀스 101",
            categorySlug: "produce101",
            keyword: "희소성전략",
            date: "2025-05-22",
            excerpt: "Wanna One을 통해 본 한정판 아이돌의 희소성 마케팅 전략",
            readTime: "8분 읽기",
            path: "articles/limited-edition-idol.html"
        },
        {
            id: "produce-vote-800-billion",
            title: "1,200만 표로 완성된 800억 – "당신의 소년에게 투표하세요", 팬이 만든 아이돌의 정석",
            category: "프로듀스 101",
            categorySlug: "produce101",
            keyword: "팬참여형",
            date: "2025-05-21",
            excerpt: "프로듀스 101 시즌2를 통해 본 팬 참여형 콘텐츠 제작의 성공 전략",
            readTime: "9분 읽기",
            path: "articles/produce-vote-800-billion.html"
        },
        {
            id: "netflix-vs-marvel",
            title: "한 방을 노리는 넷플릭스, 꾸준히 회수하는 마블",
            category: "MCU",
            categorySlug: "mcu",
            keyword: "수익구조",
            date: "2025-05-20",
            excerpt: "플랫폼별 콘텐츠 전략의 차이점과 수익 모델 분석",
            readTime: "7분 읽기",
            path: "articles/netflix-vs-marvel.html"
        },
        {
            id: "thunderbolts-together",
            title: "왜 우리는 더 이상 혼자일 수 없는가 - 썬더볼츠(2025)로 마블이 하고 싶은 메시지",
            category: "MCU",
            categorySlug: "mcu",
            keyword: "썬더볼츠",
            date: "2025-05-15",
            excerpt: "마블이 썬더볼츠를 통해 전달하려는 고립과 연대의 메시지",
            readTime: "6분 읽기",
            path: "articles/thunderbolts-together.html"
        },
        {
            id: "marvel-15-years-message",
            title: "너는 무엇을 위해 함께할 수 있는가, 15년 동안 마블이 만들어온 메시지",
            category: "MCU",
            categorySlug: "mcu",
            keyword: "캐릭터브랜딩",
            date: "2025-05-14",
            excerpt: "15년간 마블이 구축한 캐릭터 기반 브랜딩 전략과 메시지",
            readTime: "7분 읽기",
            path: "articles/marvel-15-years-message.html"
        },
        {
            id: "spoiler-free-2-8b",
            title: "오늘부터 스포일러 금지, $2.8B 매출을 안겨준 팬들과의 약속",
            category: "MCU",
            categorySlug: "mcu",
            keyword: "스포일러마케팅",
            date: "2025-05-13",
            excerpt: "마블의 스포일러 방지 캠페인이 28억 달러 매출에 미친 영향",
            readTime: "6분 읽기",
            path: "articles/spoiler-free-2-8b.html"
        },
        {
            id: "marvel-saga-dc-chronicle",
            title: "Saga로 엮은 마블, Chronicle로 남긴 DC",
            category: "MCU",
            categorySlug: "mcu",
            keyword: "세계관전략",
            date: "2025-05-07",
            excerpt: "MCU의 연결된 유니버스 vs DC의 독립형 접근법 비교 분석",
            readTime: "8분 읽기",
            path: "articles/marvel-saga-dc-chronicle.html"
        },
        {
            id: "escape-kpop-intelligence",
            title: "'탈(脫)K-POP은 지능 순'이라는 자조, 그 구조엔 이유가 있다",
            category: "SM Entertainment",
            categorySlug: "sm-entertainment",
            keyword: "산업위기",
            date: "2025-05-06",
            excerpt: "K-POP 산업의 구조적 위기와 팬 피로감 분석",
            readTime: "7분 읽기",
            path: "articles/escape-kpop-intelligence.html"
        },
        {
            id: "sm-quality-guarantee",
            title: "'SM깔'이라는 100점짜리 품질보증서",
            category: "SM Entertainment",
            categorySlug: "sm-entertainment",
            keyword: "브랜드감각",
            date: "2025-05-01",
            excerpt: "SM의 브랜드 정체성이 개인의 감각에서 시스템적 관리로 진화한 과정",
            readTime: "6분 읽기",
            path: "articles/sm-quality-guarantee.html"
        },
        {
            id: "sm-debut-day-zero",
            title: "'콘텐츠 없이' 데뷔 0일 차에 팬덤 보유",
            category: "SM Entertainment",
            categorySlug: "sm-entertainment",
            keyword: "인재선점",
            date: "2025-04-30",
            excerpt: "SM Rookies 시스템을 통한 전략적 인재 확보와 사전 팬덤 구축",
            readTime: "7분 읽기",
            path: "articles/sm-debut-day-zero.html"
        },
        {
            id: "artium-popup",
            title: "수백만이 다녀갔지만 적자였던 아티움, 짧게 열고 다 팔아버린 팝업",
            category: "SM Entertainment",
            categorySlug: "sm-entertainment",
            keyword: "공간전략",
            date: "2025-04-29",
            excerpt: "상설 공간에서 팝업 전략으로의 전환과 그 성과",
            readTime: "6분 읽기",
            path: "articles/artium-popup.html"
        },
        {
            id: "smtown-artium",
            title: "연간 수백만이 찾은 도심 속 K-POP 테마파크, SMTOWN 아티움",
            category: "SM Entertainment",
            categorySlug: "sm-entertainment",
            keyword: "공간경험",
            date: "2025-04-24",
            excerpt: "SM의 물리적 공간 전략과 팬 경험 설계",
            readTime: "8분 읽기",
            path: "articles/smtown-artium.html"
        },
        {
            id: "smtown-concert-merchandise",
            title: "225억 공연 + 512억 굿즈, '같이' 팔아서 더 크게 만든 SM타운 효과",
            category: "SM Entertainment",
            categorySlug: "sm-entertainment",
            keyword: "수익모델",
            date: "2025-04-23",
            excerpt: "SMTOWN의 통합 수익 모델과 팬 경험 분석",
            readTime: "7분 읽기",
            path: "articles/smtown-concert-merchandise.html"
        },
        {
            id: "smtown-strategy",
            title: "그룹이 아니라 회사를 덕질하게 만든 전략, 'SMTOWN'",
            category: "SM Entertainment",
            categorySlug: "sm-entertainment",
            keyword: "브랜드전략",
            date: "2025-04-22",
            excerpt: "SM이 회사 차원의 팬덤을 구축한 SMTOWN 브랜딩 전략",
            readTime: "8분 읽기",
            path: "articles/smtown-strategy.html"
        },
        {
            id: "emotional-vs-analytical",
            title: "정서적 몰입 vs 분석적 해석, 팬은 어디에 머무는가?",
            category: "SM Entertainment",
            categorySlug: "sm-entertainment",
            keyword: "팬몰입분석",
            date: "2025-04-17",
            excerpt: "아이돌과 마블 팬덤의 몰입 방식 비교 분석",
            readTime: "7분 읽기",
            path: "articles/emotional-vs-analytical.html"
        },
        {
            id: "marvel-27billion-harvest",
            title: "10년간 심은 떡밥, 27.9억 달러로 회수되다",
            category: "MCU",
            categorySlug: "mcu",
            keyword: "큰그림",
            date: "2025-04-16",
            excerpt: "마블이 페이즈별로 떡밥을 던지며 세계관을 구축한 전략과 27.9억 달러라는 성과 분석",
            readTime: "8분 읽기",
            path: "articles/marvel-27billion-harvest.html"
        },
        {
            id: "exo-universe",
            title: "EXO를 해석하라, 세계관이 만든 밀리언셀러",
            category: "SM Entertainment",
            categorySlug: "sm-entertainment",
            keyword: "세계관",
            date: "2025-04-14",
            excerpt: "브랜드 세계관 구축이 고객 충성도와 매출에 미치는 영향",
            readTime: "6분 읽기",
            path: "articles/exo-universe.html"
        },
        {
            id: "world-view-ip-25x",
            title: "세계관 하나로 2차 IP 매출 2.5배",
            category: "SM Entertainment",
            categorySlug: "sm-entertainment",
            keyword: "세계관마케팅",
            date: "2025-04-10",
            excerpt: "아이돌 세계관이 브랜드 자산이 되어 IP 매출을 늘린 전략 분석",
            readTime: "6분 읽기",
            path: "articles/world-view-ip-25x.html"
        },
        {
            id: "sm-big-picture",
            title: "앨범은 덤, SM의 '큰 그림 전략'",
            category: "SM Entertainment",
            categorySlug: "sm-entertainment",
            keyword: "큰그림",
            date: "2025-04-09",
            excerpt: "왜 SM은 '큰 그림'을 먼저 그리고, 앨범은 그 위에 덧칠하는가 – 팬덤 비즈니스에서 비주얼 디렉팅 전략의 힘",
            readTime: "10분 읽기",
            path: "articles/sm-big-picture.html"
        },
        {
            id: "nct-4500-million",
            title: "따로 또 같이, 4500만 장을 판 팀 'NCT'",
            category: "SM Entertainment",
            categorySlug: "sm-entertainment",
            keyword: "NCT유닛전략",
            date: "2025-04-08",
            excerpt: "NCT의 무한 확장형 그룹 전략과 브랜드형 아이돌 체제 분석",
            readTime: "7분 읽기",
            path: "articles/nct-4500-million.html"
        },
        {
            id: "fan-waiting",
            title: "팬은 기다림도 소비한다",
            category: "SM Entertainment",
            categorySlug: "sm-entertainment",
            keyword: "몰입설계",
            date: "2025-04-01",
            excerpt: "SM의 티저 전략을 통해 본 고객 기대감 관리와 마케팅 타이밍의 중요성",
            readTime: "5분 읽기",
            path: "articles/fan-waiting.html"
        }
    ];
    
    renderArticles(fallbackArticles);
    initFilterSystem();
}

/**
 * Render Articles List (Magazine Grid Style)
 */
function renderArticles(articles) {
    const articlesList = document.getElementById('articles-list');
    if (!articlesList) return;
    
    // Sort articles by date (newest first)
    const sortedArticles = articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const articlesHTML = sortedArticles.map((article, index) => {
        const categoryClass = getCategoryClass(article.categorySlug);
        // Add variety to grid layout
        const cardSize = (index === 0 || index % 7 === 0) ? 'featured' : 'standard';
        
        return `
            <article class="magazine-card magazine-card--${cardSize}" data-category="${article.categorySlug}" data-keyword="${article.keyword}">
                <div class="magazine-card-image">
                    <img src="assets/images/covers/${article.id}.jpg" 
                         alt="${article.title}" 
                         loading="lazy"
                         onerror="this.src='assets/images/covers/default.jpg'">
                </div>
                <div class="magazine-card-content">
                    <div class="magazine-card-category ${categoryClass}">${article.category}</div>
                    <h3 class="magazine-card-title">
                        <a href="${article.path}">${article.title}</a>
                    </h3>
                    <p class="magazine-card-excerpt">${article.excerpt}</p>
                    <div class="magazine-card-meta">
                        <span class="keyword">${article.keyword}</span>
                        <time class="date">${formatDate(article.date)}</time>
                        <span class="read-time">${article.readTime || '5분 읽기'}</span>
                    </div>
                </div>
            </article>
        `;
    }).join('');
    
    articlesList.innerHTML = articlesHTML;
}

/**
 * Render Dynamic Filters
 */
function renderFilters(categories, keywords) {
    // Update keyword filters dynamically
    const keywordButtonsContainer = document.querySelector('.filter-group:last-child .filter-buttons');
    if (keywordButtonsContainer && keywords) {
        const keywordButtons = keywords.map(keyword => 
            `<button class="filter-btn filter-btn--keyword" data-keyword="${keyword.name}">${keyword.name}</button>`
        ).join('');
        
        keywordButtonsContainer.innerHTML = `
            <button class="filter-btn filter-btn--keyword filter-btn--active" data-keyword="all">전체</button>
            ${keywordButtons}
        `;
    }
}

/**
 * Helper Functions
 */
function getCategoryClass(categorySlug) {
    switch (categorySlug) {
        case 'sm-entertainment': return 'category-sm';
        case 'mcu': return 'category-mcu';
        case 'produce101': return 'category-produce';
        default: return 'category-default';
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
}

/**
 * Filter System (Magazine Style)
 */
function initFilterSystem() {
    console.log('Initializing filter system...');
    
    // Target the specific filter pills in the filter section
    const categoryButtons = document.querySelectorAll('.filter-pill[data-category]');
    const articles = document.querySelectorAll('.magazine-card[data-category]');
    const noResults = document.querySelector('.no-results');
    const resetButton = document.querySelector('.reset-filters-btn');
    
    console.log(`Found ${categoryButtons.length} category buttons and ${articles.length} articles`);
    
    if (!categoryButtons.length) {
        console.log('No category buttons found, filter system not initialized');
        return;
    }
    
    let currentCategory = 'all';
    
    // Handle browser back/forward navigation
    window.addEventListener('popstate', function(event) {
        console.log('Browser navigation detected, resetting filters');
        resetFilters();
    });
    
    // Check URL parameters on page load
    function initializeFiltersFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        
        if (categoryParam && categoryParam !== 'all') {
            const categoryBtn = document.querySelector(`.filter-pill[data-category="${categoryParam}"]`);
            if (categoryBtn) {
                console.log(`Setting initial category filter to: ${categoryParam}`);
                categoryButtons.forEach(btn => {
                    btn.classList.remove('filter-pill--active');
                });
                categoryBtn.classList.add('filter-pill--active');
                currentCategory = categoryParam;
            }
        }
        
        applyFilters();
    }
    
    // Initialize filters from URL
    initializeFiltersFromURL();
    
    // Category filter - Add event listeners to filter pills
    categoryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            console.log(`Category filter clicked: ${category}`);
            
            // Update active state for filter pills
            categoryButtons.forEach(btn => {
                btn.classList.remove('filter-pill--active');
            });
            this.classList.add('filter-pill--active');
            
            currentCategory = category;
            applyFilters();
        });
    });
    
    // Reset filters function
    function resetFilters() {
        console.log('Resetting all filters');
        currentCategory = 'all';
        
        // Reset button states
        categoryButtons.forEach(btn => {
            btn.classList.remove('filter-pill--active');
        });
        
        // Set "전체" button as active
        const allCategoryBtn = document.querySelector('.filter-pill[data-category="all"]');
        if (allCategoryBtn) {
            allCategoryBtn.classList.add('filter-pill--active');
        }
        
        applyFilters();
    }
    
    // Reset filters button
    if (resetButton) {
        resetButton.addEventListener('click', resetFilters);
    }
    
    function applyFilters() {
        let visibleCount = 0;
        console.log(`Applying filters: category=${currentCategory}`);
        
        articles.forEach(article => {
            const articleCategory = article.getAttribute('data-category');
            const categoryMatch = currentCategory === 'all' || articleCategory === currentCategory;
            
            if (categoryMatch) {
                article.classList.remove('hidden');
                article.style.display = '';
                visibleCount++;
            } else {
                article.classList.add('hidden');
                article.style.display = 'none';
            }
        });
        
        console.log(`Filter applied: ${visibleCount} articles visible`);
        
        // Show/hide no results message
        if (noResults) {
            if (visibleCount === 0) {
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
            }
        }
        
        // Track filter usage
        if (typeof gtag !== 'undefined') {
            gtag('event', 'filter_applied', {
                event_category: 'Article Filter',
                event_label: `${currentCategory}`,
                value: visibleCount
            });
        }
    }
}

/**
 * View Tracking System
 */
function initViewTracking() {
    // Track article views
    if (window.location.pathname.includes('/articles/')) {
        trackArticleView();
    }
    
    // Update popular articles on main page
    if (window.location.pathname === '/' || window.location.pathname.includes('/index.html')) {
        updatePopularArticles();
    }
}

function trackArticleView() {
    const articlePath = window.location.pathname;
    const articleTitle = document.querySelector('.article-title')?.textContent || '';
    
    if (!articlePath || !articleTitle) return;
    
    // Get existing views from localStorage
    let views = JSON.parse(localStorage.getItem('articleViews') || '{}');
    
    // Initialize article if not exists
    if (!views[articlePath]) {
        views[articlePath] = {
            title: articleTitle,
            count: 0,
            lastViewed: null
        };
    }
    
    // Check if this is a new view (different day or first time)
    const today = new Date().toDateString();
    const lastViewed = views[articlePath].lastViewed;
    
    if (lastViewed !== today) {
        views[articlePath].count++;
        views[articlePath].lastViewed = today;
        
        // Save back to localStorage
        localStorage.setItem('articleViews', JSON.stringify(views));
    }
}

function updatePopularArticles() {
    const views = JSON.parse(localStorage.getItem('articleViews') || '{}');
    
    // Sort articles by view count
    const sortedArticles = Object.entries(views)
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 3); // Top 3 articles
    
    if (sortedArticles.length === 0) return;
    
    // Update featured articles section with view counts
    const featuredCards = document.querySelectorAll('.featured-card');
    
    featuredCards.forEach(card => {
        const link = card.querySelector('.featured-card-title a');
        if (!link) return;
        
        const href = link.getAttribute('href');
        const articlePath = href.startsWith('../') ? href.replace('../', '/') : href;
        
        if (views[articlePath]) {
            const meta = card.querySelector('.featured-card-meta');
            if (meta) {
                // Remove existing view count if present
                const existingViewCount = meta.querySelector('.view-count');
                if (existingViewCount) {
                    existingViewCount.remove();
                }
                
                // Add view count
                const viewCount = document.createElement('span');
                viewCount.className = 'view-count';
                viewCount.textContent = `👁 ${views[articlePath].count}회`;
                viewCount.style.cssText = `
                    color: var(--color-gray-500);
                    font-size: var(--font-size-xs);
                `;
                meta.appendChild(viewCount);
            }
        }
    });
}

function getPopularArticles() {
    const views = JSON.parse(localStorage.getItem('articleViews') || '{}');
    return Object.entries(views)
        .sort((a, b) => b[1].count - a[1].count)
        .map(([path, data]) => ({
            path,
            title: data.title,
            count: data.count,
            lastViewed: data.lastViewed
        }));
}

/**
 * Performance Monitoring
 */
function initPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', function() {
        if ('performance' in window) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            
            // Track load time (if analytics is available)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'timing_complete', {
                    name: 'load',
                    value: loadTime
                });
            }
        }
    });
}