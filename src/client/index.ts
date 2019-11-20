import Room from "./Room"

const load = async () => {
    console.log("are be")
    const chatRoom = new Room()
    chatRoom.poll()
}

document.addEventListener("DOMContentLoaded", () => {
    load()
})

