
function process()
{
var result1 = 0;
var result2 = 0;
var result3 = 0;
var result4 = 0;

var f = document.f;
var i = 0;
for (i = 0; i < f.a.length; i++) if (f.a[i].checked) value = f.a[i].value;
    if (value == "1") { result1++; }
    if (value == "2") { result2++; }
    if (value == "3") { result3++; }
    if (value == "4") { result4++; }
for (i = 0; i < f.b.length; i++) if (f.b[i].checked) value = f.b[i].value;
    if (value == "1") { result1++; }
    if (value == "2") { result2++; }
    if (value == "3") { result3++; }
    if (value == "4") { result4++; }
for (i = 0; i < f.c.length; i++) if (f.c[i].checked) value = f.c[i].value;
    if (value == "1") { result1++; }
    if (value == "2") { result2++; }
    if (value == "3") { result3++; }
    if (value == "4") { result4++; }
for (i = 0; i < f.d.length; i++) if (f.d[i].checked) value = f.d[i].value;
    if (value == "1") { result1++; }
    if (value == "2") { result2++; }
    if (value == "3") { result3++; }
    if (value == "4") { result4++; }
var out = "result1";
i = result1;
if (result2 > i) { out ="result2"; i = result2; }
if (result3 > i) { out ="result3"; i = result3; }
if (result4 > i) { out ="result4"; i = result4; }
location.href = out + ".shtml";
}
