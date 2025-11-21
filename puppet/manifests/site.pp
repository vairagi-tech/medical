# Main Puppet manifest for Medical Platform
# This file defines the configuration for all nodes

# Default node configuration
node default {
  notify { 'default_node':
    message => 'This node is not configured. Please add it to site.pp',
  }
}

# Web Server Nodes
node /^web-server-\d+\..*$/ {
  include medical_platform::webserver
  include medical_platform::monitoring
  include medical_platform::security
}

# Database Server Nodes
node /^db-server-\d+\..*$/ {
  include medical_platform::database
  include medical_platform::backup
  include medical_platform::monitoring
  include medical_platform::security
}

# Load Balancer Nodes
node /^lb-server-\d+\..*$/ {
  include medical_platform::loadbalancer
  include medical_platform::monitoring
  include medical_platform::security
}

# Application Server Nodes
node /^app-server-\d+\..*$/ {
  include medical_platform::appserver
  include medical_platform::monitoring
  include medical_platform::security
}
