
let config = null;

let env = process.env.NODE_ENV || 'dev';
try {
    config = require(`./build/webpack.${env}.config`);
} catch (error) {
    console.error('未找所选环境变量对应的配置文件');
}

module.exports = config;
