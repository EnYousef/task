let task = document.querySelector(".task");
let from = document.forms[0];
let tasks = document.querySelector(".tasks");

if (localStorage.getItem("task") == null) {
    localStorage.setItem("task", JSON.stringify([]));
} else {
    let all = JSON.parse(localStorage.getItem("task"));
    all = all.reverse();
    for (let index = 0; index < all.length; index++) {
        const element = all[index];
        addTask(element.content, true, element.id);
    }
}
from.onsubmit = function (e) {
    e.preventDefault();
    if (task.value.length >= 3) {
        addTask(task.value, false);
        task.value = "";
    }
    else {
        alert("most at least 3 Character")
    }
};
function addTask(val, onlyAdd, id) {
    let all = JSON.parse(localStorage.getItem("task"));
    let child = document.createElement("div");
    child.className = "child";
    let h4 = document.createElement("h4");
    let del = document.createElement("button");
    let hid = document.createElement("input");
    hid.type = "hidden";
    del.className = "del";
    del.innerHTML = "حذف";
    h4.textContent = val;

    child.append(h4, del, hid);
    del.addEventListener("click", function (Event) {
        deleteTask(+Event.currentTarget.nextElementSibling.value);
    })
    tasks.prepend(child);
    if (onlyAdd) {
        hid.value = id;
    }
    if (!onlyAdd) {
        if (all.length > 0) {
            all.unshift({ content: val, id: all[0].id + 1 });
            hid.value = all[all.length - 1].id + 1;
            localStorage.setItem("task", JSON.stringify(all));
        }
        else {
            all.unshift({ content: val, id: 1 });
            hid.value = 1;
            localStorage.setItem("task", JSON.stringify(all));
        }
    }
}
function deleteTask(id) {
    let all = JSON.parse(localStorage.getItem("task"));
    all = all.filter(e => e.id !== id);
    localStorage.setItem("task", JSON.stringify(all));
    let ch = document.querySelector(".tasks");
    ch.innerHTML = "";
    all = all.reverse();
    for (let index = 0; index < all.length; index++) {
        const element = all[index];
        addTask(element.content, true, element.id);
    }
}
