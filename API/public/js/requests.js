const navigations = [
    {
        url: '',
        index: 0
    },
    {
        url: 'shop',
        index: 1
    },
    {
        url: 'recipes',
        index: 2
    },
    {
        url: 'blogs',
        index: 3
    }
]

const axios = async (url, method, ...body) => {
    console.log(body)
    reqOpts = {
        method,
        headers: {
            "Content-Type": "application/json",
            }
    }

    if (body) {
        reqOpts.body = JSON.stringify(body[0])
    }

    console.log(reqOpts)

    const response = await fetch(url, reqOpts)
    return await response.json()
}

let loggedUser

const fetchUser = async () => {
    try {
        const res = await axios(`/api/v1/users/me`, 'GET')

        if (res.status === 'error' || res.status === 'fail') {
            alert(res.message)
            return res.message
         }

         loggedUser = res.data.document

    } catch (err) {
        alert(err.message)
    }
}

const navigate = async () => {
    const previouslyActive = document.querySelector('.main-nav .nav-item.active')
    previouslyActive.classList.toggle('active')
    
    const currentlyActiveIndex = navigations.find(e => e.url === location.pathname.split('/')[1])
    
    const activeNav = document.querySelectorAll('.main-nav .nav-item')[currentlyActiveIndex.index]
    activeNav.classList.toggle('active')

    console.log(currentlyActiveIndex, activeNav)
}

navigate();

const queryPage = async (btn) => {
    const page = btn.id.split('_')[1]

    // shop page
    if (location.pathname === '/shop') {
        const res = await axios(`/api/v1/meals?page=${page}`, 'GET')

        renderShop(res.data)
    }

    // recipe page
    if (location.pathname === '/recipes') {
        const res = await axios(`/api/v1/recipes?page=${page}`, 'GET')

        renderRecipes(res.data)
    }

    // blog page
    if (location.pathname === '/blogs') {
        const res = await axios(`/api/v1/blogs?page=${page}`, 'GET')

        renderBlogs(res.data)
    }

    console.log(page)
}

const paginate = (currentPage, lastPage) => {
    const pagination = document.createElement('div')
    pagination.classList.add('pagination')
    const pagination_list = document.createElement('ul')

    if (currentPage !== 1) {
        const prev_btn = document.createElement('li')
        prev_btn.innerHTML = `<button class="btn btn-invert" id="id_${(currentPage * 1) - 1}" onclick="queryPage(this)"><i class="fa fa-chevron-left"></i></button>`

        pagination_list.append(prev_btn)
    }

    for (let i = 0; i < lastPage; i++) {
        const pagination_item = document.createElement('li')

        pagination_item.innerHTML = `<button class="btn btn-invert" id="id_${i + 1}" onclick="queryPage(this)">${i+1}</button>`
        if (i === currentPage-1) {
            pagination_item.innerHTML = `<button class="btn btn-invert active" id="id_${i + 1}" onclick="queryPage(this)">${i+1}</button>`
        }

        pagination_list.append(pagination_item)
    }

    if (currentPage !== lastPage) {
        const next_btn = document.createElement('li')
        next_btn.innerHTML = `<button class="btn btn-invert" id="id_${(currentPage * 1) + 1}" onclick="queryPage(this)"><i class="fa fa-chevron-right"></i></button>`

        pagination_list.append(next_btn)
    }

    pagination.append(pagination_list)

    return pagination
}

// AUTH REQUESTS
const login = async (btn) => {
    btn.innerHTML = `loading...`
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const res = await axios(`/api/v1/users/login`, 'POST', {email, password})
        console.log(res);

        if (res.status === 'error') {
           alert(res.message)
           return btn.innerHTML = 'Login'
        }

        window.setTimeout(() => {
            location.assign('/shop')
        })
    } catch (err) {
        console.log(err)
    }
}

const register = async (btn) => {
    btn.innerHTML = `loading...`
    const email = document.getElementById('email').value;
    const name = document.getElementById('username').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const password = document.getElementById('password').value;
    
    try {
        const res = await axios(`/api/v1/users/signup`, 'POST', {name, email, password, confirmPassword})

        if (res.status === 'error' || res.status === 'fail') {
            alert(res.message)
            return btn.innerHTML = 'Create Account'
         }
 
         window.setTimeout(() => {
             location.assign('/login')
         })
    } catch (err) {
        console.log(err)
    }
}

