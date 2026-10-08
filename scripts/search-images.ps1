$ErrorActionPreference = "SilentlyContinue"
$queries = @{
  "hero"       = @('hospital building modern glass facade', 'university hospital building new', 'hospital entrance canopy building')
  "corridor"   = @('modern hospital corridor', 'hospital hallway white clean', 'clinic corridor interior')
  "operating"  = @('modern operating room surgery', 'operating theatre equipment modern', 'surgical suite hospital')
  "pharmacy"   = @('pharmacy counter medicine', 'drugstore pharmacy interior modern', 'hospital pharmacy dispensary')
  "ultrasound" = @('ultrasound machine examination room', 'sonographer ultrasound scan', 'echocardiography examination')
  "cardiology" = @('cardiac catheterization laboratory', 'cardiology clinic examination', 'heart surgery team')
  "nurse"      = @('nurse checking patient hospital bed', 'nurse Vital signs patient', 'nurse hospital ward care')
  "icu"        = @('intensive care unit bed ventilator', 'hospital monitor patient bed', 'critical care unit room')
}
foreach ($k in $queries.Keys) {
  Write-Output "=== $k ==="
  foreach ($q in $queries[$k]) {
    $eq = [uri]::EscapeDataString($q)
    $api = "https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=$eq&gsrlimit=10&gsrnamespace=6&prop=imageinfo&iiprop=url%7Csize&format=json"
    $tmp = "$env:TEMP\s.json"
    & curl.exe -s --max-time 30 -A "KyntriqDemo/1.0" $api -o $tmp
    $j = Get-Content $tmp -Raw | ConvertFrom-Json
    if ($j.query) {
      foreach ($p in $j.query.pages.PSObject.Properties.Value) {
        $ii = $p.imageinfo[0]
        if ($ii -and $ii.width -ge 1400 -and $ii.height -ge 900 -and $p.title -match '\.(jpg|jpeg|png)$') {
          Write-Output ("  {0} | {1}x{2}" -f $p.title, $ii.width, $ii.height)
        }
      }
    }
  }
}
