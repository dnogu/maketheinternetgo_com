data "cloudflare_zone" "example" {
  name = "maketheinternetgo.com"
}

resource "cloudflare_record" "foobar" {
  zone_id = data.cloudflare_zone.example.id
  name    = var.env == "prod" ? "api" : "${var.env}.api"
  value   = aws_apigatewayv2_api.mtig.api_endpoint
  type    = "CNAME"
  proxied = true
}
