resource "google_cloudbuild_trigger" "deploy-master-demo-function" {
  provider = google-beta
  name = "deploy-master-demo-function"
  description = "[demo] Deploy master: function"
  filename = "function/deploy.cloudbuild.yaml"
  included_files = [
    "function/**"
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
    _PUBSUB_TOPIC = var.pubsub-topic
    _FIRESTORE_COLLECTION = var.firestore-collection
    _GCP_REGION = var.gcp-region
  }
}