// API RESOURCE REQUEST
const getMeals = async () => {
    try {
        const res = await axios(`/api/v1/meals`, 'GET')
        console.log(res)

        if (res.status === 'error' || res.status === 'fail') {
            alert(res.message)
            return res.message
         }

        return res.data
    } catch (err) {
        console.log(err)
    }
}

const addToCart = async (btn) => {
    const product = btn.parentNode.parentNode.querySelector('[type=hidden]').value
    
    try {
        const res = await axios(`/api/v1/users/cart`, 'POST', { product })

        if (res.status === 'error' || res.status === 'fail') {
            alert(res.message)
            return res.message
        }

        btn.innerText = 'ADDED'
        btn.disabled = true
    } catch (err) {
        alert(err.message)
    }
}

const getCart = async () => {
    try {
        const res = await axios(`/api/v1/users/cart`, 'GET')

        if (res.status === 'error' || res.status === 'fail') {
            alert(res.message)
            return res.message
        }

        return res.data.cart
    } catch (err) {
        alert(err.message)
    }
}

const getRecipes = async () => {
    try {
        const res = await axios(`/api/v1/recipes`, 'GET')

        if (res.status === 'error' || res.status === 'fail') {
            alert(res.message)
            return res.message
         }

        return res.data
    } catch (err) {
        console.log(err)
    }
}

const getRecipe = async (id) => {
    try {
        const res = await axios(`/api/v1/recipes/${id}`, 'GET')

        if (res.status === 'error' || res.status === 'fail') {
            alert(res.message)
            return res.message
         }

        return res.data.document
    } catch (err) {
        console.log(err)
    }
}

const getBlogs = async () => {
    try {
        const res = await axios(`/api/v1/blogs`, 'GET')

        if (res.status === 'error' || res.status === 'fail') {
            alert(res.message)
            return res.message
         }

        return res.data
    } catch (err) {
        console.log(err)
    }
}

const getBlog = async (id) => {
    try {
        const res = await axios(`/api/v1/blogs/${id}`, 'GET')

        if (res.status === 'error' || res.status === 'fail') {
            alert(res.message)
            return res.message
         }

        return res.data.document    
    } catch (err) {
        console.log(err)
    }
}

// REVIEWS
const getReviews = async (resourceId) => {
    try {
        const res = await axios(`/api/v1/blogs/${resourceId}/reviews?sort=createdAt`, 'GET')

        if (res.status === 'error' || res.status === 'fail') {
            alert(res.message)
            return res.message
         }

        return res.data
    } catch (err) {
        console.log(err)
    }
}

const createReview = async (body) => {
    try {
        const res = await axios(`/api/v1/reviews`, 'POST', body)

        if (res.status === 'error' || res.status === 'fail') {
            alert(res.message)
            return res.message
         }

        return res.data.document
    } catch (err) {
        console.log(err)
    }
}

const sendReview = async () => {
    const id = location.pathname.split('/')[2]
    const modal = document.querySelector('#review-modal')
    const msg = document.querySelector('#review-modal [name=review]')
    const rating = document.querySelector('#review-modal [name=rating]')
    
    let doc = await createReview({review: msg.value, rating: rating.value, articleType: 'Blog', article: id})

    if (doc) {
        alert('successfully sent your review')
        msg.value = ''
        rating.value = ''
        modal.style.display = "none";
    } else {
        alert(doc.message)
    }
}

const updateUser = async () => {
    try {
        const res = await axios(`/api/v1/reviews`, 'POST', body)

        if (res.status === 'error' || res.status === 'fail') {
            alert(res.message)
            return res.message
         }

        return res.data.document
    } catch (err) {
        console.log(err)
    }
}

const sendUpdatedUser = async (btn) => {
    const name = btn.parentNode.querySelector('[type=text]').value
    const phone = btn.parentNode.querySelector('[type=tel]').value

    console.log({name, phone})
    
    try {
        const res = await axios(`/api/v1/users/me`, 'PATCH', {name, phone})
        
        if (res.status === 'error' || res.status === 'fail') {
            alert(res.message)
            return res.message
        }

        console.log(res.data.document)
        return res.data.document
    } catch (err) {
        console.log(err)
    }

}

