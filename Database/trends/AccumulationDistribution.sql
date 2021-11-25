 select sh_date, open,close, high, low, volume from stock_history where isin = 'US0185811082' order by sh_date;

SELECT sh_date, open, close, high, low, volume, round(ad, 3) as ad, mf
from 
    (select sh_date, open,close, high, low, volume 
    from stock_history where isin = 'US0185811082' order by sh_date) sh
model 
      dimension by ( row_number() over (order by sh_date) rn )
      measures ( sh_date,open, close, high, low, volume, 0 ad, 0 mf)
      rules (  
        mf[any] = round(((close[cv()]- low[cv()])-(high[cv()]- close[cv()])/(high[cv()]-low[cv()])),3),
        ad[any] = ((mf[cv()] * volume[cv()]) + nvl(ad[cv()-1], 0)),
        ad[1] = (mf[cv()] * volume[cv()])
        );