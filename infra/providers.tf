# providers.tf configures providers used by the configuration.

provider "google" {
  project = local.project_id
  region  = local.default_region
}

provider "google-beta" {
  project = local.project_id
  region  = local.default_region
}
