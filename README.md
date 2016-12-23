Did you mean https://github.com/onsip/SIP.js ?
===================

sipjs.com
-------------------

SIP.js developer documentation http://sipjs.com

If you are looking for the SIP.js github page, you can find it at https://github.com/onsip/sip.js

Development
---

    git clone https://github.com/onsip/sipjs.com
    cd sipjs.com
    gem install bundler # http://bundler.io
    bundle install --path vendor/bundle

    bundle exec nanoc # build once
    bundle exec nanoc view # serve over localhost:3000
    bundle exec guard # live rebuild
    
    Publish to Gitlab Pages:
      git push origin master
    
    Publish to Github Pages (deprecated):
      bundle exec rake publish # publish to sipjs.com
