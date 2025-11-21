# Medical Platform Web Server Configuration
class medical_platform::webserver (
  String $environment = 'production',
  Integer $port = 3000,
  String $app_user = 'medapp',
  String $app_group = 'medapp',
  String $app_dir = '/opt/medical-platform',
) {

  # Create application user
  user { $app_user:
    ensure     => present,
    gid        => $app_group,
    managehome => true,
    shell      => '/bin/bash',
  }

  group { $app_group:
    ensure => present,
  }

  # Install Node.js
  class { 'nodejs':
    repo_url_suffix => '18.x',
  }

  # Install required packages
  package { ['git', 'build-essential']:
    ensure => installed,
  }

  # Create application directory
  file { $app_dir:
    ensure => directory,
    owner  => $app_user,
    group  => $app_group,
    mode   => '0755',
  }

  # Clone/update application code
  vcsrepo { $app_dir:
    ensure   => latest,
    provider => git,
    source   => 'https://github.com/yourusername/medical-platform.git',
    revision => 'main',
    user     => $app_user,
    require  => [File[$app_dir], Package['git']],
  }

  # Install npm dependencies
  exec { 'npm_install':
    command     => 'npm install --production',
    cwd         => $app_dir,
    user        => $app_user,
    path        => ['/usr/bin', '/usr/local/bin'],
    refreshonly => true,
    subscribe   => Vcsrepo[$app_dir],
    require     => Class['nodejs'],
  }

  # Configure environment file
  file { "${app_dir}/.env":
    ensure  => file,
    owner   => $app_user,
    group   => $app_group,
    mode    => '0600',
    content => template('medical_platform/env.erb'),
  }

  # Create systemd service
  file { '/etc/systemd/system/medical-platform.service':
    ensure  => file,
    content => template('medical_platform/systemd.service.erb'),
    notify  => Exec['systemd_reload'],
  }

  exec { 'systemd_reload':
    command     => 'systemctl daemon-reload',
    path        => ['/usr/bin', '/bin'],
    refreshonly => true,
  }

  # Start and enable service
  service { 'medical-platform':
    ensure    => running,
    enable    => true,
    subscribe => [
      File["${app_dir}/.env"],
      Exec['npm_install'],
    ],
    require   => [
      File['/etc/systemd/system/medical-platform.service'],
      Exec['systemd_reload'],
    ],
  }

  # Configure Nginx reverse proxy
  class { 'nginx': }

  nginx::resource::server { 'medical-platform':
    listen_port => 80,
    proxy       => "http://localhost:${port}",
    ssl         => true,
    ssl_cert    => '/etc/ssl/certs/medical-platform.crt',
    ssl_key     => '/etc/ssl/private/medical-platform.key',
  }

  # Configure firewall
  firewall { '100 allow http and https':
    dport  => [80, 443],
    proto  => tcp,
    action => accept,
  }

  firewall { '101 allow app port':
    dport  => $port,
    proto  => tcp,
    action => accept,
    source => '10.0.0.0/8', # Internal network only
  }
}
