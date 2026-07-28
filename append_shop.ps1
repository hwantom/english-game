$headContent = [System.IO.File]::ReadAllText("$PSScriptRoot\script.js", [System.Text.Encoding]::UTF8)
$lines = $headContent.Split("`n")

$cutIdx = -1
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i].Contains("setTimeout(() => ring.remove(), 800);")) {
        $cutIdx = $i + 1
        break
    }
}

if ($cutIdx -eq -1) {
    Write-Host "Could not find cut point!"
    exit 1
}

$cleanHead = ($lines[0..($cutIdx-1)]) -join "`n"

$base64Tail = "ICAgICAgICB9LCBkZWxheSk7CiAgICB9CgogICAgY29uc3Qgb3JiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgICBvcmIuY2xhc3NOYW1lID0gJ2dob3N0LW9yYic7CiAgICBvcmIuc3R5bGUuY3NzVGV4dCA9IGAKICAgICAgICBsZWZ0OiAke3N0YXJ0WH1weDsKICAgICAgICB0b3A6ICAke3N0YXJ0WSAtIDE4fXB4OwogICAgICAgIC0tb3JiLXg6ICR7ZHh9cHg7CiAgICAgICAgLS1vcmItZHVyOiAwLjc1czsKICAgICAgICAtLW9yYi1kZWxheTogMG1zOwogICAgYDsKICAgIGVmZmVjdHNMYXllci5hcHBlbmRDaGlsZChvcmIpOwoKICAgIGNvbnN0IHRpbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsKICAgIHRpbnQuY2xhc3NOYW1lID0gJ2dob3N0LXNjcmVlbi10aW50JzsKICAgIGVmZmVjdHNMYXllci5hcHBlbmRDaGlsZCh0aW50KTsKICAgIHNldFRpbWVvdXQoKCkgPT4gdGludC5yZW1vdmUoKSwgMTAwMCk7CgogICAgc2V0VGltZW91dCgoKSA9PiB7CiAgICAgICAgb3JiLnJlbW92ZSgpOwogICAgICAgIGlmIChvbkRvbmUpIG9uRG9uZSgpOwogICAgfSwgdG90YWxEdXJhdGlvbik7Cn0KCg=="

$bytes = [System.Convert]::FromBase64String($base64Tail)
$tailText = [System.Text.Encoding]::UTF8.GetString($bytes)

# Read full clean tail from UTF-8 script generator
$fullTailPath = "$PSScriptRoot\clean_tail.js"
if ([System.IO.File]::Exists($fullTailPath)) {
    $tailText = [System.IO.File]::ReadAllText($fullTailPath, [System.Text.Encoding]::UTF8)
}

[System.IO.File]::WriteAllText("$PSScriptRoot\script.js", ($cleanHead + "`n" + $tailText), [System.Text.Encoding]::UTF8)
Write-Host "Successfully assembled script.js with UTF8 encoding!"
