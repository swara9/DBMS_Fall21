module.exports = {
    "getStockHistory" : "SELECT sh_date, round(open, 2), round(high,2), round(low, 2), round(close,2) \
     FROM STOCK_HISTORY_WEEKLY where ISIN='${ISIN}' ORDER BY sh_date ASC",


     "percent_change" : "select pch.sh_date, ROUND(AVG(percent_change) OVER(ORDER BY sh_date ROWS BETWEEN 10 PRECEDING AND CURRENT ROW),3) as avg_change \
     FROM \
     (select ch.sh_date, \
     ch.close, \
     DECODE(rownum,1, 0, ROUND(change/LAG(close, 1, 0 ) OVER (ORDER BY sh_date)*100, 3)) as percent_change\
     FROM (select sh.*, Decode(rownum, 1, 0, close - LAG(close, 1, 0 ) OVER (ORDER BY sh_date))  as change\
         FROM (select sh_date, close from STOCK_HISTORY_WEEKLY where isin = '${ISIN}' order by sh_date) sh) ch) pch"

    
}