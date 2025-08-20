// Main JavaScript for Dukjil Business Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileNavigation();
    initSmoothScrolling();
    initShareFunctionality();
    initScrollToTop();
    initImageLazyLoading();
    loadArticlesData();
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
    try {
        const response = await fetch('data/articles.json');
        const data = await response.json();
        
        if (data && data.articles) {
            renderArticles(data.articles);
            renderFilters(data.categories, data.keywords);
            initFilterSystem();
        }
    } catch (error) {
        console.error('Failed to load articles data:', error);
        // Show fallback content or error message
        const articlesList = document.getElementById('articles-list');
        if (articlesList) {
            articlesList.innerHTML = '<p>글을 불러오는 중 오류가 발생했습니다.</p>';
        }
    }
}

/**
 * Render Articles List
 */
function renderArticles(articles) {
    const articlesList = document.getElementById('articles-list');
    if (!articlesList) return;
    
    // Sort articles by date (newest first)
    const sortedArticles = articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const articlesHTML = sortedArticles.map(article => {
        const categoryClass = getCategoryClass(article.categorySlug);
        return `
            <article class="article-item" data-category="${article.categorySlug}" data-keyword="${article.keyword}">
                <div class="article-item-category ${categoryClass}">${article.category}</div>
                <h3 class="article-item-title">
                    <a href="${article.path}">${article.title}</a>
                </h3>
                <p class="article-item-excerpt">${article.excerpt}</p>
                <div class="article-item-meta">
                    <span class="keyword">${article.keyword}</span>
                    <time class="date">${formatDate(article.date)}</time>
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
 * Filter System (Notion Database Style)
 */
function initFilterSystem() {
    const categoryButtons = document.querySelectorAll('[data-category]');
    const keywordButtons = document.querySelectorAll('[data-keyword]');
    const articles = document.querySelectorAll('.article-item');
    const noResults = document.querySelector('.no-results');
    const resetButton = document.querySelector('.reset-filters-btn');
    
    if (!categoryButtons.length || !articles.length) return;
    
    let currentCategory = 'all';
    let currentKeyword = 'all';
    
    // Handle browser back/forward navigation
    window.addEventListener('popstate', function(event) {
        // Reset filters when user navigates back
        resetFilters();
    });
    
    // Check URL parameters on page load
    function initializeFiltersFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        const keywordParam = urlParams.get('keyword');
        
        if (categoryParam && categoryParam !== 'all') {
            const categoryBtn = document.querySelector(`[data-category="${categoryParam}"]`);
            if (categoryBtn) {
                categoryButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
                categoryBtn.classList.add('filter-btn--active');
                currentCategory = categoryParam;
            }
        }
        
        if (keywordParam && keywordParam !== 'all') {
            const keywordBtn = document.querySelector(`[data-keyword="${keywordParam}"]`);
            if (keywordBtn) {
                keywordButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
                keywordBtn.classList.add('filter-btn--active');
                currentKeyword = keywordParam;
            }
        }
        
        applyFilters();
    }
    
    // Initialize filters from URL
    initializeFiltersFromURL();
    
    // Category filter
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active state
            categoryButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
            this.classList.add('filter-btn--active');
            
            currentCategory = category;
            applyFilters();
        });
    });
    
    // Keyword filter
    keywordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const keyword = this.getAttribute('data-keyword');
            
            // Update active state
            keywordButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
            this.classList.add('filter-btn--active');
            
            currentKeyword = keyword;
            applyFilters();
        });
    });
    
    // Reset filters function
    function resetFilters() {
        currentCategory = 'all';
        currentKeyword = 'all';
        
        // Reset button states
        categoryButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
        keywordButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
        
        // Set "전체" buttons as active
        const allCategoryBtn = document.querySelector('[data-category="all"]');
        const allKeywordBtn = document.querySelector('[data-keyword="all"]');
        
        if (allCategoryBtn) allCategoryBtn.classList.add('filter-btn--active');
        if (allKeywordBtn) allKeywordBtn.classList.add('filter-btn--active');
        
        applyFilters();
    }
    
    // Reset filters button
    if (resetButton) {
        resetButton.addEventListener('click', resetFilters);
    }
    
    function applyFilters() {
        let visibleCount = 0;
        
        articles.forEach(article => {
            const articleCategory = article.getAttribute('data-category');
            const articleKeyword = article.getAttribute('data-keyword');
            
            const categoryMatch = currentCategory === 'all' || articleCategory === currentCategory;
            const keywordMatch = currentKeyword === 'all' || articleKeyword === currentKeyword;
            
            if (categoryMatch && keywordMatch) {
                article.classList.remove('hidden');
                visibleCount++;
            } else {
                article.classList.add('hidden');
            }
        });
        
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
                event_label: `${currentCategory}_${currentKeyword}`,
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