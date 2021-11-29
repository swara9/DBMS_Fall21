module.exports = {
    "getStockHistory" : "SELECT sh_date, round(open, 2), round(high,2), round(low, 2), round(close,2) \
     FROM STOCK_HISTORY_WEEKLY where ISIN='${ISIN}' ORDER BY sh_date ASC"
}