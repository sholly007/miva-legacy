-- Update inconsistent degree_level values to canonical versions

UPDATE students
SET degree_level = 'Bachelor''s (BSc/BA/BEng/LLB/etc.)'
WHERE degree_level IN ('Bachelor''s', 'Bachelors', 'bachelor', 'undergraduate');

UPDATE students
SET degree_level = 'Master''s (MSc/MA/MBA/etc.)'
WHERE degree_level IN ('Master''s', 'Masters', 'master', 'postgraduate master');

UPDATE students
SET degree_level = 'PhD'
WHERE degree_level IN ('Ph.D', 'Doctorate', 'doctor');

UPDATE students
SET degree_level = 'Postgraduate Diploma'
WHERE degree_level IN ('PGD', 'Post Grad Diploma', 'postgraduate diploma');
