-- https://taskman.eionet.europa.eu/issues/288945

UPDATE metadata
SET data = replace(data,
                   'EEA standard re-use policy: unless otherwise indicated, re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge, provided that the source is acknowledged (https://www.eea.europa.eu/legal/copyright).',
                   'License CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/).')
WHERE data LIKE
      '%EEA standard re-use policy: unless otherwise indicated, re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge, provided that the source is acknowledged (https://www.eea.europa.eu/legal/copyright).%';

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
