set :deploy_to, '/var/webApps/password-generator.tes.co.jp'
server 'password-generator.tes.co.jp', user: 'pg-user', roles: %w[web]
