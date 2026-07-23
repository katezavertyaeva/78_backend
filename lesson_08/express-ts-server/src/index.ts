import app from "./app";

// Порт, через который открывается наше приложение
const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT} http://localhost:${PORT}`);
})