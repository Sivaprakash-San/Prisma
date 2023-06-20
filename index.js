const express = require("express");
const app = express();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.json());

app.get('/:id', async(req, res) => {
    const id = req.params.id;
    const user = await prisma.Users.findUnique({
        where:{
            id: id
        },
    })
    res.json(user);
});

app.post('/', async(req, res) => {
    const newUser = await prisma.Users.create({
        data: req.body
    })
    res.json(newUser);
});

app.put('/:id', async(req, res) => {
    const id = req.params.id;
    const newData = req.body.gender;
    const updatedUser = await prisma.Users.update({
        where:{
            id: id
        },
        data:{
            gender: newData
        }
    })
    res.json(updatedUser);
});

app.delete('/:id', async(req, res) => {
    const id = req.params.id;
    const deletedUser = await prisma.Users.delete({
        where:{
            id: id
        },
    })
    res.json(deletedUser);
});

app.listen(3001, () => {
    console.log("Running");
});