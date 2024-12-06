const posts = document.querySelector(".post-container");

function render(postDatas,userDatas){
    posts.innerHTML = ""
    for (const post of postDatas.posts) {
        const user = findByUserId(post.userId, userDatas);
        console.log(`Post ID: ${post.id}, User ID: ${post.userId}, User:`, user);
        posts.innerHTML += 
        `
        <div class= "post">
            <p>${user ? user.firstName : "Unknown"} ${user ? user.lastName : "Unknown"}</p>
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <p>💖${post.reactions.likes}🫣${post.reactions.dislikes}</p>
            </div>
            `
        }
        // <p>${post.firstName}${post.lastName}</p>
}
function findByUserId(userId,userDatas){
    if(userDatas && userDatas.users){
        for (const user of userDatas.users) {
            if(user.id === userId){
                return user;
            }
        }
    }
    console.warn(`User not found for ID: ${userId}`);
    return null; 
}
async function init(){
    const postDatas = await fetch("https://dummyjson.com/posts")
    .then(res => res.json())
    const userDatas = await fetch("https://dummyjson.com/users")
    .then(res => res.json())
    // console.log(userDatas);
    render(postDatas,userDatas);
    findByUserId(userDatas);
}

init();