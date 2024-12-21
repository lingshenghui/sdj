document.addEventListener('DOMContentLoaded', () => {
    // 初始化雪花效果
    createSnowflakes();
    
    // 初始化书法面板
    initCalligraphyPanel();
    
    // 初始化交互效果
    initInteractions();

    // 添加图片加载提示
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.addEventListener('load', function() {
                this.style.transition = 'opacity 0.3s ease';
                this.style.opacity = '1';
            });
        }
    });
});

// 创建雪花效果
function createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes');
    const snowflakeCount = 50;

    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.cssText = `
            position: absolute;
            width: ${Math.random() * 8 + 2}px;
            height: ${Math.random() * 8 + 2}px;
            background: white;
            border-radius: 50%;
            top: -10px;
            left: ${Math.random() * 100}vw;
            opacity: ${Math.random()};
            animation: snowfall ${Math.random() * 3 + 2}s linear infinite;
            animation-delay: -${Math.random() * 5}s;
        `;
        snowflakesContainer.appendChild(snowflake);
    }
}

// 初始化书法面板
function initCalligraphyPanel() {
    const canvas = document.getElementById('inkCanvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // 设置画布尺寸
    canvas.width = 400;
    canvas.height = 300;

    // 设置画笔样式
    ctx.strokeStyle = '#000';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 2;

    // 绘画事件
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function draw(e) {
        if (!isDrawing) return;
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function stopDrawing() {
        isDrawing = false;
    }

    // 清除画布
    document.getElementById('clearCanvas').addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // 保存书法
    document.getElementById('saveCanvas').addEventListener('click', () => {
        const dataUrl = canvas.toDataURL();
        // 这里可以添加保存或分享功能
        document.querySelector('.calligraphy-panel').classList.remove('active');
    });
}

// 初始化交互效果
function initInteractions() {
    const writeButton = document.getElementById('writeBlessing');
    const shareButton = document.getElementById('shareBlessing');
    const calligraphyPanel = document.querySelector('.calligraphy-panel');

    // 打开书法面板
    writeButton.addEventListener('click', () => {
        calligraphyPanel.classList.add('active');
    });

    // 分享功能
    shareButton.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: '冬至祝福',
                text: '送上一份冬至祝福',
                url: window.location.href
            });
        } else {
            alert('您的浏览器不支持分享功能');
        }
    });

    // 添加卷轴展开动画
    const poetry = document.querySelector('.poetry');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'unfold 1.5s ease-out forwards';
            }
        });
    });
    observer.observe(poetry);
}

// 添加动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes snowfall {
        0% {
            transform: translateY(0) rotate(0deg);
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
        }
    }

    @keyframes unfold {
        from {
            transform: scaleY(0);
            opacity: 0;
        }
        to {
            transform: scaleY(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);