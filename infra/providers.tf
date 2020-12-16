# providers.tf configures providers used by the configuration.

# Google providers which use project admin service account credentials.

provider "google" {
  project = local.project_id
  region  = local.default_region

  credentials = google_service_account_key.project_owner.private_key
}

provider "google-beta" {
  project = local.project_id
  region  = local.default_region

  credentials = base64decode(google_service_account_key.project_owner.private_key)
}

# Google providers which use the default credentials.

provider "google" {
  alias   = "app-default"
  project = local.project_id
  region  = local.default_region
}

provider "google-beta" {
  alias   = "app-default"
  project = local.project_id
  region  = local.default_region
}
