const users = []

const addUser = ({ id, username, room }) => {
    //clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //data validation
    if (!username || !room) {
        return {
            error: "You need to provide username and room!"
        }
    }

    //how to check for already existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    }) 
    //username validation
    if (existingUser) {
        return{
            error: "This username already exists!"
        }
    }

    //how to store users
    const user = {id, username, room}
    users.push(user)
    return {user}
}

const removeUser = (id)=>{
    const index = users.findIndex((user)=>{
        return user.id === id
    })

    if (index !== -1) {
        //removing users from array by targeting id
       return users.splice(index, 1)[0]
    }
}

//get user by id
const getUser = (id)=>{
    return users.find((user)=> user.id === id)
}

//get user from room
const getUsersInRoom = (room)=>{
    room = room.trim().toLowerCase()
    return users.filter((user)=> user.room === room)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}

//dummy code for testing purposes
//
// addUser({
//     id: 22,
//     username: "Zheni",
//     room: "Roskilde"
// })

// addUser({
//     id: 12,
//     username: "David",
//     room: "Roskilde"
// })

// addUser({
//     id: 32,
//     username: "Zheni",
//     room: "Copenhagen"
// })

// const user = getUser(126)
// console.log(user)

// const userList = getUsersInRoom("Odense")
// console.log(userList)

// console.log(users)

// const removedUser = removeUser(22)
// console.log(removedUser)
// console.log(users)

// const res = addUser({
//     id:33,
//     username: "Zheni",
//     room: "Roskilde",
// })

// console.log(res)