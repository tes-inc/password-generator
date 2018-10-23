lock "~> 3.11.0"

set :application, 'password-generator'
set :repo_url, 'git@github.com:tes-inc/password-generator'
set :whenever_identifier, ->{ "#{fetch(:application)}_#{fetch(:stage)}" }

set :yarn_roles, :web
set :yarn_env_variables, fetch(:yarn_env_variables, {})

namespace :yarn do
  task :generate do
    on roles fetch(:yarn_roles) do
      within fetch(:yarn_target_path, release_path) do
        with fetch(:yarn_env_variables, {}) do
          execute :yarn, 'run generate'
        end
      end
    end
  end
end

after "yarn:install", "yarn:generate"
