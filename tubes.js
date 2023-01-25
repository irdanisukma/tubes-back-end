const express = require('express')
const app = express()
const cors = require('cors')

const db = require('./config/db.js');
const User = require('./models/User.js');

app.get('/',(req, res)=>res.send('respon berhasil'));

// app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

db.authenticate().then(()=>
    console.log('berhasil terkoneksi') 
);


app.post('/tambah',async (req, res)=>{
    try {
        const{ id, nama, status, keluhan, handler } = req.body;

        const newUser = new User({
            id: 65+"",
            nama, 
            status, 
            keluhan,
            handler,
        })

        await newUser.save();

        res.json(newUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server eror')
    }
});

app.get('/ambil', async (req,res)=>{
    try {
        const getAllUser = await User.findAll({})

        res.json(getAllUser)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server eror')
    }
});

app.get('/ambil/:id', async (req,res)=>{
    try {
        const id = req.params.id

        const getUser = await User.findOne({
            where: {idpel:id}
        });

        res.json(getUser)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server eror')
    }
});

app.post('/hapus', async (req, res)=>{
    try {
        const id = req.body.idpel;
        console.log(id);

        const deleteUser = await User.destroy({
            where: { idpel:id }
        });

        await deleteUser;
        res.json("data berhasil dihapus")
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server eror')
    }
});

app.post('/ubah/:id', async (req,res)=>{
    try {
        const {idpel, nama, status, keluhan, handler} = req.body
        const id =  req.params.id;
        console.log(id);

        const updateUser = await User.update({
            idpel,
            nama,
            status,
            keluhan,
            handler
        },{where: {idpel:id}});

        await updateUser;

        res.json("berhasil di update")
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server eror')
    }
});

app.listen(4500, () => console.log('port berjalan di 4500'))