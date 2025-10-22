const renderTestimonials = (reviews) => {
    return `
    <div class="kyndly-widget">
        <div class="kyndly-widget-reviews">
            ${reviews.map(review => `<div class="kyndly-widget-review">${review.text}</div>`).join("")}
        </div>
    </div>
    `;
};
const applyStyles = (theme) => {
    const styles = `
    .kyndly-widget {
        background-color: ${theme.backgroundColor};
    }
    `;
    document.head.appendChild(document.createElement("style")).textContent = styles;
};
(async function() {
    const appId = document.currentScript?.getAttribute("data-app-id");
    const container = document.getElementById("kyndly-widget");
  
    const res = await fetch(`https://api.kyndly.online/public/${appId}`);
    const { reviews, layout } = await res.json();
    if (!container) {
        return;
    }
  
    const html = renderTestimonials(reviews);
    container.innerHTML = html;
  
    applyStyles(layout.theme);
  })();