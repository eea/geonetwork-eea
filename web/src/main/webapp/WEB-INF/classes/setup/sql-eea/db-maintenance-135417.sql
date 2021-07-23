UPDATE metadata
    SET data = REPLACE(data,
                       '>Kosovo<',
                       '> (UNSCR 1244/99)<')
    WHERE data LIKE '%>Kosovo<%';

UPDATE metadata
    SET data = REPLACE(data,
                       'Kosovo and Serbia',
                       'Kosovo (UNSCR 1244/99) and Serbia')
    WHERE data LIKE '%Kosovo and Serbia%';

UPDATE metadata
    SET data = REPLACE(data,
                       'Kosovo,',
                       'Kosovo (UNSCR 1244/99),')
    WHERE data LIKE '%Kosovo,%';

UPDATE metadata
    SET data = REPLACE(data,
                       '>Kosovo under the UN Security Council Resolution 1244/99<',
                       '>Kosovo (UNSCR 1244/99)<')
    WHERE data LIKE '%>Kosovo under the UN Security Council Resolution 1244/99<%';

UPDATE metadata
    SET data = REPLACE(data,
                       'Kosovo under UNSC Resolution 1244/99',
                       'Kosovo (UNSCR 1244/99)')
    WHERE data LIKE '%Kosovo under UNSC Resolution 1244/99%';

