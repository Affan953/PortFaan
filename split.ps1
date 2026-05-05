$htmlPath = "d:\gamerpg\index.html"
$content = Get-Content -Raw -Path $htmlPath

$styleStart = $content.IndexOf("<style>")
$styleEnd = $content.IndexOf("</style>") + "</style>".Length
$cssContent = $content.Substring($styleStart + 7, $styleEnd - $styleStart - 7 - 8).Trim()

$scriptStart = $content.IndexOf("<script>")
$scriptEnd = $content.IndexOf("</script>") + "</script>".Length
$jsContent = $content.Substring($scriptStart + 8, $scriptEnd - $scriptStart - 8 - 9).Trim()

$newHtml = $content.Substring(0, $styleStart) + '    <link rel="stylesheet" href="css/style.css">' + $content.Substring($styleEnd, $scriptStart - $styleEnd) + '    <script src="js/script.js"></script>' + $content.Substring($scriptEnd)

New-Item -ItemType Directory -Force -Path "d:\gamerpg\css"
New-Item -ItemType Directory -Force -Path "d:\gamerpg\js"

Set-Content -Path "d:\gamerpg\css\style.css" -Value $cssContent -Encoding UTF8
Set-Content -Path "d:\gamerpg\js\script.js" -Value $jsContent -Encoding UTF8
Set-Content -Path $htmlPath -Value $newHtml -Encoding UTF8

Write-Host "Split successful"
