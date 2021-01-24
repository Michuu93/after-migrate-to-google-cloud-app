resource "google_cloudbuild_trigger" "verify-pr-demo-frontend" {
  provider = google-beta
  name = "verify-pr-demo-frontend"
  description = "[demo] Verify PR: frontend"
  filename = "frontend/verify.cloudbuild.yaml"
  included_files = [
    "frontend/**"
  ]
  github {
    owner = var.github-owner
    name = var.github-repository
    pull_request {
      branch = "^main$"
      comment_control = "COMMENTS_ENABLED"
    }
  }
  substitutions = {
    _CACHE_BUCKET = "gs://${var.cache-bucket-name}"
  }
}
