resource "google_storage_bucket" "demo-yarn-cache" {
  provider = google-beta
  name = var.cache-bucket-name
  location = var.gcp-region
  lifecycle_rule {
    condition {
      age = "7"
    }
    action {
      type = "Delete"
    }
  }
}
