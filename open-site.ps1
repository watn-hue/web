$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$node = Join-Path $root ".tools\node\node.exe"
$url = "http://localhost:3000/"

if (-not (Test-Path $node)) {
  $nodeCommand = Get-Command node -ErrorAction SilentlyContinue

  if (-not $nodeCommand) {
    Write-Host "Node was not found. Install Node.js or keep .tools\node in this folder."
    Read-Host "Press Enter to close"
    exit 1
  }

  $node = $nodeCommand.Source
}

$listener = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue

if (-not $listener) {
  Start-Process -FilePath $node -ArgumentList "server\server.js" -WorkingDirectory $root -WindowStyle Hidden
}

$ready = $false

for ($attempt = 0; $attempt -lt 30; $attempt++) {
  try {
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2

    if ($response.StatusCode -lt 500) {
      $ready = $true
      break
    }
  } catch {
    Start-Sleep -Milliseconds 300
  }
}

if (-not $ready) {
  Write-Host "The app did not respond on http://localhost:3000."
  Read-Host "Press Enter to close"
  exit 1
}

Start-Process $url
