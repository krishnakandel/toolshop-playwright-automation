git status; git add .; git commit -m "Add setup project for authentication."; git push

npx playwright test --project=chromium-public
px playwright test --project=chromium-login --headed
npx playwright test --project=chromium-authenticated
npx playwright test