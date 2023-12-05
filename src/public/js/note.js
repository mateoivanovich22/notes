
document.addEventListener('DOMContentLoaded', () => {
    const loadingContainer = document.querySelector('.loader');
    const noteCard = document.querySelector('.page');
    const editButton = document.querySelector('.edit-button');
    const deleteButton = document.querySelector('.delete-button');
    const title = document.querySelector("h2");
    const description = document.querySelector(".note-description");
    const saveButton = document.querySelector(".save-button");
    const cancelButton = document.querySelector(".cancel-button");
    const noteId = document.querySelector(".note-id").textContent;
    const alertDelete = document.querySelector(".notifications-container")
    const botonAlertDelete = document.querySelector(".bin")
    const buttonReturnHome = document.querySelector(".buttonReturnHome")
    const containerButtonHome = document.querySelector(".containerButtonHome")
    const titleNote = document.querySelector(".titleNote")


    setTimeout(() => {
        containerButtonHome.style.display = "flex";
        titleNote.style.display = "flex";
        loadingContainer.style.display = 'none'; 
        editButton.style.display = 'flex'; 
        deleteButton.style.display = 'flex'; 
        noteCard.style.display = 'block'; 
    }, 2000); 

    buttonReturnHome.addEventListener('click', () => {
        window.location.href = '/notes';
    })

    function registerEventHandlers() {

        deleteButton.addEventListener("click", (event) => {
            event.preventDefault();
            deleteButton.style.display = 'none';
            editButton.style.display = 'none';
            alertDelete.style.display = 'flex'; 
        
        })

        botonAlertDelete.addEventListener('click', async (event) => {
            event.preventDefault();

            const response = await fetch(`/notes/delete/${noteId}`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            window.location.href = "/notes"

        })

        editButton.addEventListener("click", () => {
            title.contentEditable = "true";
            description.contentEditable = "true";
            saveButton.style.display = "inline-block";
            cancelButton.style.display = "inline-block";
        });

        saveButton.addEventListener("click", async (event) => {
            event.preventDefault();
            title.contentEditable = "false";
            description.contentEditable = "false";
            saveButton.style.display = "none";
            cancelButton.style.display = "none";
            const noteTitle = document.querySelector(".note-title").textContent;
            const noteDescription = document.querySelector(".note-description").textContent

            const data = {
                title: noteTitle,
                description: noteDescription,
            };

            const response = await fetch(`/notes/noteUpdate/${noteId}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
        });

        cancelButton.addEventListener("click", () => {
            title.contentEditable = "false";
            description.contentEditable = "false";
            saveButton.style.display = "none";
            cancelButton.style.display = "none";
        });
    }

    registerEventHandlers();
});

