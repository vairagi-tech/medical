# Medical Platform Database Configuration
class medical_platform::database (
  String $db_type = 'postgresql',
  String $db_version = '15',
  String $db_name = 'medical_platform',
  String $db_user = 'medapp',
  String $db_password = 'changeme',
  Integer $max_connections = 200,
  String $backup_time = '02:00',
) {

  case $db_type {
    'postgresql': {
      # Install PostgreSQL
      class { 'postgresql::server':
        version              => $db_version,
        listen_addresses     => '*',
        max_connections      => $max_connections,
        shared_buffers       => '256MB',
        effective_cache_size => '1GB',
        maintenance_work_mem => '64MB',
        checkpoint_completion_target => 0.9,
        wal_buffers          => '16MB',
        default_statistics_target => 100,
        random_page_cost     => 1.1,
        effective_io_concurrency => 200,
      }

      # Create database
      postgresql::server::db { $db_name:
        user     => $db_user,
        password => postgresql::postgresql_password($db_user, $db_password),
      }

      # Configure pg_hba for remote access
      postgresql::server::pg_hba_rule { 'allow application servers':
        type        => 'host',
        database    => $db_name,
        user        => $db_user,
        address     => '10.0.0.0/8',
        auth_method => 'md5',
      }

      # Install backup tools
      package { 'postgresql-client':
        ensure => installed,
      }

      # Create backup script
      file { '/usr/local/bin/backup_postgres.sh':
        ensure  => file,
        mode    => '0755',
        content => template('medical_platform/backup_postgres.sh.erb'),
      }

      # Schedule daily backups
      cron { 'postgresql_backup':
        command => '/usr/local/bin/backup_postgres.sh',
        user    => 'postgres',
        hour    => split($backup_time, ':')[0],
        minute  => split($backup_time, ':')[1],
        require => File['/usr/local/bin/backup_postgres.sh'],
      }
    }

    'mongodb': {
      # Install MongoDB
      class { 'mongodb::server':
        version    => '6.0',
        bind_ip    => ['0.0.0.0'],
        port       => 27017,
        auth       => true,
        create_admin => true,
        admin_username => 'admin',
        admin_password => $db_password,
      }

      # Create application database and user
      mongodb::db { $db_name:
        user     => $db_user,
        password => $db_password,
      }

      # Create backup script
      file { '/usr/local/bin/backup_mongodb.sh':
        ensure  => file,
        mode    => '0755',
        content => template('medical_platform/backup_mongodb.sh.erb'),
      }

      # Schedule daily backups
      cron { 'mongodb_backup':
        command => '/usr/local/bin/backup_mongodb.sh',
        user    => 'mongodb',
        hour    => split($backup_time, ':')[0],
        minute  => split($backup_time, ':')[1],
        require => File['/usr/local/bin/backup_mongodb.sh'],
      }
    }

    default: {
      fail("Unsupported database type: ${db_type}")
    }
  }

  # Configure firewall
  firewall { '200 allow database access':
    dport  => $db_type ? {
      'postgresql' => 5432,
      'mongodb'    => 27017,
      default      => 5432,
    },
    proto  => tcp,
    action => accept,
    source => '10.0.0.0/8', # Internal network only
  }

  # Install monitoring agent
  package { 'postgresql-contrib':
    ensure => installed,
  } -> 
  
  # Configure database monitoring
  file { '/etc/prometheus/postgres_exporter.yml':
    ensure  => file,
    content => template('medical_platform/postgres_exporter.yml.erb'),
  }
}
