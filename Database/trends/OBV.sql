--compute change
select sh.*, Decode(rownum, 1, 0, close - LAG(close, 1, 0 ) OVER (ORDER BY sh_date))  as change
from (select sh_date, close from stock_history where isin = 'US0185811082' order by sh_date) sh;
 
 select sh_date, close, volume from stock_history where isin = 'US0185811082' order by sh_date;
 
-- on-balance volume
 select sh_date, close, volume, obv 
 FROM 
 ( select sh_date, close, volume from stock_history where isin = 'US0185811082' order by sh_date) sh
 model 
      dimension by ( row_number() over (order by sh_date) rn )
      measures ( sh_date, close, volume, 0 obv)
      rules (  
        obv[any] = decode(SIGN(close[cv()]-close[cv()-1]), 
                          -1, 
                          (obv[cv()-1]- volume[cv()]), 
                          1,
                          decode(SIGN(close[cv()-1]-close[cv()]), 
                                 -1, 
                                 (obv[cv()-1] + volume[cv()])),                                 
                                 (obv[cv()])
                         )
        );
        
-- on-balance volume
 select sh_date, close, volume, obv 
 FROM 
 ( select sh_date, close, volume from stock_history where isin = 'US0185811082' order by sh_date) sh
 model 
      dimension by ( row_number() over (order by sh_date) rn )
      measures ( sh_date, close, volume, 0 obv)
      rules UPDATE AUTOMATIC ORDER (  
        obv[any] = decode(SIGN(close[cv()]-close[cv()-1]), 
                          -1, 
                          (obv[cv()-1]- volume[cv()]), 
                          1,
                          decode(SIGN(close[cv()-1]-close[cv()]), 
                                 -1, 
                                 (obv[cv()-1] + volume[cv()])),                                 
                                 (obv[cv()-1])
                         )
        )
        order by sh_date;
        
        
       
--obv case
 select sh_date, close, volume, obv 
 FROM 
 ( select sh_date, close, volume from stock_history where isin = 'US0185811082' order by sh_date) sh
 model 
      dimension by ( row_number() over (order by sh_date) rn )
      measures ( sh_date, close, volume, 0 obv)
      rules (  
        obv[any] = CASE 
                    WHEN (close[cv()]>close[cv()-1]) 
                    THEN (obv[cv()-1] + volume[cv()])
                    WHEN (close[cv()]<close[cv()-1]) 
                    THEN (obv[cv()-1] - volume[cv()])
                    ELSE  nvl(obv[cv()-1], 0)
                    END,
        obv[1] = volume[cv()]
        )
    order by sh_date;