'MASTER TABLE'
CREATE TABLE INVENTORY_MASTER (
INVENTORY_ID varchar(255) PRIMARY KEY NOT NULL,
LOCATION_ varchar(255),
SHOP varchar(255),
DESCRIPTION varchar(255),
SYSTEM_PAR float(2),
PACK float(2),
SIZE float(2),
MEASUREMENT varchar(255),
UOM varchar(255),
CASE_ float(2),
EA float(2),
LB float(2),
OZ float(2),
BAG float(2),
GAL float(2),
TRAY float(2),
SLEEVES float(2),
ON_HAND float(2),
OPEN_ORDERS float(2),
ADJUSTED_PAR float(2),
ORDER_ float(2),
TOTAL_CASE float(2)
);

'MASTER TABLE GETS UPDATED WEEKLY/MONTHLY(FOR NEXT WEEK/MONTH) WITH 0 VALUED DATE '
CREATE TABLE INVENTORY_MASTER_TIMELY (
INVENTORY_ID varchar(255),
CREATED_DATE date,
LOCATION_ varchar(255),
SHOP varchar(255),
DESCRIPTION varchar(255),
SYSTEM_PAR float(2),
PACK float(2),
SIZE float(2),
MEASUREMENT varchar(255),
UOM varchar(255),
CASE_ float(2),
EA float(2),
LB float(2),
OZ float(2),
BAG float(2),
GAL float(2),
TRAY float(2),
SLEEVES float(2),
ON_HAND float(2),
OPEN_ORDERS float(2),
ADJUSTED_ORDER float(2),
ADJUSTED_PAR float(2),
ORDER_ float(2),
TOTAL_CASE float(2),
UPDATED_DATE date
);

'TO INSERT DATA INTO TIMELY TABLE'
INSERT INTO INVENTORY_MASTER_TIMELY (INVENTORY_ID,CREATED_DATE,LOCATION_,SHOP,DESCRIPTION,SYSTEM_PAR,PACK,SIZE,
            MEASUREMENT,UOM,CASE_,EA,LB,OZ,BAG,GAL,TRAY,SLEEVES,ON_HAND,OPEN_ORDERS,ADJUSTED_PAR,ORDER_,TOTAL_CASE) 
            SELECT INVENTORY_ID,'07/06/2023' AS CREATED_DATE,LOCATION_,SHOP,DESCRIPTION,SYSTEM_PAR,PACK,SIZE,
            MEASUREMENT,UOM,CASE_,EA,LB,OZ,BAG,GAL,TRAY,SLEEVES,ON_HAND,OPEN_ORDERS,ADJUSTED_PAR,ORDER_,TOTAL_CASE 
            FROM INVENTORY_MASTER;


SELECT DISTINCT TO_CHAR(CREATED_DATE::date, 'MM-DD-YYYY') AS DATE 
    FROM INVENTORY_MASTER_TIMELY;

'SELECT ALL DATA FOR A GIVEN ID'
SELECT * 
    FROM INVENTORY_MASTER_TIMELY 
    WHERE INVENTORY_ID = '${inventory_id}' 
    ORDER BY CREATED_DATE DESC;

'TO UPDATE DATA BASED ON FORM'
UPDATE INVENTORY_MASTER_TIMELY 
    SET open_orders = ${open_orders},
        on_hand = ${on_hand},
        adjusted_par = ${adjusted_par},
        order_ = ROUND(system_par - on_hand, 2),
        adjusted_order = ROUND(adjusted_par - onhand, 2),
        case_=${case_},
        lb = ${lb},
        bag = ${bag},
        sleeves = ${sleeves},
        tray = ${tray},
        gal = ${gal},
        oz = ${oz},
        ea = ${ea},
        total_case = CASE 
                        WHEN pack = 0 or pack is NULL THEN NULL
                        ELSE ROUND((${case_+lb+bag+tray+ea+oz+gal+sleeves})/pack, 2)
                        END,
        updated_date = NOW()
        WHERE INVENTORY_ID = ${inventory_id} AND CREATED_DATE = ${date};

'FOR AUTHENTICATION:'
CREATE TABLE USERS (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    supervisor VARCHAR(255) NOT NULL,
    store_name VARCHAR(255) NOT NULL,
    store_id VARCHAR(255) NOT NULL
);
