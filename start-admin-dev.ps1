$ErrorActionPreference = "Stop"

$projectRoot = $PSScriptRoot

Write-Host "Starting Keycloak backend without rebuilding the image..." -ForegroundColor Cyan
docker compose -f "$projectRoot/docker-compose.yml" -f "$projectRoot/docker-compose.dev.yml" up -d --no-build

if ($LASTEXITCODE -ne 0) {
    throw "Could not start the Keycloak container. Build the image once with: docker compose up -d --build"
}

Write-Host "Starting Admin UI with Vite HMR..." -ForegroundColor Green
Write-Host "Admin: http://localhost:8080/admin" -ForegroundColor Cyan
Write-Host "Vite: http://localhost:5174" -ForegroundColor DarkGray

Set-Location "$projectRoot/js"
pnpm --filter @keycloak/keycloak-admin-ui dev

