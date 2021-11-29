-- Calculating MACD --

--RSI
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
            from (select sh_date, close from stock_history where isin = 'US0185811082' order by sh_date) sh) ch) gl) avg);
  
--sma          
select sh.*,
    DECODE(SIGN(rownum-26), -1, 0, ROUND(AVG(CLOSE) OVER(ORDER BY sh_date ROWS BETWEEN 26 PRECEDING AND CURRENT ROW),3)) AS SMA
    from
    (select sh_date, close from stock_history where isin = 'US0185811082' order by sh_date) sh;
    
    
select sh.sh_date, sh.close
from (select sh_date, close from stock_history where isin = 'US0185811082' order by sh_date) sh
model
    DIMENSION BY(sh_date)
    MEASURES(sh_date, close,  close ema)
    RULES(
        ema[any] = close[cv()]
--        ema[1] = close[]
    );
    
--ema12 and ema26
select sh_date, close, sma12, sma26, round(ema12,3) as ema12, round(ema26, 3) as ema26
from   (select sh.*,
    DECODE(SIGN(rownum-12), -1, 0, ROUND(AVG(CLOSE) OVER(ORDER BY sh_date ROWS BETWEEN 12 PRECEDING AND CURRENT ROW),3)) AS SMA12,
    DECODE(SIGN(rownum-26), -1, 0, ROUND(AVG(CLOSE) OVER(ORDER BY sh_date ROWS BETWEEN 26 PRECEDING AND CURRENT ROW),3)) AS SMA26
    from
    (select sh_date, close from stock_history where isin = 'US0185811082' order by sh_date) sh) sma
model 
  dimension by ( row_number() over (order by sh_date) rn )
  measures ( sh_date, close, sma12, sma26, close ema12, close ema26)
  rules (  
    ema12[any] = NVL2(((close[cv()]*2/13)+(ema12[cv()-1]*(1-(2/13)))), ((close[cv()]*2/13)+(ema12[cv()-1]*(1-(2/13)))), 0),
    ema12[12] = sma12[cv()],
    ema26[any] = NVL2(((close[cv()]*2/27)+(ema26[cv()-1]*(1-(2/27)))), ((close[cv()]*2/27)+(ema26[cv()-1]*(1-(2/27)))), 0),
    ema26[26] = sma26[cv()]
);
  
--macd
SELECT ema.*, DECODE(SIGN(rownum-26), -1, 0, ema12-ema26) as MACD FROM
    (select sh_date, close, sma12, sma26, round(ema12,3) as ema12, round(ema26, 3) as ema26
    from   (select sh.*,
        DECODE(SIGN(rownum-12), -1, 0, ROUND(AVG(CLOSE) OVER(ORDER BY sh_date ROWS BETWEEN 12 PRECEDING AND CURRENT ROW),3)) AS SMA12,
        DECODE(SIGN(rownum-26), -1, 0, ROUND(AVG(CLOSE) OVER(ORDER BY sh_date ROWS BETWEEN 26 PRECEDING AND CURRENT ROW),3)) AS SMA26
        from
        (select sh_date, close from stock_history where isin = 'US0185811082' order by sh_date) sh) sma
    model 
      dimension by ( row_number() over (order by sh_date) rn )
      measures ( sh_date, close, sma12, sma26, close ema12, close ema26)
      rules (  
        ema12[any] = NVL2(((close[cv()]*2/13)+(ema12[cv()-1]*(1-(2/13)))), ((close[cv()]*2/13)+(ema12[cv()-1]*(1-(2/13)))), 0),
        ema12[12] = sma12[cv()],
        ema26[any] = NVL2(((close[cv()]*2/27)+(ema26[cv()-1]*(1-(2/27)))), ((close[cv()]*2/27)+(ema26[cv()-1]*(1-(2/27)))), 0),
        ema26[26] = sma26[cv()]
    )) ema;
    
