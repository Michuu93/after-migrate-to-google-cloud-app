resource "google_storage_bucket" "frontend-website-bucket" {
  provider = google-beta
  name = var.frontend-bucket-name
  location = var.gcp-region
  force_destroy = true
  website {
    main_page_suffix = "index.html"
  }
}

resource "google_storage_bucket_iam_member" "frontend-website-bucket-public-permissions" {
  bucket = google_storage_bucket.frontend-website-bucket.name
  role = "roles/storage.objectViewer"
  member = "allUsers"
}
