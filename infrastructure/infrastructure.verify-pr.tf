resource "google_cloudbuild_trigger" "verify-pr-demo-infrastructure" {
  provider = google-beta
  name = "verify-pr-demo-infrastructure"
  description = "[demo] Verify PR: infrastructure"
  filename = "infrastructure/build/verify.cloudbuild.yaml"
  included_files = [
    "infrastructure/**"
  ]
  github {
    owner = var.github-owner
    name = var.github-repository
    pull_request {
      branch = "^main$"
      comment_control = "COMMENTS_ENABLED"
    }
  }
}
