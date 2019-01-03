# CzApp
Czech language learning app for English speakers

# Development
To compile Typescript:
$ npm run start

To run tests:
$ npm run test

To run production build:
$ npm run build

To compile sass (in another terminal)
$ npm run watch-css


Virtual host configs:
____________________

<VirtualHost *:80>
        ServerName mysite.com
        DocumentRoot /www/mysite.com
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
        Redirect / https://mysite.com/
        <Directory /www/mysite.com>
                FallbackResource /index.html
                Require all granted
        </Directory>
</VirtualHost>

# vim: syntax=apache ts=4 sw=4 sts=4 sr noet

<VirtualHost *:443>
        ServerName mysite.com
        DocumentRoot /www/mysite.com
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
        SSLEngine on
        SSLCertificateFile /etc/ssl/mysite/certificate.crt
        SSLCertificateKeyFile /etc/ssl/private/ssl-cert-mysite.key
        SSLCertificateChainFile /etc/ssl/mysite/ca_bundle.crt
        <Directory /www/mysite.com>
                FallbackResource /index.html
                Require all granted
        </Directory>
</VirtualHost>

# vim: syntax=apache ts=4 sw=4 sts=4 sr noet

Get new free SSL cert (or renew) from https://www.sslforfree.com/