const placeOrder = async () => {
    
}

const getTableReservations = async () => {
    try {
        const res = await axios(`/api/v1/bookings?booker=${loggedUser._id}`, 'GET')

        if (res.status === 'error' || res.status === 'fail') {
            alert(res.message)
            return res.message
         }

        return res.data.documents
    } catch (err) {
        console.log(err)
    }
}

const bookTable = async (btn) => {
    const phone = document.querySelector('[name=phone]')
    const no_of_people = document.querySelector('[name=no_of_people]')
    const time = document.querySelector('[name=time]')
    const message = document.querySelector('[name=message]')

    console.log(time.value,message.value, phone.value)

    try {
        const res = await axios(`/api/v1/bookings`, 'POST', { 
            phone: phone.value,
            no_of_people: no_of_people.value,
            time: time.value,
            message: message.value,
            time: time.value,
        })

        if (res.status === 'error' || res.status === 'fail') {
            alert(res.message)
            return res.message
         }

         alert(res.status)
        console.log(res.data.document)
    } catch (err) {
        console.log(err)
    }
}

// CLIENT_SIDE RENDERING
const renderRating = (number) => {
    const rating = document.createElement('div')
    for (let i = 0; i < Math.floor(number); i++) {
        const icon = document.createElement('i')
        icon.className = 'fa fa-star'

        rating.append(icon)
    }

    for (let i = 0; i < (5 - Math.floor(number)); i++) {
        const icon = document.createElement('i')
        icon.className = 'far fa-star'

        rating.append(icon)
    }
    return rating
}

const renderShop = (meals) => {
    let shopMain = document.querySelector('.shop-main')

    shopMain.innerHTML = `<div class="loader"></div>`
    let product_list = document.createElement('ul')
    product_list.classList.add('product-list')

    meals.documents.forEach(meal => {
        let product_card = document.createElement('li')
        product_card.classList.add('product-card')
        product_card.innerHTML = 
        `<div class="product-img">
            <img src="/img/dishes/menu-item-6.png" width="150" alt="">
        </div>
        <div class="product-details">
            <span>lunch</span>
            <div class="pricing">
                <h4>${meal.name}</h4>
                <p class="price">$${meal.price}</p>
            </div>
                <input type="hidden" name="" value="${meal._id}">
            <div class="actions">
                <button class="btn" onclick="addToCart(this)">ADD TO CART</button>
                <button><i class="far fa-heart"></i></button>
            </div>
        </div>`
        
        product_list.append(product_card)
    })
    shopMain.innerHTML = ``
    shopMain.append(product_list)

    const pagination = paginate(meals.meta.page, meals.meta.last_page)
    shopMain.append(pagination)
    console.log(meals.meta)
}

const renderReviews = (reviews) => {
    const ul = document.createElement('ul')
    ul.classList.add('reviews-list')
    
    reviews.forEach(review => {
        const li = document.createElement('li')
        const d = new Date(review.createdAt)

        li.innerHTML = `<div class="review-header">
            <div class="rating">${renderRating(review.rating).innerHTML} (${review.rating})</div>
            <div class="review-date">${d.toDateString()}</div>
        </div>
        <p class="review-content">${review.review}</p>
        <h5 class="review-writer">By: ${review.userId.name}</h5>`

        ul.append(li)
    })

    return ul
}

const renderRecipes = (recipes) => {
    let recipesMain = document.querySelector('.recipes-main')
    recipesMain.innerHTML = `<div class="loader"></div>`
    let recipes_list = document.createElement('ul')
    recipes_list.classList.add('recipes-list')

    recipes.documents.forEach(recipe => {
        const d = new Date(recipe.createdAt);
        let recipe_card = document.createElement('li')
        recipe_card.classList.add('recipes-card')

        recipe_card.innerHTML = 
        `<div class="recipe-img">
            <img src="/img/banner-4.jpg" alt="">
            <div class="author-info">
                <img src="/img/users/user-1.jpg" alt="">
                <p class="author-name">${recipe.author.name}</p>
            </div>
        </div>
        <div class="recipe-content">
            <h4 class="recipe-title">${recipe.title}</h4>
        </div>
        <div class="actions">
            <div class="action-info">
                <p class="date">
                    <i class="fa fa-calendar"></i>
                    <span>${d.toLocaleDateString()}</span>
                </p>
                <p class="reviews">
                    <i class="fa fa-eye"></i>
                    <span>${recipe.numRating}</span>
                </p>
            </div>
            <button onclick="location.assign('/recipes/${recipe._id}')">Read More</button>
        </div>`

        recipes_list.append(recipe_card)
    })
    recipesMain.innerHTML = ``
    recipesMain.append(recipes_list)

    const pagination = paginate(recipes.meta.page, recipes.meta.last_page)
    recipesMain.append(pagination)

    console.log(recipes.meta)
}

