resource "google_cloudbuild_trigger" "deploy-main-demo-frontend" {
  provider = google-beta
  name = "deploy-main-demo-frontend"
  description = "[demo] Deploy main: frontend"
  filename = "frontend/deploy.cloudbuild.yaml"
  included_files = [
    "frontend/**"
  ]
  github {
    owner = var.github-owner
    name = var.github-repository
    push {
      branch = "^main$"
    }
  }
  substitutions = {
    _CACHE_BUCKET = "gs://${var.cache-bucket-name}"
    _FRONTEND_BUCKET = "gs://${var.frontend-bucket-name}"
  }
}
