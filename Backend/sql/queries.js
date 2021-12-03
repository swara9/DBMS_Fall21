module.exports = {
    getStockHistory : "SELECT sh_date, round(open, 2), round(high,2), round(low, 2), round(close,2) \
     FROM STOCK_HISTORY_WEEKLY where ISIN='${ISIN}' ORDER BY sh_date ASC",


    percent_change : "select pch.sh_date, ROUND(AVG(percent_change) OVER(ORDER BY sh_date ROWS BETWEEN 10 PRECEDING AND CURRENT ROW),3) as avg_change \
     FROM \
     (select ch.sh_date, \
     ch.close, \
     DECODE(rownum,1, 0, ROUND(change/LAG(close, 1, 0 ) OVER (ORDER BY sh_date)*100, 3)) as percent_change\
     FROM (select sh.*, Decode(rownum, 1, 0, close - LAG(close, 1, 0 ) OVER (ORDER BY sh_date))  as change\
         FROM (select sh_date, close from STOCK_HISTORY_WEEKLY where isin = '${ISIN}' order by sh_date) sh) ch) pch",

    RSI: "SELECT rs.sh_date,\
    ROUND(100-(100/(1+RS)),2) AS RSI\
    FROM \
    (SELECT avg.*, \
    ROUND(DECODE(AVG_LOSS, 0, 0, AVG_GAIN/AVG_LOSS),2) AS RS \
    FROM \
    (select gl.*, \
    DECODE(SIGN(rownum-15), -1, 0, ROUND(AVG(Gain) OVER(ORDER BY sh_date ROWS BETWEEN 14 PRECEDING AND CURRENT ROW),3)) AS AVG_GAIN, \
    DECODE(SIGN(rownum-15), -1, 0, ROUND(AVG(Loss) OVER(ORDER BY sh_date ROWS BETWEEN 14 PRECEDING AND CURRENT ROW),3)) AS AVG_LOSS \
    from \
    (select ch.*, \
        Decode(SIGN(change), -1, 0, change) as Gain, \
        Decode(SIGN(change), -1, -change, 0) as Loss \
        FROM \
        ( select sh.*, \
            Decode(rownum, 1, 0, close - LAG(close, 1, 0 ) OVER (ORDER BY sh_date)) as change \
            from (select sh_date, close from stock_history_weekly where isin = 'US0185811082' order by sh_date) sh) ch) gl) avg) rs",

    OBV: "select sh_date, obv \
    FROM \
    ( select sh_date, close, volume from stock_history_weekly where isin = '${ISIN}' order by sh_date) sh\
    model \
         dimension by ( row_number() over (order by sh_date) rn )\
         measures ( sh_date, close, volume, 0 obv)\
         rules (  \
           obv[any] = CASE \
                       WHEN (close[cv()]>close[cv()-1]) \
                       THEN (obv[cv()-1] + volume[cv()])\
                       WHEN (close[cv()]<close[cv()-1]) \
                       THEN (obv[cv()-1] - volume[cv()])\
                       ELSE  nvl(obv[cv()-1], 0)\
                       END,\
           obv[1] = volume[cv()]\
           )\
       order by sh_date",

    MACD: "select * from\
    (SELECT macd.sh_date, macd.macd, DECODE(SIGN(rownum-26), -1, 0, ROUND(AVG(MACD) OVER(ORDER BY sh_date ROWS BETWEEN 9 PRECEDING AND CURRENT ROW),3)) AS signal FROM \
       (SELECT ema.*, DECODE(SIGN(rownum-26), -1, 0, ema12-ema26) as MACD  FROM\
           (select sh_date, close, sma12, sma26, round(ema12,3) as ema12, round(ema26, 3) as ema26\
           from   (select sh.*,\
               DECODE(SIGN(rownum-12), -1, 0, ROUND(AVG(CLOSE) OVER(ORDER BY sh_date ROWS BETWEEN 12 PRECEDING AND CURRENT ROW),3)) AS SMA12,\
               DECODE(SIGN(rownum-26), -1, 0, ROUND(AVG(CLOSE) OVER(ORDER BY sh_date ROWS BETWEEN 26 PRECEDING AND CURRENT ROW),3)) AS SMA26\
               from\
               (select sh_date, close from stock_history_weekly where isin = '${ISIN}' order by sh_date) sh) sma\
           model \
             dimension by ( row_number() over (order by sh_date) rn )\
             measures ( sh_date, close, sma12, sma26, close ema12, close ema26)\
             rules (  \
               ema12[any] = NVL2(((close[cv()]*2/13)+(ema12[cv()-1]*(1-(2/13)))), ((close[cv()]*2/13)+(ema12[cv()-1]*(1-(2/13)))), 0),\
               ema12[12] = sma12[cv()],\
               ema26[any] = NVL2(((close[cv()]*2/27)+(ema26[cv()-1]*(1-(2/27)))), ((close[cv()]*2/27)+(ema26[cv()-1]*(1-(2/27)))), 0),\
               ema26[26] = sma26[cv()]\
           )) ema) macd) where macd <> 0 AND signal <> 0",

    AD: "SELECT sh_date, round(ad, 3) as ad\
    from \
        (select sh_date, open,close, high, low, volume \
        from stock_history_weekly where isin = '${ISIN}' order by sh_date) sh\
    model \
          dimension by ( row_number() over (order by sh_date) rn )\
          measures ( sh_date,open, close, high, low, volume, 0 ad, 0 mf)\
          rules (  \
            mf[any] = round(((close[cv()]- low[cv()])-(high[cv()]- close[cv()])/(high[cv()]-low[cv()])),3),\
            ad[any] = ((mf[cv()] * volume[cv()]) + nvl(ad[cv()-1], 0)),\
            ad[1] = (mf[cv()] * volume[cv()])\
            )",

    getTrade: "select t.*, st.symbol from trade t, stocks st where SSN='${SSN}' and st.isin = t.isin",

    getTopStocks: "select * from stocks where symbol='AAPL' or symbol = 'GOOG' or symbol = 'AMZN'or symbol = 'NFLX' or symbol = 'FB' or symbol = 'MSFT' \
    or symbol = 'BAC' or symbol = 'EBAY' or symbol = 'TSLA' or symbol = 'CSCO' or symbol = 'WMT' or symbol = 'MCD' or symbol = 'TGT' or symbol = 'WFC'"
}