const renderBlogs = (blogs) => {
    let blogsMain = document.querySelector('.blogs-main')
    blogsMain.innerHTML = `<div class="loader"></div>`
    let blogs_list = document.createElement('ul')
    blogs_list.classList.add('blogs-list')

    blogs.documents.forEach(blog => {
        const d = new Date(blog.createdAt);
        let blog_card = document.createElement('li')
        blog_card.classList.add('blogs-card')

        blog_card.innerHTML = 
        `<div class="blog-img">
            <img src="/img/banner-3.jpg" alt="">
            </div>
            <div class="blog-content">
            <div class="author-info">
                <span class="author-name">${blog.author.name}</span> - <span class="blog-date">${d.toDateString()}</span>
            </div>
            <h4 class="blog-title">${blog.title}</h4>
            <p class="blog-description">${blog.body.substring(0, 80)}...</p>
            <a href="/blogs/${blog._id}">Read More</a>
            </div>`

            blogs_list.append(blog_card)
    })
    blogsMain.innerHTML = ``
    blogsMain.append(blogs_list)
    
    const pagination = paginate(blogs.meta.page, blogs.meta.last_page)
    blogsMain.append(pagination)

    console.log(blogs.meta)
}

const renderCart = (items) => {
    const cart_list = document.querySelector('.cart-main ul')
    items.forEach(item => {
        const li = document.createElement('li')
        li.className = 'cart-card card'
        li.innerHTML = `
            <div class="img-wrapper">
                <img src="../img/users/user-1.jpg" alt="">
            </div>
            <div class="product-info">
                <div class="details">
                    <h3>${item.product.name}</h3>
                    <h4>${item.product.price * item.quantity}</h4>
                    <div class="action">
                        <button><div class="fa fa-minus"></div></button>
                        <input type="number" step="1" min="1" max="1000" name="quantity" value="${item.quantity}" size="4">
                        <button><i class="fa fa-plus"></i></button>
                    </div>
                </div>

                <button>
                    <i class="fa fa-trash-alt"></i>
                </button>
            </div>
        `
        
        cart_list.append(li)

        console.log(item)
    })
}

