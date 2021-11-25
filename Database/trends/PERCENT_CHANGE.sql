--compute change
select sh.*, Decode(rownum, 1, 0, close - LAG(close, 1, 0 ) OVER (ORDER BY sh_date))  as change
from (select sh_date, close from stock_history where isin = 'US0185811082' order by sh_date) sh;

--percent change
select ch.sh_date, 
    ch.close, 
    DECODE(rownum,1, 0, ROUND(change/LAG(close, 1, 0 ) OVER (ORDER BY sh_date)*100, 3)) as percent_change
    FROM (select sh.*, Decode(rownum, 1, 0, close - LAG(close, 1, 0 ) OVER (ORDER BY sh_date))  as change
        FROM (select sh_date, close from stock_history where isin = 'US0185811082' order by sh_date) sh) ch;
        
select pch.*, 
    ROUND(AVG(percent_change) OVER(ORDER BY sh_date ROWS BETWEEN 10 PRECEDING AND CURRENT ROW),3) as avg_change
    FROM
    (select ch.sh_date, 
    ch.close, 
    DECODE(rownum,1, 0, ROUND(change/LAG(close, 1, 0 ) OVER (ORDER BY sh_date)*100, 3)) as percent_change
    FROM (select sh.*, Decode(rownum, 1, 0, close - LAG(close, 1, 0 ) OVER (ORDER BY sh_date))  as change
        FROM (select sh_date, close from stock_history where isin = 'US0185811082' order by sh_date) sh) ch) pch;

