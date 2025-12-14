let express = require('express')
let bodyParser = require('body-parser')

const app = express()

// ใช้งาน body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// สถานะ Server
app.get('/status', function (req, res) {
    res.send('Coffee Shop API is running...')
})

// ข้อมูลเมนูจำลอง
let menus = [
    { id: 1, name: "Latte", price: 55 },
    { id: 2, name: "Americano", price: 50 },
    { id: 3, name: "Cappuccino", price: 60 }
]

// GET: ดูเมนูทั้งหมด
app.get('/menus', function (req, res) {
    res.json(menus)
})

// GET: ดูเมนูตาม ID
app.get('/menu/:menuId', function (req, res) {
    const id = parseInt(req.params.menuId)
    const menu = menus.find(m => m.id === id)

    if (!menu) {
        return res.status(404).send("ไม่พบเมนูนี้")
    }

    res.json(menu)
})

// POST: เพิ่มเมนูใหม่
app.post('/menu', function (req, res) {
    const newMenu = {
        id: menus.length + 1,
        name: req.body.name,
        price: req.body.price
    }

    menus.push(newMenu)
    res.send("เพิ่มเมนูใหม่สำเร็จ: " + JSON.stringify(newMenu))
})

// PUT: แก้ไขเมนู
app.put('/menu/:menuId', function (req, res) {
    const id = parseInt(req.params.menuId)
    const menu = menus.find(m => m.id === id)

    if (!menu) {
        return res.status(404).send("ไม่พบเมนูที่ต้องการแก้ไข")
    }

    menu.name = req.body.name
    menu.price = req.body.price

    res.send("แก้ไขเมนูสำเร็จ: " + JSON.stringify(menu))
})

// DELETE: ลบเมนู
app.delete('/menu/:menuId', function (req, res) {
    const id = parseInt(req.params.menuId)
    menus = menus.filter(m => m.id !== id)

    res.send("ลบเมนูสำเร็จ ID: " + id)
})

let port = 8081
app.listen(port, function () {
    console.log('Coffee Shop API running on port ' + port)
})