--FINAL QUERY FOR MACD
SELECT macd.*, DECODE(SIGN(rownum-26), -1, 0, ROUND(AVG(MACD) OVER(ORDER BY sh_date ROWS BETWEEN 9 PRECEDING AND CURRENT ROW),3)) AS signal FROM
(SELECT ema.*, DECODE(SIGN(rownum-26), -1, 0, ema12-ema26) as MACD  FROM
    (select sh_date, close, sma12, sma26, round(ema12,3) as ema12, round(ema26, 3) as ema26
    from   (select sh.*,
        DECODE(SIGN(rownum-12), -1, 0, ROUND(AVG(CLOSE) OVER(ORDER BY sh_date ROWS BETWEEN 12 PRECEDING AND CURRENT ROW),3)) AS SMA12,
        DECODE(SIGN(rownum-26), -1, 0, ROUND(AVG(CLOSE) OVER(ORDER BY sh_date ROWS BETWEEN 26 PRECEDING AND CURRENT ROW),3)) AS SMA26
        from
        (select sh_date, close from stock_history_weekly where isin = 'US0185811082' order by sh_date) sh) sma
    model 
      dimension by ( row_number() over (order by sh_date) rn )
      measures ( sh_date, close, sma12, sma26, close ema12, close ema26)
      rules (  
        ema12[any] = NVL2(((close[cv()]*2/13)+(ema12[cv()-1]*(1-(2/13)))), ((close[cv()]*2/13)+(ema12[cv()-1]*(1-(2/13)))), 0),
        ema12[12] = sma12[cv()],
        ema26[any] = NVL2(((close[cv()]*2/27)+(ema26[cv()-1]*(1-(2/27)))), ((close[cv()]*2/27)+(ema26[cv()-1]*(1-(2/27)))), 0),
        ema26[26] = sma26[cv()]
    )) ema) macd;
    
    
--signal
SELECT sh_date, close, sma12, sma26, ema12, ema26, macd, macdSMA, round(signal,3) as signal FROM
(SELECT macd.*, DECODE(SIGN(rownum-26), -1, 0, ROUND(AVG(MACD) OVER(ORDER BY sh_date ROWS BETWEEN 9 PRECEDING AND CURRENT ROW),3)) AS macdSMA FROM
(SELECT ema.*, DECODE(SIGN(rownum-26), -1, 0, ema12-ema26) as MACD  FROM
    (select sh_date, close, sma12, sma26, round(ema12,3) as ema12, round(ema26, 3) as ema26
    from   (select sh.*,
        DECODE(SIGN(rownum-12), -1, 0, ROUND(AVG(CLOSE) OVER(ORDER BY sh_date ROWS BETWEEN 12 PRECEDING AND CURRENT ROW),3)) AS SMA12,
        DECODE(SIGN(rownum-26), -1, 0, ROUND(AVG(CLOSE) OVER(ORDER BY sh_date ROWS BETWEEN 26 PRECEDING AND CURRENT ROW),3)) AS SMA26
        from
        (select sh_date, close from stock_history where isin = 'US0185811082' order by sh_date) sh) sma
    model 
      dimension by ( row_number() over (order by sh_date) rn )
      measures ( sh_date, close, sma12, sma26, close ema12, close ema26)
      rules (  
        ema12[any] = NVL2(((close[cv()]*2/13)+(ema12[cv()-1]*(1-(2/13)))), ((close[cv()]*2/13)+(ema12[cv()-1]*(1-(2/13)))), 0),
        ema12[12] = sma12[cv()],
        ema26[any] = NVL2(((close[cv()]*2/27)+(ema26[cv()-1]*(1-(2/27)))), ((close[cv()]*2/27)+(ema26[cv()-1]*(1-(2/27)))), 0),
        ema26[26] = sma26[cv()]
    )) ema) macd) sig
 model 
      dimension by ( row_number() over (order by sh_date) rn )
      measures ( sh_date, close, sma12, sma26, ema12, ema26, macd, macdSMA, close signal)
      rules (  
        signal[any] = NVL2(((macd[cv()]*2/10)+(signal[cv()-1]*(1-(2/10)))), ((macd[cv()]*2/10)+(signal[cv()-1]*(1-(2/10)))), 0),
        signal[9] = macdSMA[cv()]
    );


