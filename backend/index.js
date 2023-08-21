const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");

// Middleware
app.use(cors());
app.use(express.json());

app.use("/auth", require("./jwtAuth.js"));
// Add all inventory timely
app.post("/add_all_inventory/:date", async (req, res) => {
  try {
    const { date } = req.params;
    const day_of_month = new Date(date).getDate();
    const day_of_week = new Date(date).getDay();
    const sql = `INSERT INTO INVENTORY_MASTER_TIMELY (INVENTORY_ID,CREATED_DATE,LOCATION_,SHOP_NAME,DESCRIPTION,SYSTEM_PAR,PACK,SIZE,
            MEASUREMENT,UOM,CASE_,EA,LB,OZ,BAG,GAL,TRAY,SLEEVES,OPEN_ORDERS,ADJUSTED_PAR,ADJUSTED_ORDER,ORDER_,TOTAL_CASE,
            SHOP_ID,UNLOCK, WEEK_DATE, MONTH_DATE) SELECT INVENTORY_ID,'${date}' AS CREATED_DATE,LOCATION_,SHOP_NAME,DESCRIPTION,
            SYSTEM_PAR,PACK,SIZE, MEASUREMENT,UOM,CASE_,EA,LB,OZ,BAG,GAL,TRAY,SLEEVES,OPEN_ORDERS,ADJUSTED_PAR,ADJUSTED_ORDER,ORDER_,
            TOTAL_CASE, SHOP_ID,UNLOCK, DATE '${date}' - ${day_of_week} + 1,DATE '${date}' - ${day_of_month} + 1
            FROM INVENTORY_MASTER RETURNING 'TRUE' AS IS_SUCCESS;`;
    const run = await pool.query(sql);
    res.json(run.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/get_distinct_dates", async (req, res) => {
  try {
    //const {date} = res.body;
    const sql = `SELECT DISTINCT TO_CHAR(CREATED_DATE::date, 'MM-DD-YYYY') AS DATE 
                     FROM INVENTORY_MASTER_TIMELY;`;
    const run = await pool.query(sql);
    res.json(run.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/get_year/:date", async (req, res) => {
  try {
    const {date} = req.params;
    console.log(date)
    const sql = `SELECT DISTINCT DATE_PART('YEAR', CREATED_DATE::date) AS YEAR FROM INVENTORY_MASTER_TIMELY WHERE 
    DATE_PART('YEAR', CREATED_DATE::date)=DATE_PART('YEAR', '${date}'::date);`;
    const run = await pool.query(sql);
    console.log(run.rows[0])
    res.json(run.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/get_distinct_shops/:date/:shop", async (req, res) => {
  try {
    const { date, shop } = req.params;
    const sql = `SELECT DISTINCT SHOP_ID, SHOP_NAME
                     FROM INVENTORY_MASTER_TIMELY where CREATED_DATE = ${date} SHOP_ID = ${shop};`;
    const run = await pool.query(sql);
    res.json(run.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/get_inventory_data/:date", async (req, res) => {
  try {
    const { date } = req.params;
    const sql = `SELECT * FROM 
                     INVENTORY_MASTER_TIMELY WHERE CREATED_DATE = '${date}' ORDER BY INVENTORY_ID;`;
    const run = await pool.query(sql);
    const returnVal = run.rows
    res.json(returnVal);
  } catch (err) {
    console.log(err.message);
  }
});
app.get("/get_single_inventory_data/:inventory_id", async (req, res) => {
  try {
    const { inventory_id } = req.params;
    const sql = `SELECT * 
                     FROM INVENTORY_MASTER_TIMELY 
                     WHERE INVENTORY_ID = '${inventory_id}' 
                     ORDER BY CREATED_DATE DESC;`;
    const run = await pool.query(sql);
    res.json(run.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

app.put(
  "/update_existing_inventory/:inventory_id",
  async (req, res) => {
    try {
      const {inventory_id} = req.params;
      const {
        date,
        case_,
        lb,
        bag,
        sleeves,
        tray,
        gal,
        oz,
        adjusted_par,
        ea,
        open_orders,
        order_,
        adjusted_order,
        total_case,
        sales,
        yield
      } = req.body;
      const sql = `UPDATE INVENTORY_MASTER_TIMELY 
                        SET open_orders = ${open_orders},
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
                            sales = ${sales},
                            total_case = ${total_case},
                            yield = ${yield},
                            updated_date = NOW()
                            WHERE INVENTORY_ID = '${inventory_id}' AND CREATED_DATE = '${date}';
        `;
      const run = await pool.query(sql);
      res.json("Inventory Table was Updated");
    } catch (err) {
      console.log(err.message);
    }
  }
);
app.listen(5000, () => {
  console.log("Server has started at Port 5000");
});
