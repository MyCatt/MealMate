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
const addCart = document.getElementById("add_btn") || undefined
const confirmOrder = document.getElementById("confirm_order") || undefined
const order_confirmation_wrap = document.getElementById("order_confirmation_wrap") || undefined
const reviewOrder = document.getElementById("review_order_btn") || undefined
const largeTextSearch = document.getElementById('large_text_search') || undefined
const fillTable = document.getElementById('list_table')
const sideMenuButton = document.getElementById("show_menu") || undefined
const sideMenu = document.getElementById("side_navigation") || undefined
const popupTitle = document.getElementById("popup_title") || undefined
const popupPreview = document.getElementById("preview") || undefined
const cartContain = document.getElementById("item-wrap") || undefined
const chatOpen = document.getElementById("chat_tab") || undefined
const chatWindow = document.getElementById("chat_window") || undefined
const exitChat = document.getElementById("exit_chat") || undefined
const submitMsg = document.getElementById("submit_msg") || undefined
const msgInput = document.getElementById("chat_input") || undefined
const accountForm = document.getElementById("account_edit_form") || undefined


const selectedDay = document.getElementById("day_select") || undefined

if(accountForm != undefined) {
    accountForm.addEventListener('submit', e => {
        e.preventDefault();
        order_confirmation_wrap.style.display = "table"
    })
    document.getElementById('review_order_btn').addEventListener('click', () => {
        order_confirmation_wrap.style.display = "none"
    })
}

if(chatOpen != undefined) {

    chatOpen.addEventListener('click', () => {
        chatWindow.style.display = "inline-flex"
        chatOpen.style.display = "none"
    })

    exitChat.addEventListener('click', () => {
        chatWindow.style.display = "none"
        chatOpen.style.display = "inline-grid"
    })

    submitMsg.addEventListener('click', () => {
        const message = document.createElement('div')
        message.className = "message self"
        const message_body = document.createElement('div')
        message_body.className = "message_child"
        message_body.innerText = msgInput.value
        message.appendChild(message_body)
        document.getElementById("chat_content").appendChild(message)
    })

}



const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

hamburger.addEventListener('click', e => {
    primaryMenu.style.display = primaryMenu.style.display == "inline-block" ? "none" : "inline-block"
})

const menu = {
    size: 5,
    opened: undefined,
    meals: {
        0: {name: "Chicken salad with carrots and cucumber", thumb: "assets/cards/thumb/1.jpg"},
        1: {name: "Creamy pumpkin and chicken soup", thumb: "assets/cards/thumb/2.jpg"},
        2: {name: "Fresh salad with watermelon", thumb: "assets/cards/thumb/3.jpg"},
        3: {name: "Blueberry pancakes served with a juice box", thumb: "assets/cards/thumb/4.jpg"},
        4: {name: "Salted Salmon with salad", thumb: "assets/cards/thumb/5.jpg"}
    }
}

