
const daynightdiv = document.querySelector(".daynight-icon");
const selectbuttons = document.querySelectorAll(".select");
const inputbutton = document.querySelector(".input-button");
const input = document.querySelector(".input");
const taskpanel = document.querySelector(".task-panel");
const itemsleft = document.querySelector(".items-left");
const form = document.querySelector(".form");
const clearcompleted = document.querySelector(".clear-completed");
const selectcontainer = document.querySelector(".select-container");
const draganddrop = document.querySelector(".dragandrop");
const midcontainer = document.querySelector(".mid-container");
const background = document.body;
const active = document.querySelector(".active");
const inputcheckmark = document.querySelector(".input-checkmark");
const mobilepanel = document.querySelector(".select-container-mobile");

let numberOfBlueButtons = 0;
let isItDay = true;

const checkingIfLightOrDark = () => {
    if(background.classList.contains("dark")) {
        isItDay = false;
    } else {
        isItDay = true;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    changeDaylightTheme();
    setInterval(numberOfItemsLeft, 0);
    clickingOnInputButton();
    setInterval(checkingIfLightOrDark, 0);
})

const changeShowTasks = () => {
    selectbuttons.forEach(button => {
        button.addEventListener("click", (e) => {
            selectbuttons.forEach(btn => {
                btn.classList.remove("highlighted")
            }) 
            e.target.classList.add("highlighted");
        }) 
    })
}

changeShowTasks();

