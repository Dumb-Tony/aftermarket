# Aftermarket -> GitHub.  Right-click this file > "Run with PowerShell".
# The repo already exists at https://github.com/Dumb-Tony/aftermarket
# The first push opens a browser window to sign in to GitHub. That is normal.

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot
$remote = "https://github.com/Dumb-Tony/aftermarket.git"

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "git isn't installed. Install it with:" -ForegroundColor Yellow
    Write-Host "    winget install Git.Git" -ForegroundColor White
    Write-Host "Then close this window, open a new one, and run this script again."
    Read-Host "Press Enter to close"
    exit 1
}

if (-not (Test-Path ".git")) { git init | Out-Null }
git branch -M main

if (git remote | Select-String -Quiet '^origin$') {
    git remote set-url origin $remote
} else {
    git remote add origin $remote
}

git add -A
if (git status --porcelain) {
    git commit -m "Aftermarket: survivor-like build" | Out-Null
} else {
    Write-Host "Nothing new to commit."
}

Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push -u origin main

Write-Host ""
Write-Host "Done. Code is up at:" -ForegroundColor Green
Write-Host "    https://github.com/Dumb-Tony/aftermarket" -ForegroundColor Yellow
Write-Host ""
Write-Host "Tell Claude it's pushed and it'll switch on the playable link." -ForegroundColor Green
Read-Host "Press Enter to close"
