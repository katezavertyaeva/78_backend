function repo() {
    console.log("Repo")
}

function service() {
    console.log("Service")
    const val = Math.random();
    if (val > 0.5) {
        console.log(val)
        throw new Error("Service error")
    }
    console.log(val)
    repo()
}

function controller() {
    console.log("Controller")
    try {
        service()
        console.log("Ошибки не произошло")
    } catch (error) {
        console.log(error)
    }

}

function finish() {
    console.log("Finish")
}

controller()
finish()