const addingTask = () => {
    if(input.value == 0) {
        input.placeholder = "You have to fill in a task...";
    } else {
        inputcheckmark.classList.add("visible");
        input.placeholder = "Create a new todo...";
        let task = document.createElement("div");
        task.classList.add("task");
        task.classList.add("active");
        task.setAttribute("id", "task")
        task.draggable = true;
        task.innerHTML = 
        `<div class="edit-panel">
        <div class="edit-button">
        <svg xmlns="http://www.w3.org/2000/svg" class="edit-checkmark hidden" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg></div>
        <div class="task-text">${input.value}</div>
         </div>
      <svg xmlns="http://www.w3.org/2000/svg" class="close-task-button hidden" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>`
        taskpanel.appendChild(task);
        let tasks = document.querySelectorAll(".task");
        let closebuttons = document.querySelectorAll(".close-task-button");
        let editbuttons = document.querySelectorAll(".edit-button");
        let tasktexts = document.querySelectorAll(".task-text");
        let checkmarks = document.querySelectorAll(".edit-checkmark");

        const hoverEffectsOnTasks = () => {
            for(let i = 0; i < tasks.length; i++) {
                tasks[i].onmouseover = () => {
                    closebuttons[i].classList.remove("hidden")
                }
                tasks[i].onmouseleave = () => {
                    closebuttons[i].classList.add("hidden")
                }
                editbuttons[i].onmouseover = () => {
                    editbuttons[i].classList.add("hovereffect");
                }
                editbuttons[i].onmouseleave = () => {
                    editbuttons[i].classList.remove("hovereffect");
                }
            }
        }

        const dragEnter = (e) => {
            e.preventDefault();
            if(e.target.classList.contains("task")) {
                e.target.classList.add("drag-over")
            }
        }

        const dragOver = (e) => {
            e.preventDefault();
            if(e.target.classList.contains("task")) {
                e.target.classList.add("drag-over")
            }
        }

        const dragLeave = (e) => {
            if(e.target.classList.contains("task")) {
                e.target.classList.remove("drag-over")
            }
        }

        tasks.forEach(task => {
            task.addEventListener("dragstart", () => {
                setTimeout(() => task.classList.add("dragging"), 0);
            });
            task.addEventListener("dragend", () => task.classList.remove("dragging"));
        })

        const sortableListInit = (e) => {
            e.preventDefault();
            if(e.target.classList.contains("task")) {
                e.target.classList.remove("drag-over")
            }
            const draggingitem = document.querySelector(".dragging");
            let siblings = [...taskpanel.querySelectorAll(".task:not(.dragging)")]
            let nextSibling = siblings.find(sibling => {
                return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
            })
            taskpanel.insertBefore(draggingitem, nextSibling)
        }
        taskpanel.addEventListener("drop", sortableListInit);
        taskpanel.addEventListener("dragover", dragOver);
        taskpanel.addEventListener("dragenter", dragEnter) 
        taskpanel.addEventListener("dragleave", dragLeave)

        const clickingOnTaskButtons = () => {
            for(let i = 0; i < tasks.length; i++) {
                editbuttons[i].onclick = () => {
                    checkmarks[i].classList.toggle("hidden")
                    editbuttons[i].classList.toggle("taskcompleted");
                    tasks[i].classList.toggle("completed");
                    tasks[i].classList.toggle("active");
                    tasktexts[i].classList.toggle("text-completed");
                }
                closebuttons[i].onclick = () => {
                    taskpanel.removeChild(tasks[i])
                }

            }
        }

        const showTasksDependingOnButton = () => {
            selectbuttons.forEach(button => {
                if(button.classList.contains("highlighted")) {
                    tasks.forEach(task => {
                        if(button.innerHTML == "Active") {
                            if(task.classList.contains("completed")) {
                                task.style.display = "none";
                            }
                            if(task.classList.contains("active")) {
                                task.style.display = "flex";
                            }
                        } else if(button.innerHTML == "All") {
                            task.style.display = "flex";
                        } else if(button.innerHTML == "Completed") {
                            if(task.classList.contains("completed")) {
                                task.style.display = "flex";
                            }
                            if(task.classList.contains("active")) {
                                task.style.display = "none";
                            }
                        }
                    })
                 
                }
            })
        }

        const changingTaskColorsIfDark = () => {
            if(isItDay === true) {
                tasks.forEach((item) => {
                    item.style.backgroundColor = "#FFFFFF";  
                    item.style.border = "1px solid #E3E4F1";
                    item.style.color = "#494C6B";
                })
            } else if(isItDay === false) {
                tasks.forEach((item) => {
                    if(item.classList.contains("completed")) {
                        item.style.color = "#4D5067";
                    }
                    item.style.backgroundColor = "#25273D";
                    item.style.border = "1px solid #393A4B";
                    item.style.color = "#C8CBE7";
                })
            }
        }
   
        const removeCompletedTasks = () => {
        clearcompleted.onclick = () => {
            for(let i = 0; i < tasks.length; i++) {
            if(tasks[i].classList.contains("completed")) {
                if(tasks[i].parentNode === taskpanel) {
                    console.log(tasks[i].parentNode)
                    taskpanel.removeChild(tasks[i])
                }
           
            } 
        }
        }
    }

    clickingOnTaskButtons();
    hoverEffectsOnTasks();
    removeCompletedTasks();
    setInterval(showTasksDependingOnButton, 0);
    setInterval(changingTaskColorsIfDark, 0);
    }
}


const clickingOnInputButton = () => {
    inputbutton.addEventListener("click", addingTask); 
}

const numberOfItemsLeft = () => {
    const tasksleft = taskpanel.childElementCount;
    itemsleft.innerHTML = `${tasksleft} items left`
}

const changeDaylightTheme = () => {
    daynightdiv.onclick = () => {
        const daynighticon = document.querySelector(".daynight-icon svg");
        background.classList.toggle("dark");
        form.classList.toggle("darkpanel");
        selectcontainer.classList.toggle("darkpanel");
        draganddrop.classList.toggle("darktext");
        midcontainer.classList.toggle("darkpanel");
        input.classList.toggle("darktheme");
        inputbutton.classList.toggle("darkborder");
        mobilepanel.classList.toggle("darkpanel");
        if(daynighticon.classList.contains("moon")) {
            daynightdiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="sun" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>`
        } else if(daynighticon.classList.contains("sun")){
            daynightdiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="moon" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>`
           
        }
    }
}

