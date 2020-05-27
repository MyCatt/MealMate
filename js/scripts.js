const mealPopup = document.getElementById("expanded_meal") || undefined
const mealPopupUnderlay = document.getElementById("expanded_underlay") || undefined
const mealList = document.getElementById("order_grid") || undefined
const hamburger = document.getElementById("hamburger") || undefined
const primaryMenu = document.getElementById("primary_menu") || undefined
const exitExpanded = document.getElementById("exit_expanded") || undefined
const exitCart = document.getElementById("exit_cart") || undefined
const cart = document.getElementById("cart") || undefined
const mobileOpenCart = document.getElementById('mobile_cart_btn') || undefined
const openCart = document.getElementById("primary_menu--cart") || undefined
const confirmOrder = document.getElementById("confirm_order") || undefined
const order_confirmation_wrap = document.getElementById("order_confirmation_wrap") || undefined
const reviewOrder = document.getElementById("review_order_btn") || undefined
const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

hamburger.addEventListener('click', e => {
    primaryMenu.style.display = primaryMenu.style.display == "inline-block" ? "none" : "inline-block"
})

const menu = {
    size: 5,
    meals: {
        0: {name: "Chicken salad with carrots and cucumber", thumb: "assets/cards/thumb/1.jpg"},
        1: {name: "Creamy pumpkin and chicken soup", thumb: "assets/cards/thumb/2.jpg"},
        2: {name: "Fresh salad with watermelon", thumb: "assets/cards/thumb/3.jpg"},
        3: {name: "Blueberry pancakes served with a juice box", thumb: "assets/cards/thumb/4.jpg"},
        4: {name: "Salted Salmon with salad", thumb: "assets/cards/thumb/5.jpg"}
    }
}

//        5: {name: "Big mac combo hold the lettuce", thumb: "assets/cards/thumb/6.jpg"},
//        6: {name: "Chicken nuggets with fried cat", thumb: "assets/cards/thumb/7.jpg"},
//        7: {name: "Spongebob sandwich", thumb: "assets/cards/thumb/8.jpg"}

if(mealPopupUnderlay && mealPopup) {

    exitExpanded.addEventListener('click', e => {
        mealPopup.style.display = "none"
    })

    Object.keys(menu.meals).map((key, index) => {
        const components = menu.meals[index]
        const orderCard = document.createElement('div')
        orderCard.className = "order_card"
        const orderImg = document.createElement('div')
        orderImg.className = "order_img"
        orderImg.style.backgroundImage = `url(${components.thumb})`
        const orderTitle = document.createElement('h5')
        orderTitle.innerText = components.name

        const mealDate = document.createElement('h5')
        mealDate.innerText = day[index]
        mealDate.className = "meal_date"

        orderCard.appendChild(mealDate)
        orderCard.appendChild(orderImg)
        orderCard.appendChild(orderTitle)
        mealList.appendChild(orderCard)

        orderCard.addEventListener('click', () => {
            initiatePopup(index)
        })
    })

    mealPopupUnderlay.addEventListener('click', e => {
        if(mealPopup.style.display != "none") {
            mealPopup.style.display = "none"
        }
    })


    if(confirmOrder) {
        confirmOrder.addEventListener('click', () => {
            order_confirmation_wrap.style.display = "table"
        })

        reviewOrder.addEventListener('click', () => {
            order_confirmation_wrap.style.display = "none"
        })
    }else {
        openCart.addEventListener('click', () => {
            cart.style.display = "inline-block"
        })
    
        exitCart.addEventListener('click', () => {
            cart.style.display = "none"
        })
    
        mobileOpenCart.addEventListener('click', () => {
            cart.style.display = "inline-block"
        })
    }

}

const popupTitle = document.getElementById("popup_title")
const popupPreview = document.getElementById("preview")
const initiatePopup = id => {
    popupTitle.innerText = menu.meals[id].name
    popupPreview.style.backgroundImage = `url(${menu.meals[id].thumb})`
    mealPopup.style.display = "inline-block"
    window.scrollTo(0, 0)
}