const initiatePopup = id => {
    popupTitle.innerText = menu.meals[id].name
    menu.opened = id
    popupPreview.style.backgroundImage = `url(${menu.meals[id].thumb})`
    mealPopup.style.display = "inline-block"
    window.scrollTo(0, 0)
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
        addCart.addEventListener('click', () => {
            cart.style.display = "inline-block"

            const cart_item = document.createElement('div')
            cart_item.classList.add('cart-item')
            const meal_day = document.createElement('p')
            meal_day.innerText = selectedDay.value
            cart_item.appendChild(meal_day)

            const meal_name = document.createElement('h4')
            meal_name.innerText = menu.meals[menu.opened].name
            cart_item.appendChild(meal_name)

            const remove_btn = document.createElement('button')
            remove_btn.innerText = "Remove"
            cart_item.appendChild(remove_btn)

            const edit_btn = document.createElement('button')
            edit_btn.innerText = "Edit"
            cart_item.appendChild(edit_btn)

            
            cartContain.appendChild(cart_item)
            mealPopup.style.display = "none"
        })
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

if(document.getElementById('manage')) {  //Manage page

    const searchTable = param => {
        const trChildren = fillTable.getElementsByTagName("tr");
        for (let i = 0; i < trChildren.length; i++) {
            const tdChildren = trChildren[i].getElementsByTagName("td")[0];
            if (tdChildren) {
            const tdValue = tdChildren.textContent || tdChildren.innerText;
            if (tdValue.toUpperCase().indexOf(param.toUpperCase()) > -1) {
                trChildren[i].style.display = "";
            } else {
                trChildren[i].style.display = "none";
            }
            }
        }
    }

    sideMenuButton.addEventListener('click', () => {
        sideMenu.style.display = sideMenu.style.display == "block" ? "none" : "block"
    })

    largeTextSearch.addEventListener('keyup', e => {
        searchTable(e.target.value)
    })

    const studentGenerator = quantity => {
        const mockData = {
            names: [
                "Abril", "Abbiegayle", "Abilard", "Abad", "Andrew",
                "Ben", "Bail", "Batya", "Beau", "Brian", "Bran",
                "Cadwell", "Caleb", "Cole", "Cadmus", "Calix", "Cafall",
                "Daily", "Dack", "Dabi", "Dalain", "Dahl", "Dalila",
                "Jack", "Jadee", "Jadin", "Jadera", "Jocheim", "Joenes",
                "Raffer", "Raff", "Radcliffe", "Radd", "Rania", "Rai",
                "Tann", "Taras", "Tallie", "Takara", "Taina", "Tallulah"
            ]
        }
        for(let i = 0; i < quantity; i++) {
            const random_f = Math.floor(Math.random() * 40)
            const random_l = Math.floor(Math.random() * 40)
            const random_year = Math.floor(Math.random() * 13) + 1
            const random_diet = Math.floor(Math.random() * 2)
            const randomChar = Math.floor(Math.random() * 26)

            const row = document.createElement('tr')
                    const id_row = document.createElement('td')
                    id_row.innerText = Math.floor(Math.random() * 44540723)
                    row.appendChild(id_row)
                const f_row = document.createElement('td')
                f_row.innerText = mockData.names[random_f]
                row.appendChild(f_row)
                const l_row = document.createElement('td')
                l_row.innerText = mockData.names[random_l]
                row.appendChild(l_row)
                const year_row = document.createElement('td')
                year_row.innerText = random_year
                row.appendChild(year_row)
                const form_row = document.createElement('td')
                form_row.innerText = random_year + 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.substring(randomChar, randomChar+1)
                row.appendChild(form_row)
                const diet_row = document.createElement('td')
                diet_row.innerText = random_diet == 1 ? "Yes" : "No"
                row.appendChild(diet_row)

                const account = document.createElement('td')
                account.style.width = '150px'
                const accountBtn = document.createElement('button')
                accountBtn.innerText = "Account Settings"
                accountBtn.addEventListener('click', () => {
                    window.open(
                        'account.html',
                        '_blank' // <- This is what makes it open in a new window.
                    )
                })
                account.appendChild(accountBtn)
                row.appendChild(account)

            fillTable.appendChild(row)
        }
    }
    studentGenerator(100)

}
if(document.getElementById('manage-history')) {  //Manage order history page
    const searchTable = param => {
        const trChildren = fillTable.getElementsByTagName("tr");
        for (let i = 0; i < trChildren.length; i++) {
            const tdChildren = trChildren[i].getElementsByTagName("td")[1];
            if (tdChildren) {
            const tdValue = tdChildren.textContent || tdChildren.innerText;
            if (tdValue.toUpperCase().indexOf(param.toUpperCase()) > -1) {
                trChildren[i].style.display = "";
            } else {
                trChildren[i].style.display = "none";
            }
            }
        }
    }
    largeTextSearch.addEventListener('keyup', e => {
        searchTable(e.target.value)
    })

    const orderGenerator = quantity => {
        const mockData = {
            names: [
                "Abril", "Abbiegayle", "Abilard", "Abad", "Andrew",
                "Ben", "Bail", "Batya", "Beau", "Brian", "Bran",
                "Cadwell", "Caleb", "Cole", "Cadmus", "Calix", "Cafall",
                "Daily", "Dack", "Dabi", "Dalain", "Dahl", "Dalila",
                "Jack", "Jadee", "Jadin", "Jadera", "Jocheim", "Joenes",
                "Raffer", "Raff", "Radcliffe", "Radd", "Rania", "Rai",
                "Tann", "Taras", "Tallie", "Takara", "Taina", "Tallulah"
            ]
        }
        for(let i = 0; i < quantity; i++) {
            const order_number = Math.floor(Math.random() * 10000000)
            const random_student = mockData.names[Math.floor(Math.random() * 40)] + " " + mockData.names[Math.floor(Math.random() * 40)]
            const random_date = new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).toLocaleDateString()

            const row = document.createElement('tr')
                const order_row = document.createElement('td')
                order_row.innerText = order_number
                row.appendChild(order_row)
                const name_row = document.createElement('td')
                name_row.innerText = random_student
                row.appendChild(name_row)
                const date_row = document.createElement('td')
                date_row.innerText = random_date
                row.appendChild(date_row)

                const mealid_row = document.createElement('td')
                mealid_row.innerText = order_number % 32
                row.appendChild(mealid_row)

                const tracking = document.createElement('td')
                tracking.style.width = '150px'
                const trackingBtn = document.createElement('button')
                trackingBtn.innerText = "Tracking Link"
                trackingBtn.addEventListener('click', () => {
                    window.open(
                        'tracking.html',
                        '_blank' // <- This is what makes it open in a new window.
                    )
                })
                tracking.appendChild(trackingBtn)
                row.appendChild(tracking)

            fillTable.appendChild(row)
        }
    }
    orderGenerator(100)
}


