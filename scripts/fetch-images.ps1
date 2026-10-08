$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"
$img = "D:\My\Medical\public\img"
New-Item -ItemType Directory -Force -Path $img | Out-Null

function Search-Commons($query, $limit) {
  $q = [uri]::EscapeDataString($query)
  $api = "https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=$q&gsrlimit=$limit&gsrnamespace=6&prop=imageinfo&iiprop=url%7Csize%7Cextmetadata&iiurlwidth=1600&format=json"
  $tmp = "$env:TEMP\wm_$([guid]::NewGuid().ToString('N')).json"
  & curl.exe -s --max-time 40 -A "KyntriqDemo/1.0 (contact: demo@example.com)" $api -o $tmp
  $raw = Get-Content $tmp -Raw
  if (-not $raw) { return @() }
  try { $j = $raw | ConvertFrom-Json } catch { return @() }
  if (-not $j.query) { return @() }
  $out = @()
  foreach ($p in $j.query.pages.PSObject.Properties.Value) {
    $ii = $p.imageinfo[0]
    if (-not $ii) { continue }
    if ($ii.width -ge 1300 -and $ii.height -ge 850 -and $p.title -match '\.(jpg|jpeg|png)$') {
      $art = ""
      if ($ii.extmetadata.Artist) { $art = ($ii.extmetadata.Artist.value -replace '<[^>]+>','').Trim() }
      $lic = ""
      if ($ii.extmetadata.LicenseShortName) { $lic = $ii.extmetadata.LicenseShortName.value }
      $out += [pscustomobject]@{ title=$p.title; url=$ii.thumburl; w=$ii.width; h=$ii.height; artist=$art; license=$lic }
    }
  }
  return $out
}

$terms = [ordered]@{
  "hero-hospital"     = @('hospital building modern exterior incategory:"Quality images"', 'hospital exterior building')
  "corridor"          = @('hospital corridor hallway', 'hospital hallway interior')
  "consultation"      = @('doctor patient consultation office', 'physician patient examination')
  "operating-theatre" = @('operating theatre surgery room', 'operating room surgical team')
  "mri"               = @('MRI scanner machine', 'magnetic resonance imaging scanner')
  "laboratory"        = @('medical laboratory technician', 'clinical laboratory analysis')
  "ambulance"         = @('ambulance emergency vehicle', 'ambulance hospital')
  "pharmacy"          = @('pharmacy interior shelves', 'hospital pharmacy')
  "reception"         = @('hospital lobby reception', 'hospital reception desk')
  "icu"               = @('intensive care unit monitor', 'hospital ICU equipment')
  "ultrasound"        = @('ultrasound examination machine', 'sonography examination')
  "cardiology"        = @('electrocardiogram monitor', 'ECG heart monitor hospital')
  "nurse"             = @('nurse patient hospital care', 'nurse hospital ward')
  "stethoscope"       = @('stethoscope examination doctor', 'stethoscope medical')
}

$credits = @()
foreach ($name in $terms.Keys) {
  $done = $false
  foreach ($query in $terms[$name]) {
    if ($done) { break }
    $cands = Search-Commons $query 14
    foreach ($c in $cands) {
      $out = "$img\$name.jpg"
      & curl.exe -sL --max-time 60 -A "KyntriqDemo/1.0 (contact: demo@example.com)" $c.url -o $out
      if (Test-Path $out) {
        $len = (Get-Item $out).Length
        if ($len -gt 80000) {
          $credits += [pscustomobject]@{ file="$name.jpg"; title=$c.title; creator=$c.artist; license=$c.license; source="https://commons.wikimedia.org/wiki/$([uri]::EscapeDataString($c.title))" }
          Write-Output "OK   $name  $([math]::Round($len/1kb))KB  $($c.w)x$($c.h)  $($c.title)"
          $done = $true
          break
        }
      }
      if (Test-Path $out) { Remove-Item $out -Force }
    }
  }
  if (-not $done) { Write-Output "FAIL $name" }
}

New-Item -ItemType Directory -Force -Path "$img\doctors" | Out-Null
$portraitIds = @(1,2,5,8,11,12,13,14,16,17,20,23,26,31,32,33,36,40,44,45,47,49,51,52,56,60,63,65,68)
$got = 0
foreach ($id in $portraitIds) {
  $out = "$img\doctors\p$id.jpg"
  & curl.exe -sL --max-time 25 "https://i.pravatar.cc/600?img=$id" -o $out
  if ((Test-Path $out) -and (Get-Item $out).Length -gt 15000) { $got++ } else { Remove-Item $out -Force -ErrorAction SilentlyContinue }
}
Write-Output "portraits downloaded: $got"
New-Item -ItemType Directory -Force -Path "D:\My\Medical\src\data" | Out-Null
$credits | ConvertTo-Json -Depth 3 | Set-Content "D:\My\Medical\src\data\imageCredits.json" -Encoding UTF8
Write-Output "done"
