const localFallbackData = [
    {
        "id": 1,
        "category": "DESIGN",
        "title": "The Psychology of Colors",
        "excerpt": "Colors profoundly impact our cognitive processes. They have been studied for their ability to lower heart rates or stimulate action.",
        "image": "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800",
        "analysis": "This concept explores Neuro-Aesthetics. Key takeaway: Blue stimulates productivity, while Red triggers survival instincts."
    },
    {
        "id": 2,
        "category": "SOCIETY",
        "title": "Digital Overload & The Mind",
        "excerpt": "In an era of constant connectivity, our attention spans are fragmented. Finding focus requires intentional disconnection.",
        "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
        "analysis": "Analysis: 'Context Switching' costs the brain 40% of its productive capacity. Focus is the new IQ."
    }
];

document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('blog-grid');
    const panel = document.getElementById('analysis-panel');
    const closeBtn = document.getElementById('close-panel');
    const loader = document.getElementById('analysis-loader');
    const dataSection = document.getElementById('analysis-data');

    let posts = [];

    // Try to get data from the backend, use fallback if it fails
    try {
        const response = await fetch('/api/posts');
        if (!response.ok) throw new Error("Backend not running");
        posts = await response.json();
    } catch (err) {
        console.warn("Backend not detected, using local data.");
        posts = localFallbackData;
    }

    // Render Cards
    grid.innerHTML = ''; // Clear grid
    posts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'blog-card';
        card.innerHTML = `
            <img src="${post.image}" class="card-img" alt="Post visual">
            <div class="card-content">
                <span class="category">${post.category}</span>
                <h2>${post.title}</h2>
                <p>${post.excerpt}</p>
                <button class="analyze-btn" data-id="${post.id}">Analyze Concept</button>
            </div>
        `;
        grid.appendChild(card);
    });

    // Handle Clicks
    grid.addEventListener('click', (e) => {
        if (e.target.classList.contains('analyze-btn')) {
            const postId = e.target.getAttribute('data-id');
            const post = posts.find(p => p.id == postId);
            openAnalysis(post);
        }
    });

    function openAnalysis(post) {
        panel.classList.add('active');
        loader.style.display = 'block';
        dataSection.style.display = 'none';

        setTimeout(() => {
            loader.style.display = 'none';
            dataSection.style.display = 'block';
            document.getElementById('analysis-title').innerText = post.title;
            document.getElementById('analysis-text').innerText = post.analysis;
        }, 800);
    }

    closeBtn.onclick = () => panel.classList.remove('active');
});