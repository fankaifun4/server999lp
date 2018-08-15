'use strict';

// had enabled by egg
// exports.static = true;
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
}

exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks'
};

exports.cors = {
    enable: true,
    package: 'egg-cors',
};

exports.security = {
    domainWhiteList: [],
};

exports.validate = {
    enable: true,
    package: 'egg-validate',
};