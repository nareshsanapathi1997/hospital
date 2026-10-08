$ErrorActionPreference = "SilentlyContinue"
$img = "D:\My\Medical\public\img\cand"
Remove-Item $img -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path $img | Out-Null

function Get-Cands($query, $tag, $max) {
  $eq = [uri]::EscapeDataString($query)
  $api = "https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=$eq&gsrlimit=14&gsrnamespace=6&prop=imageinfo&iiprop=url%7Csize%7Cextmetadata&iiurlwidth=1500&format=json"
  $tmp = "$env:TEMP\c.json"
  & curl.exe -s --max-time 30 -A "KyntriqDemo/1.0" $api -o $tmp
  $j = Get-Content $tmp -Raw | ConvertFrom-Json
  $n = 0
  if (-not $j.query) { return }
  foreach ($p in $j.query.pages.PSObject.Properties.Value) {
    if ($n -ge $max) { break }
    $ii = $p.imageinfo[0]
    if (-not $ii) { continue }
    if ($ii.width -ge 1400 -and $ii.height -ge 900 -and $p.title -match '\.(jpg|jpeg|png)$') {
      $n++
      $out = "$img\$tag$n.jpg"
      & curl.exe -sL --max-time 60 -A "KyntriqDemo/1.0" $ii.thumburl -o $out
      if ((Test-Path $out) -and (Get-Item $out).Length -lt 60000) { Remove-Item $out -Force }
      $artist = ""
      if ($ii.extmetadata.Artist) { $artist = ($ii.extmetadata.Artist.value -replace '<[^>]+>','').Trim() }
      $lic = ""
      if ($ii.extmetadata.LicenseShortName) { $lic = $ii.extmetadata.LicenseShortName.value }
      Add-Content -Path "$img\credits.txt" -Value "$tag$n.jpg`t$($p.title)`t$artist`t$lic`thttps://commons.wikimedia.org/wiki/$([uri]::EscapeDataString($p.title))"
    }
  }
}

Get-Cands 'hospital building modern glass facade' 'hero' 4
Get-Cands 'university hospital building new' 'hero2' 3
Get-Cands 'modern hospital corridor' 'corr' 4
Get-Cands 'hospital hallway interior clean' 'corr2' 3
Get-Cands 'modern operating room surgery' 'oper' 4
Get-Cands 'pharmacy counter medicine interior' 'pharm' 4
Get-Cands 'ultrasound examination machine room' 'us' 4
Get-Cands 'cardiac catheterization laboratory' 'card' 4
Get-Cands 'nurse patient hospital bed care' 'nurse' 4
Get-Cands 'intensive care unit hospital room' 'icu' 4
Write-Output "downloaded: $((Get-ChildItem $img -Filter *.jpg).Count)"
