select * from stock_history;
select * from stocks order by symbol;

select sh_date, close,rownum from (select SH_DATE, close from stock_history where isin = 'US0185811082' order by sh_date);

--compute change
select sh.*, Decode(rownum, 1, 0, close - LAG(close, 1, 0 ) OVER (ORDER BY sh_date))  as change
from (select sh_date, close from stock_history where isin = 'US0185811082' order by sh_date) sh;

--Gain, Loss
select ch.*,
    Decode(SIGN(change), -1, 0, change) as Gain,
    Decode(SIGN(change), -1, change, 0) as Loss,
    rownum
    FROM
    ( select sh.*, 
    Decode(rownum, 1, 0, close - LAG(close, 1, 0 ) OVER (ORDER BY sh_date)) as change    
    from (select sh_date, close from stock_history where isin = 'US0185811082' order by sh_date) sh) ch;
    
--AVG_GAIN AND AVG_LOSS
select gl.*,
    DECODE(SIGN(rownum-15), -1, 0, ROUND(AVG(Gain) OVER(ORDER BY sh_date ROWS BETWEEN 14 PRECEDING AND CURRENT ROW),3)) AS AVG_GAIN,
    DECODE(SIGN(rownum-15), -1, 0, ROUND(AVG(Loss) OVER(ORDER BY sh_date ROWS BETWEEN 14 PRECEDING AND CURRENT ROW),3)) AS AVG_LOSS
    from
    (select ch.*,
        Decode(SIGN(change), -1, 0, change) as Gain,
        Decode(SIGN(change), -1, -change, 0) as Loss
        FROM
        ( select sh.*, 
            Decode(rownum, 1, 0, close - LAG(close, 1, 0 ) OVER (ORDER BY sh_date)) as change    
            from (select sh_date, close from stock_history where isin = 'US0185811082' order by sh_date) sh) ch) gl;
  
--RS          
SELECT avg.*,
    ROUND(DECODE(AVG_LOSS, 0, 0, AVG_GAIN/AVG_LOSS),2) AS RS
    FROM
    (select gl.*,
    DECODE(SIGN(rownum-15), -1, 0, ROUND(AVG(Gain) OVER(ORDER BY sh_date ROWS BETWEEN 14 PRECEDING AND CURRENT ROW),3)) AS AVG_GAIN,
    DECODE(SIGN(rownum-15), -1, 0, ROUND(AVG(Loss) OVER(ORDER BY sh_date ROWS BETWEEN 14 PRECEDING AND CURRENT ROW),3)) AS AVG_LOSS
    from
    (select ch.*,
        Decode(SIGN(change), -1, 0, change) as Gain,
        Decode(SIGN(change), -1, -change, 0) as Loss
        FROM
        ( select sh.*, 
            Decode(rownum, 1, 0, close - LAG(close, 1, 0 ) OVER (ORDER BY sh_date)) as change    
            from (select sh_date, close from stock_history where isin = 'US0185811082' order by sh_date) sh) ch) gl) avg;
            
--FINAL QUERY RSI
SELECT rs.*,
    ROUND(100-(100/(1+RS)),2) AS RSI
    FROM
    (SELECT avg.*,
    ROUND(DECODE(AVG_LOSS, 0, 0, AVG_GAIN/AVG_LOSS),2) AS RS
    FROM
    (select gl.*,
    DECODE(SIGN(rownum-15), -1, 0, ROUND(AVG(Gain) OVER(ORDER BY sh_date ROWS BETWEEN 14 PRECEDING AND CURRENT ROW),3)) AS AVG_GAIN,
    DECODE(SIGN(rownum-15), -1, 0, ROUND(AVG(Loss) OVER(ORDER BY sh_date ROWS BETWEEN 14 PRECEDING AND CURRENT ROW),3)) AS AVG_LOSS
    from
    (select ch.*,
        Decode(SIGN(change), -1, 0, change) as Gain,
        Decode(SIGN(change), -1, -change, 0) as Loss
        FROM
        ( select sh.*, 
            Decode(rownum, 1, 0, close - LAG(close, 1, 0 ) OVER (ORDER BY sh_date)) as change    
            from (select sh_date, close from stock_history_weekly where isin = 'US0185811082' order by sh_date) sh) ch) gl) avg) rs;
            
--rsi check
SELECT MIN(RSI) from 
    (SELECT 
    ROUND(100-(100/(1+RS)),2) AS RSI
    FROM
    (SELECT avg.*,
    ROUND(DECODE(AVG_LOSS, 0, 0, AVG_GAIN/AVG_LOSS),2) AS RS
    FROM
    (select gl.*,
    DECODE(SIGN(rownum-15), -1, 0, ROUND(AVG(Gain) OVER(ORDER BY sh_date ROWS BETWEEN 14 PRECEDING AND CURRENT ROW),3)) AS AVG_GAIN,
    DECODE(SIGN(rownum-15), -1, 0, ROUND(AVG(Loss) OVER(ORDER BY sh_date ROWS BETWEEN 14 PRECEDING AND CURRENT ROW),3)) AS AVG_LOSS
    from
    (select ch.*,
        Decode(SIGN(change), -1, 0, change) as Gain,
        Decode(SIGN(change), -1, -change, 0) as Loss
        FROM
        ( select sh.*, 
            Decode(rownum, 1, 0, close - LAG(close, 1, 0 ) OVER (ORDER BY sh_date)) as change    
            from (select sh_date, close from stock_history where isin = 'US0185811082' order by sh_date) sh) ch) gl) avg) rs)
WHERE RSI <> 0;
    
--SELECT x.*, ABS (LTMA-STMA) DIFFERENCE
--FROM
--(
--  SELECT SDATE, PAYLOAD,
--         AVG(PAYLOAD) OVER (ORDER BY SDATE rows BETWEEN 14 PRECEDING AND CURRENT ROW) STMA,
--         AVG(PAYLOAD) OVER (ORDER BY SDATE rows BETWEEN 90 PRECEDING AND CURRENT ROW) LTMA
--  FROM
--  (
--    SELECT a.SDATE, SUM(a.PAYLOAD) PAYLOAD
--    FROM TABLE_PAYLOAD a
--    WHERE a.SDATE  > sysdate - 3 * 365      
--    GROUP BY a.SDATE
--  )
--) x
--ORDER BY SDATE;