fetchUser().then(() => {
    if (location.pathname === '/shop') {
        getMeals().then(meals => {
            renderShop(meals)
        })
    }

    if (location.pathname === '/blogs') {
        getBlogs().then(blogs => {
            renderBlogs(blogs)
        })
    }

    if (location.pathname === '/recipes') {
        getRecipes().then(recipes => {
            renderRecipes(recipes)
        })
    }

    if ((location.pathname.split('/')[1] === 'recipes') && (location.pathname.split('/')[2] !== undefined)) {
        const id = location.pathname.split('/')[2]
        console.log(id)
        let blogsMain = document.querySelector('.blogs-main')
        blogsMain.innerHTML = `<div class="loader"></div>`

        getRecipe(id).then(recipe => {
            console.log(recipe)
            let blogs_list = document.createElement('ul')
            blogs_list.classList.add('blogs-list')

                const d = new Date(recipe.createdAt);
                let blog_card = document.createElement('li')
                blog_card.classList.add('blogs-card')

                blog_card.innerHTML = 
                `<div class="blog-img">
                    <img src="/img/banner-4.jpg" alt="">
                </div>
                <div class="blog-content">
                    <div class="author-info">
                        <span class="author-name">${recipe.author.name}</span> - <span class="blog-date">${d.toDateString()}</span>
                    </div>
                    <h4 class="blog-title">${recipe.title}</h4>
                    <p class="blog-description">${recipe.description.substring(0, 80)}...</p>
                    <a href="">Read More</a>
                </div>`

                blogs_list.append(blog_card)

            blogsMain.innerHTML = ``
            blogsMain.append(blogs_list)
            console.log(blogs)
        })
    }

    if ((location.pathname.split('/')[1] === 'blogs') && (location.pathname.split('/')[2] !== undefined)) {
        const id = location.pathname.split('/')[2]
        const page_content = document.querySelector('.page-content')
        let blogMain = document.querySelector('.blog-main')
        blogMain.innerHTML = `<div class="loader"></div>`

        getBlog(id).then(blog => {
            const d = new Date(blog.createdAt);
            document.title = blog.title
            
            blogMain.innerHTML = 
            `<div class="blog-card">
            <div class="blog-img">
                <img src="../img/banner-3.jpg" alt="">
            </div>
            <div class="blog-content">
                <h2 class="blog-title">
                    ${blog.title}
                </h2>

                <p class="author-time-info"><span class="date">${d.toDateString()}</span> -- <span class="name">${blog.author.name}</span></p>

                <p class="blog-body">
                    ${blog.body}
                </p>
                </div>
            </div>`
        })
        
        getReviews(id).then(reviews => {
            console.log(reviews)
            let reviews_div = document.createElement('div')
            reviews_div.classList.add('reviews')
            reviews_div.innerHTML = `<div class="review-header"> <h3>Reviews</h3>
            <button class="btn" id="create-review-btn" onclick="createModal('review-modal', this)">Leave a review</button>
            </div>`
            let reviews_list = renderReviews(reviews.documents)

            let write_review = document.createElement('div')
            write_review.className = 'write-review-form'
            let review_input = document.createElement('input')
            review_input.placeholder = 'Write a review'
            // let review_btn = document.createElement('button')
            // review_btn.className = 'btn'
            // review_btn.id = 'create-review-btn'
            // review_btn.innerHTML = `Leave a review`
            // review_btn.onclick = 
            // review_btn.addEventListener('click', async () => {
            //     createModal('review-modal', review_btn)
            //     // const msg = document.querySelector('.write-review-form input')

            //     // console.log(msg.value)
            //     // let doc = await createReview({review: msg.value, articleType: 'Blog', article: id})
            // })
            // review_btn.addEventListener('click', async () => {
                //     const msg = document.querySelector('.write-review-form input')

            //     console.log(msg.value)
            //     let doc = await createReview({review: msg.value, articleType: 'Blog', article: id})
            // })
            
            // write_review.append(review_input)
            // write_review.append(review_btn)

            reviews_div.append(reviews_list)
            reviews_div.append(write_review)
            page_content.append(reviews_div)
            
        })
    }

    if (location.pathname === '/profile') {
        const photo = document.querySelector('.user-img img')
        const name = document.querySelector('.user-info h3')
        const email = document.querySelector('.user-info p')
        
        console.log(photo.src, name, email, loggedUser)

        photo.src = loggedUser.photo
        name.innerText = `Hello, ${loggedUser.name}`
        email.innerText = loggedUser.email

        const form_name = document.querySelector('.user-update-form [type=text]')
        const form_phone = document.querySelector('.user-update-form [type=tel]')

        console.log(form_name)

        form_name.value = loggedUser.name
        form_phone.value = `${(loggedUser.phone === undefined) ? '' : loggedUser.phone}`
    }

    if (location.pathname === '/cart') {
        getCart().then(cart => {
            renderCart(cart.items)
        })
    }

    if (location.pathname === '/table-booking') {
        getTableReservations().then(bookings => {
            const previous = document.querySelector('.previous')
            const upcoming = document.querySelector('.upcoming')
            bookings.forEach(booking => {
                const d = new Date(booking.time)
                const li = document.createElement('li')
                li.innerHTML = `${d.toDateString()} ${d.toTimeString().split(' ')[0]} - ${booking.status}`
                
                if (d > Date.now()) {
                    upcoming.append(li)
                } else {
                    previous.append(li)
                }
            })
        })
    }

    if (location.pathname === '/orders') {
        getBlogs().then(blogs => {
            renderBlogs(blogs)
        })
    }
})