if(document.getElementById('meal-history')) {  //Manage meal history page
    const searchTable = param => {
        const trChildren = fillTable.getElementsByTagName("tr");
        for (let i = 0; i < trChildren.length; i++) {
            const tdChildren = trChildren[i].getElementsByTagName("td")[0];
            if (tdChildren) {
            const tdValue = tdChildren.textContent || tdChildren.innerText;
            if (tdValue.toUpperCase().indexOf(param.toUpperCase()) > -1) {
                trChildren[i].style.display = "";
            } else {
                trChildren[i].style.display = "none";
            }
            }
        }
    }
    largeTextSearch.addEventListener('keyup', e => {
        searchTable(e.target.value)
    })

    const orderGenerator = quantity => {
        const mockData = {
            names: [
                "Apple", "Cake", "Muffin", "Sandwich", "Wrap",
                "Lemon", "Steak", "Sausage", "Chicken", "Soup", "Pea",
                "Orange", "Avacado", "Human Meat", "Grandma", "Pork", "Apricot",
                "Kebab", "Juice Box", "Fish", "Stew", "Chips", "Grape",
                "Kumara", "Salad", "Tomato", "Lettuce", "Dressing", "Pumpkin",
                "Salt", "Pepper", "Biscuit", "Choc", "Burger", "Vegetarian"
            ]
        }
        for(let i = 0; i < quantity; i++) {
            const order_number = Math.floor(Math.random() * 1000)
            const random_student = mockData.names[Math.floor(Math.random() * 35)] + " " + mockData.names[Math.floor(Math.random() * 35)]
            const random_date = new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).toLocaleDateString()

            const row = document.createElement('tr')
                const order_row = document.createElement('td')
                order_row.innerText = order_number
                row.appendChild(order_row)
                const name_row = document.createElement('td')
                name_row.innerText = random_student
                row.appendChild(name_row)
                const date_row = document.createElement('td')
                date_row.innerText = mockData.names[Math.floor(Math.random() * 35)] + ", " +
                                     mockData.names[Math.floor(Math.random() * 35)] + ", " +
                                     mockData.names[Math.floor(Math.random() * 35)] + ", " +
                                     mockData.names[Math.floor(Math.random() * 35)] + ", " +
                                     mockData.names[Math.floor(Math.random() * 35)] + ", " +
                                     mockData.names[Math.floor(Math.random() * 35)] + ", " +
                                     mockData.names[Math.floor(Math.random() * 35)] + ", " +
                                     mockData.names[Math.floor(Math.random() * 35)] + ", " +
                                     mockData.names[Math.floor(Math.random() * 35)]
                row.appendChild(date_row)

                const vege_row = document.createElement('td')
                vege_row.innerText = order_number % 2 == 0 ? "Yes" : "No"
                row.appendChild(vege_row)

            fillTable.appendChild(row)
        }
    }
    orderGenerator(100)
}