// reemmber that there is versioning of major, minor and patch in termsof semver 

// but in video it is said as

//4.18.2


// 4 (MAJOR RELEAVE or BREAKING UPDATE)

// if your major is 4, be ready and read history via https://github.com/expressjs/express/blob/master/History.md in order to be aware of change logs and it is generally not recommeded to change this because code of 4 may not works
// Select this only while creating a new appliation


// 18 (RECOMMENDED or BUG FIX or FEATURE ADDED)

//app.get('/profile', (req, res)=>{
//});
// to change it again read history and can change , normally not devastating


// 2 (MINOR or OPTIONAL UPDATE)

// include TYPOS


// to see versions go to npmjs and then search pckage name and then their versions tab is there

// to make applicaion of package of any particular version use

// npm i express@4.18.2


// to know about ^, ~ 

// ^ means minor and patch can be changed for difference machines but NOT MAJOR ONE
// ~ means ONLY PATCH can be changed not MAJOR and MINOR

/* 

version Must match version exactly
>version Must be greater than version
>=version etc
<version
<=version
~version "Approximately equivalent to version" See semver
^version "Compatible with version" See semver
1.2.x 1.2.0, 1.2.1, etc., but not 1.3.0
http://... See 'URLs as Dependencies' below
* Matches any version
"" (just an empty string) Same as *
version1 - version2 Same as >=version1 <=version2.
range1 || range2 Passes if either range1 or range2 are satisfied.
git... See 'Git URLs as Dependencies' below
user/repo See 'GitHub URLs' below
tag A specific version tagged and published as tag See npm dist-tag
path/path/path See Local Paths belo

*/
