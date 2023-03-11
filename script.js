if (!localStorage.getItem('friends')) {
    localStorage.setItem('friends', JSON.stringify([]));
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
    userFriends.push({username, friendsList});
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
}

function loadFriendData(username) {
    const userFriends = JSON.parse(localStorage.getItem('friends'));
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