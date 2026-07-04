// ============================================
// BLOG DATA
// ============================================
const BLOG_DATA_URL = 'posts/blog-posts.json';

// State
let posts = [];
let currentTag = 'all';
let currentPostSlug = null;

// DOM refs
const postsGrid = document.getElementById('postsGrid');
const postView = document.getElementById('postView');
const postContent = document.getElementById('postContent');
const tagsFilter = document.getElementById('tagsFilter');
const backToPostsBtn = document.getElementById('backToPosts');
const blogMain = document.getElementById('blogMain');

// ============================================
// FETCH POSTS
// ============================================
async function fetchPosts() {
    try {
        const response = await fetch(BLOG_DATA_URL);
        if (!response.ok) throw new Error('Failed to load posts');
        posts = await response.json();
        return posts;
    } catch (error) {
        console.error('Error loading posts:', error);
        postsGrid.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#888;">
                <i class="fas fa-exclamation-circle" style="font-size:48px;margin-bottom:16px;display:block;"></i>
                <h3>Unable to load blog posts</h3>
                <p>Please try again later.</p>
            </div>
        `;
        return [];
    }
}

// ============================================
// RENDER TAGS
// ============================================
function renderTags() {
    const allTags = new Set();
    posts.forEach(post => {
        if (post.tags) post.tags.forEach(tag => allTags.add(tag));
    });

    tagsFilter.innerHTML = `
        <button class="tag-btn active" data-tag="all">All Posts</button>
        ${Array.from(allTags).map(tag => `
            <button class="tag-btn" data-tag="${tag}">${tag}</button>
        `).join('')}
    `;

    tagsFilter.querySelectorAll('.tag-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            tagsFilter.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentTag = this.dataset.tag;
            renderPosts();
        });
    });
}

// ============================================
// RENDER POSTS (Grid View)
// ============================================
function renderPosts() {
    const filtered = currentTag === 'all'
        ? posts
        : posts.filter(p => p.tags && p.tags.includes(currentTag));

    if (filtered.length === 0) {
        postsGrid.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#888;">
                <i class="fas fa-search" style="font-size:48px;margin-bottom:16px;display:block;"></i>
                <h3>No posts found</h3>
                <p>Try a different tag.</p>
            </div>
        `;
        return;
    }

    postsGrid.innerHTML = filtered.map(post => `
        <article class="post-card" data-slug="${post.slug}">
            <div class="post-card-content">
                ${post.tags && post.tags.length > 0 ? `<span class="post-card-tag">${post.tags[0]}</span>` : ''}
                <div class="post-card-meta">
                    <span><i class="far fa-calendar-alt"></i> ${formatDate(post.date)}</span>
                    <span><i class="far fa-clock"></i> ${getReadingTime(post.body)} min read</span>
                </div>
                <h2 class="post-card-title">${post.title}</h2>
                <p class="post-card-excerpt">${post.excerpt || stripHtml(post.body).slice(0, 140)}...</p>
                <span class="post-card-read-more">Read More <i class="fas fa-arrow-right"></i></span>
            </div>
        </article>
    `).join('');

    postsGrid.querySelectorAll('.post-card').forEach(card => {
        card.addEventListener('click', function() {
            const slug = this.dataset.slug;
            showPost(slug);
        });
    });
}

