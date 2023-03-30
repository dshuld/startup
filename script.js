if (!localStorage.getItem('friends')) {
    localStorage.setItem('friends', JSON.stringify([]));
}

if (!localStorage.getItem('messages')) {
    localStorage.setItem('messages', JSON.stringify([]));
}

function showPopup() {
    document.getElementById("popup-box").style.display = "block";
}

function hidePopup() {
    document.getElementById("popup-box").style.display = "none";
}

var userFriends = []
var friendsList = []

function addFriend(username) {
    var friendName = document.getElementById("username-input").value;
    friendsList.push(friendName);
    var found = userFriends.find(u => u.username === username);
    if(found) {
        found = {username, friendsList};
    }
    else {
        userFriends.push({username, friendsList});
    }
    localStorage.setItem('friends', JSON.stringify(userFriends));
    hidePopup();
    renderFriends();
}

function renderFriends() {
    var toRemove = document.querySelectorAll(".friends-list *")
    toRemove.forEach(element => {
        element.remove();
    });
    var friendsListElement = document.querySelector(".friends-list");
    friendsList.forEach(friend => {
        var newFriendElement = document.createElement("div");
        newFriendElement.classList.add("friend");
        newFriendElement.innerHTML = `
        <img src="res/friend.png"/>
        <p>${friend}</p>
        `;
        friendsListElement.appendChild(newFriendElement);
    });
    renderAddressBook();
}

function loadFriendData(username) {
    userFriends = JSON.parse(localStorage.getItem('friends'));
    const friends = userFriends.find(u => u.username === username);
    if (friends) {
        friendsList = friends.friendsList;
        renderFriends();
    }
}

function updateWidget() {
    const selector = document.getElementById('widget-select');
    var data;
    if(selector.value === 'Weather') {
        data = "Here is weather data.";
        renderWidget(data);
    }
    else if(selector.value === 'News') {
        data = "Here is news data.";
        renderWidget(data);
    }
    else {
        data = "Here is stock data.";
        renderWidget(data);
    }
}

function renderWidget(data) {
    const widget = document.querySelector('.widget');
    widget.innerHTML = `
    <div>${data}</div>
    `;
}

function renderAddressBook() {
    var toRemove = document.querySelectorAll("#addressee-selector *")
    toRemove.forEach(element => {
        element.remove();
    });
    const selector = document.getElementById('addressee-selector');
    friendsList.forEach(friend => {
        var newAddressee = document.createElement("option");
        newAddressee.innerHTML = friend;
        selector.appendChild(newAddressee);
    });
}

function sendMessage(username) {
    const selector = document.getElementById('addressee-selector');
    const msg = document.getElementById('message');
    var messages = JSON.parse(localStorage.getItem('messages'));
    messages.push({from:username, to:selector.value, message:msg.value});
    localStorage.setItem('messages', JSON.stringify(messages));
}

function displayMessages(username) {
    var toRemove = document.querySelectorAll("#message-items *")
    toRemove.forEach(element => {
        element.remove();
    });
    const inbox = document.getElementById('message-items');
    var messageList = JSON.parse(localStorage.getItem('messages')).filter(msg => msg.to === username);
    console.log(messageList);
    messageList.forEach(msg => {
        var newMsg = document.createElement("p");
        newMsg.innerHTML = msg.from + ": " + msg.message;
        inbox.appendChild(newMsg);
    });
}