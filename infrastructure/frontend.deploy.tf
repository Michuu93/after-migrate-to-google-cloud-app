resource "google_cloudbuild_trigger" "deploy-master-demo-frontend" {
  provider = google-beta
  name = "deploy-master-demo-frontend"
  description = "[demo] Deploy master: frontend"
  filename = "frontend/deploy.cloudbuild.yaml"
  included_files = [
    "frontend/**"
  ]
  github {
    owner = var.github-owner
    name = var.github-repository
    push {
      branch = "^master$"
    }
  }
  substitutions = {
    _CACHE_BUCKET = "gs://${var.cache-bucket-name}"
    _FRONTEND_BUCKET = "gs://${var.frontend-bucket-name}"
  }
}