// ============================================
// SHOW INDIVIDUAL POST (with FAQ Schema)
// ============================================
function showPost(slug) {
    const post = posts.find(p => p.slug === slug);
    if (!post) return;

    currentPostSlug = slug;
    window.history.pushState({ post: slug }, '', `?post=${slug}`);

    postsGrid.style.display = 'none';
    tagsFilter.style.display = 'none';
    postView.style.display = 'block';

    const readingTime = getReadingTime(post.body);

    // Related posts
    let relatedHtml = '';
    const related = posts
        .filter(p => p.slug !== slug && p.tags && p.tags.some(t => post.tags && post.tags.includes(t)))
        .slice(0, 3);

    if (related.length > 0) {
        relatedHtml = `
            <div class="related-posts">
                <h3>You Might Also Like</h3>
                <div class="related-grid">
                    ${related.map(r => `
                        <div class="related-card" data-slug="${r.slug}">
                            <h4>${r.title}</h4>
                            <p>${formatDate(r.date)}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // ============================================
    // INJECT BLOG POSTING SCHEMA
    // ============================================
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt || stripHtml(post.body).slice(0, 160),
        "datePublished": post.date,
        "dateModified": post.date,
        "author": {
            "@type": "Organization",
            "name": "Restoran Pak Haji Ali & Muiz Hot Chicken"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Restoran Pak Haji Ali & Muiz Hot Chicken",
            "logo": {
                "@type": "ImageObject",
                "url": "https://pakhajiali.github.io/menu/logo.webp"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://pakhajiali.github.io/menu/blog/?post=${slug}`
        }
    });
    schemaScript.setAttribute('data-post-schema', 'true');
    document.head.appendChild(schemaScript);

    // ============================================
    // INJECT FAQ SCHEMA (if FAQs exist)
    // ============================================
    if (post.faqs && post.faqs.length > 0) {
        const faqScript = document.createElement('script');
        faqScript.type = 'application/ld+json';
        faqScript.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": post.faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        });
        faqScript.setAttribute('data-faq-schema', 'true');
        document.head.appendChild(faqScript);
    }

    // ============================================
    // RENDER POST CONTENT
    // ============================================
    postContent.innerHTML = `
        <div class="post-header">
            ${post.tags && post.tags.length > 0 ? `<span class="post-tag">${post.tags[0]}</span>` : ''}
            <h1 class="post-title">${post.title}</h1>
            <div class="post-meta">
                <span><i class="far fa-calendar-alt"></i> ${formatDate(post.date)}</span>
                <span><i class="far fa-clock"></i> ${readingTime} min read</span>
            </div>
        </div>
        <div class="post-body">${post.body}</div>
        ${relatedHtml}
    `;

    postContent.querySelectorAll('.related-card').forEach(card => {
        card.addEventListener('click', function() {
            showPost(this.dataset.slug);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    document.title = `${post.title} - Restoran Pak Haji Ali & Muiz Hot Chicken Blog`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = post.excerpt || stripHtml(post.body).slice(0, 160);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.content = post.title;
    if (ogDesc) ogDesc.content = post.excerpt || stripHtml(post.body).slice(0, 160);

    blogMain.scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// HELPER FUNCTIONS
// ============================================
function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function getReadingTime(html) {
    const text = stripHtml(html);
    const words = text.split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
}

function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

// ============================================
// BACK TO POSTS
// ============================================
backToPostsBtn.addEventListener('click', function() {
    showPostsGrid();
});

function showPostsGrid() {
    currentPostSlug = null;
    postsGrid.style.display = 'grid';
    tagsFilter.style.display = 'flex';
    postView.style.display = 'none';

    document.title = 'Restoran Pak Haji Ali & Muiz Hot Chicken - Blog';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = 'Read the latest stories, recipes, and updates from Restoran Pak Haji Ali & Muiz Hot Chicken - your favourite halal restaurant in Subang Jaya USJ 8.';
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.content = 'Restoran Pak Haji Ali & Muiz Hot Chicken - Blog';
    if (ogDesc) ogDesc.content = 'Read the latest stories, recipes, and updates from your favourite halal restaurant in Subang Jaya USJ 8.';

    // Remove all schemas
    document.querySelectorAll('script[data-post-schema]').forEach(el => el.remove());
    document.querySelectorAll('script[data-faq-schema]').forEach(el => el.remove());

    window.history.pushState({}, '', window.location.pathname);
}

// ============================================
// HANDLE URL ON LOAD
// ============================================
function handleUrl() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('post');
    if (slug && posts.length > 0) {
        const post = posts.find(p => p.slug === slug);
        if (post) {
            showPost(slug);
            return;
        }
    }
    showPostsGrid();
}

// ============================================
// BACK BUTTON HANDLING
// ============================================
window.addEventListener('popstate', function(e) {
    if (e.state && e.state.post) {
        showPost(e.state.post);
    } else {
        showPostsGrid();
    }
});

// ============================================
// SCROLL REVEAL
// ============================================
function revealOnScroll() {
    const cards = document.querySelectorAll('.post-card');
    const windowHeight = window.innerHeight;
    cards.forEach((card, i) => {
        const top = card.getBoundingClientRect().top;
        if (top < windowHeight - 80) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, i * 80);
        }
    });
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', async function() {
    await fetchPosts();
    renderTags();
    renderPosts();
    handleUrl();
    setTimeout(revealOnScroll, 300);
    window.addEventListener('scroll', revealOnScroll);
});
