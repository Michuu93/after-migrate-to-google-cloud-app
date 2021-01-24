resource "google_cloudbuild_trigger" "deploy-main-demo-function" {
  provider = google-beta
  name = "deploy-main-demo-function"
  description = "[demo] Deploy main: function"
  filename = "function/deploy.cloudbuild.yaml"
  included_files = [
    "function/**"
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
    _PUBSUB_TOPIC = var.pubsub-topic
    _FIRESTORE_COLLECTION = var.firestore-collection
    _GCP_REGION = var.gcp-region
  }
}
