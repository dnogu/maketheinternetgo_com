data "cloudflare_origin_ca_root_certificate" "origin_ca" {
  algorithm = "rsa"
}

data "cloudflare_zone" "mtig" {
  name = "maketheinternetgo.com"
}

resource "tls_private_key" "mtig" {
  algorithm = "RSA"
}

resource "tls_cert_request" "mtig" {
  private_key_pem = tls_private_key.mtig.private_key_pem
}

resource "cloudflare_origin_ca_certificate" "mtig" {
  csr                = tls_cert_request.mtig.cert_request_pem
  hostnames          = var.env == "prod" ? ["maketheinternetgo.com"] : ["${var.env}-api.maketheinternetgo.com"]
  request_type       = "origin-rsa"
}

resource "cloudflare_record" "mtig-api" {
  zone_id = data.cloudflare_zone.mtig.id
  name    = var.env == "prod" ? "api" : "${var.env}-api"
  value   = aws_apigatewayv2_domain_name.mtig.domain_name_configuration[0].target_domain_name
  type    = "CNAME"
  proxied = true
}

