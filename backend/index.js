const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")

// Middleware
app.use(cors())
app.use(express.json())

// 
app.post("/add_all_inventory", async(req, res)=> {
    try{
        const {date} = req.body; 
        const sql = `INSERT INTO INVENTORY_MASTER_TIMELY (INVENTORY_ID,CREATED_DATE,LOCATION_,SHOP,DESCRIPTION,SYSTEM_PAR,PACK,SIZE,
            MEASUREMENT,UOM,CASE_,EA,LB,OZ,BAG,GAL,TRAY,SLEEVES,ON_HAND,OPEN_ORDERS,ADJUSTED_PAR,ORDER_,TOTAL_CASE) 
            SELECT INVENTORY_ID,'${date}' AS CREATED_DATE,LOCATION_,SHOP,DESCRIPTION,SYSTEM_PAR,PACK,SIZE,
            MEASUREMENT,UOM,CASE_,EA,LB,OZ,BAG,GAL,TRAY,SLEEVES,ON_HAND,OPEN_ORDERS,ADJUSTED_PAR,ORDER_,TOTAL_CASE 
            FROM INVENTORY_MASTER;`
        const run = await pool.query(sql);    
        res.json(run.rows[0])

    } catch (err) {
        console.error(err.message);
    }
})

app.get("/get_distinct_dates",async(req, res)=>{
    try {
        //const {date} = res.body;
        const sql = `SELECT DISTINCT TO_CHAR(CREATED_DATE::date, 'MM-DD-YYYY') AS DATE 
                     FROM INVENTORY_MASTER_TIMELY;`
        const run = await pool.query(sql);
        res.json(run);
    } catch(err) {
        console.error(err.message);
    }
})

app.get("/get_single_inventory_data/:inventory_id", async (req, res)=>{
    try {
        const {inventory_id} = req.params;
        const sql = `SELECT * 
                     FROM INVENTORY_MASTER_TIMELY 
                     WHERE INVENTORY_ID = '${inventory_id}' 
                     ORDER BY CREATED_DATE DESC;`
        const run = await pool.query(sql);
        res.json(run.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
})

app.put("/update_existing_inventory/:inventory_id/:date/:case_/:ea/:lb/:bag/:sleeves/:tray/:gal/:oz/:adjusted_par/:open_orders/:on_hand/:order_/:adjusted_order/:total_case",async(req,res)=>{
    try{
        const {inventory_id, date,case_,lb,bag,sleeves,tray,gal,oz,adjusted_par,ea, on_hand,open_orders, order_, adjusted_order, total_case} = req.params;
        console.log(inventory_id, date,case_,lb,bag,sleeves,tray,gal,oz,adjusted_par,ea, on_hand,open_orders, order_, adjusted_order, total_case)
        const sql = `UPDATE INVENTORY_MASTER_TIMELY 
                        SET open_orders = ${open_orders},
                            on_hand = ${on_hand},
                            adjusted_par = ${adjusted_par},
                            order_ = ${order_},
                            adjusted_order = ${adjusted_order},
                            case_=${case_},
                            lb = ${lb},
                            bag = ${bag},
                            sleeves = ${sleeves},
                            tray = ${tray},
                            gal = ${gal},
                            oz = ${oz},
                            ea = ${ea},
                            total_case = ${total_case},
                            updated_date = NOW()
                            WHERE INVENTORY_ID = '${inventory_id}' AND CREATED_DATE = '${date}';
        `
        const run = await pool.query(sql);
        res.json("Inventory Table was Updated")
    } catch(err) {
        console.log(err.message);
    }
})
app.listen(5000, ()=>{
    console.log("Server has started at Port 5000")
})
