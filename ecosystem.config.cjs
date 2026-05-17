module.exports = {
  apps: [
    {
      name: 'aksara-landing',
      script: 'npm',
      args: 'run preview -- --host 0.0.0.0 --port 3002',
      cwd: '/var/www/aksara-landing',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
