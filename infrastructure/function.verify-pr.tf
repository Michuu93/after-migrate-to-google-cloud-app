resource "google_cloudbuild_trigger" "verify-pr-demo-function" {
  provider = google-beta
  name = "verify-pr-demo-function"
  description = "[demo] Verify PR: function"
  filename = "function/verify.cloudbuild.yaml"
  included_files = [
    "function/**"
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
