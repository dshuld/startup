// Initialize the saves array if it doesn't already exist in local storage
if (!localStorage.getItem('saves')) {
    localStorage.setItem('saves', JSON.stringify([]));
}

function autosave(username, data) {
    const saves = JSON.parse(localStorage.getItem('saves'));
    const save = saves.find(s => s.username === username);
    const JSONdata = JSON.parse(data);
    if (save) {
        save.data = JSONdata;
    }
    else {
        saves.push({username:username, data:JSONdata});
    }
    localStorage.setItem('saves', JSON.stringify(saves));
}

function getSave(username) {
    const saves = JSON.parse(localStorage.getItem('saves'));
    const save = saves.find(u => u.username === username);
    return JSON.stringify(save.data);
}