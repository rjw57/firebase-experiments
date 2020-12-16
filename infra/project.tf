# project.tf creates the top-level project resource and associated admin service accounts.

# The project itself
resource "google_project" "default" {
  project_id      = local.project_id
  name            = "Firebase experiments"
  billing_account = local.billing_account

  provider = google.app-default
}

# Services on the project
resource "google_project_service" "default" {
  for_each = local.enabled_services

  project = google_project.default.project_id
  service = each.key

  provider = google.app-default
}

# A service account which has "project owner" rights.
resource "google_service_account" "project_owner" {
  account_id   = "terraform-owner"
  display_name = "Terraform project owner"
  project      = google_project.default.project_id

  provider = google.app-default
}

resource "google_project_iam_member" "project_owner" {
  role    = "roles/owner"
  member  = "serviceAccount:${google_service_account.project_owner.email}"
  project = google_project.default.project_id

  provider = google.app-default
}

# Credentials for said service account.
resource "google_service_account_key" "project_owner" {
  service_account_id = google_service_account.project_owner.account_id

  provider = google.app-default
}
