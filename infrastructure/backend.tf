terraform {
  backend "gcs" {
    bucket = "demo-infrastructure"
    prefix = "terraform/state"
  }
}
