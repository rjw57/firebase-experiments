# main.tf specifies top-level resources used by the configuration

resource "google_project" "default" {
  project_id      = local.project_id
  name            = "Firebase experiments"
  billing_account = local.billing_account
}

# resource "google_firebase_project" "default" {
#   provider = google-beta
#   project  = google_project.default.project_id
# }
