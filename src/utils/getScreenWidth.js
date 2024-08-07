function getScreenWidth() {
    const maxPostWidth = 768; // Maximum width for posts
    const postWidth = 600; // Default width for posts

    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (screenWidth < maxPostWidth) {
        return screenWidth - 40;
    } else {
        return postWidth;
    }
}