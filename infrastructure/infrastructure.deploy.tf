resource "google_cloudbuild_trigger" "deploy-demo-infrastructure" {
  provider = google-beta
  name = "deploy-demo-infrastructure"
  description = "[demo] Deploy main: infrastructure"
  filename = "infrastructure/build/deploy.cloudbuild.yaml"
  included_files = [
    "infrastructure/**"
  ]
  github {
    owner = var.github-owner
    name = var.github-repository
    push {
      branch = "^main$"
    }
  }
}
