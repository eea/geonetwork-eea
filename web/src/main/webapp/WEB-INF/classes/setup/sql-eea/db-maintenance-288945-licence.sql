-- https://taskman.eionet.europa.eu/issues/288945

UPDATE metadata
SET data = replace(data,
                   'EEA standard re-use policy: unless otherwise indicated, re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge, provided that the source is acknowledged (https://www.eea.europa.eu/legal/copyright).',
                   'License CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/).')
WHERE data LIKE
      '%EEA standard re-use policy: unless otherwise indicated, re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge, provided that the source is acknowledged (https://www.eea.europa.eu/legal/copyright).%';

UPDATE metadata
SET data = replace(data,
                   'The EEA standard re-use policy applies: unless otherwise indicated, re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge, provided that the source is acknowledged (http://www.eea.europa.eu/legal/copyright).',
                   'License CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/).')
WHERE data LIKE
      '%The EEA standard re-use policy applies: unless otherwise indicated, re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge, provided that the source is acknowledged (http://www.eea.europa.eu/legal/copyright).%';

UPDATE metadata
SET data = replace(data,
                   'EEA standard re-use policy applies: unless otherwise indicated, re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge, provided that the source is acknowledged (http://www.eea.europa.eu/legal/copyright).',
                   'License CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/).')
WHERE data LIKE
      '%EEA standard re-use policy applies: unless otherwise indicated, re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge, provided that the source is acknowledged (http://www.eea.europa.eu/legal/copyright).%';

UPDATE metadata
SET data = replace(data,
                   'EEA standard re-use policy: unless otherwise indicated, re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge, provided that the source is acknowledged (http://www.eea.europa.eu/legal/copyright).',
                   'License CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/).')
WHERE data LIKE
      '%EEA standard re-use policy: unless otherwise indicated, re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge, provided that the source is acknowledged (http://www.eea.europa.eu/legal/copyright).%';

UPDATE metadata
SET data = replace(data,
                   'EEA standard re-use policy: unless otherwise indicated re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge provided that the source is acknowledged (http://www.eea.europa.eu/legal/copyright).',
                   'License CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/).')
WHERE data LIKE
      '%EEA standard re-use policy: unless otherwise indicated re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge provided that the source is acknowledged (http://www.eea.europa.eu/legal/copyright).%';

UPDATE metadata
SET data = replace(data,
                   'EEA standard re-use policy: unless otherwise indicated, re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge, provided that the source is acknowledged (http://www.eea.europa.eu/legal/copyright<',
                   'License CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/).<')
WHERE data LIKE
      '%EEA standard re-use policy: unless otherwise indicated, re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge, provided that the source is acknowledged (http://www.eea.europa.eu/legal/copyright<%';

UPDATE metadata
SET data = replace(data,
                   'EEA standard re-use policy: unless otherwise indicated re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge	 provided that the source is acknowledged (http://www.eea.europa.eu/legal/copyright).',
                   'License CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/).')
WHERE data LIKE
      '%EEA standard re-use policy: unless otherwise indicated re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge	 provided that the source is acknowledged (http://www.eea.europa.eu/legal/copyright).%';

UPDATE metadata
SET data = replace(data,
                   '>EA standard re-use policy: unless otherwise indicated, re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge, provided that the source is acknowledged (http://www.eea.europa.eu/legal/copyright)',
                   '>License CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/).')
WHERE data LIKE
      '%>EA standard re-use policy: unless otherwise indicated, re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge, provided that the source is acknowledged (http://www.eea.europa.eu/legal/copyright)%';

UPDATE metadata
SET data = replace(data,
                   '>Unless otherwise indicated, re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge, provided that the source is acknowledged (https://www.eea.europa.eu/legal/copyright).',
                   '>License CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/).')
WHERE data LIKE
      '%>Unless otherwise indicated, re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge, provided that the source is acknowledged (https://www.eea.europa.eu/legal/copyright).%';

-- Remaining statement without closing parenthesis eg. def7ac06-7d3f-4da5-880c-a76a73953cfc
UPDATE metadata
SET data = replace(data,
                   'EEA standard re-use policy: unless otherwise indicated, re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge, provided that the source is acknowledged (http://www.eea.europa.eu/legal/copyright',
                   'License CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/).')
WHERE data LIKE
      '%EEA standard re-use policy: unless otherwise indicated, re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge, provided that the source is acknowledged (http://www.eea.europa.eu/legal/copyright%';


-- Remaining statement without website link eg. 723f0742-727b-45ec-a70d-df6292b7e003
UPDATE metadata
SET data = replace(data,
                   'EEA standard re-use policy: unless otherwise indicated, re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge, provided that the source is acknowledged.',
                   'License CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/).')
WHERE data LIKE
      '%EEA standard re-use policy: unless otherwise indicated, re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge, provided that the source is acknowledged.%';
