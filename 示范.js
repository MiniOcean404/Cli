#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Shebang通常出现在类Unix系统的脚本中第一行，作为前两个字符。在Shebang之后，可以有一个或数个空白字符，后接解释器的绝对路径，用于指明执行这个脚本文件的解释器。
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改


// "bin": {
//     "mini": "./bin/index.js"  命令别名
//   },

// npm link OR yarn link 链接到全局

// 用于检查入口文件是否正常执行
const inquirer = require('inquirer') //交互
const program = require('commander') //展示可用命令，并用指定命令
const chalk = require('chalk') //命令行颜色
const ora = require('ora') //加载动画
const spawn = require('cross-spawn'); // cross-spawn 跨平台 shell 工具
const figlet = require('figlet') //创建图形化LOGO

/**
 * 输入内容
 */
inquirer.prompt([{
    type: 'input', //type： input, number, confirm, list, checkbox ... 
    message: '提示信息', // 提示信息
    name: 'key', // key 名
    default: 'default' // 默认值
}]).then(answers => {
    // 打印互用输入结果
    console.log(answers)

    const cwdUrl = process.cwd()
    console.log(cwdUrl)
})


/**
 * 指定命令，设置命令行颜色
 */
program
    .version('0.1.0')
    .command('create <name>') //<>用于取值
    .description('创建一个项目')
    .action(name => {
        // 打印命令行输入的值
        console.log("项目名字 " + name)

        // 颜色
        console.log("project name is " + chalk.cyan(name))
        console.log("project name is " + chalk.green(name))

        // 背景色
        console.log("project name is " + chalk.bgRed(name))

        // 使用RGB颜色输出
        console.log("project name is " + chalk.rgb(4, 156, 219).underline(name));
        console.log("project name is " + chalk.hex('#049CDB').bold(name));
        console.log("project name is " + chalk.bgHex('#049CDB').bold(name))
    })

program.parse()



/**
 * 加载动画
 */
const message = 'Loading 独角兽'
const spinner = ora(message);
// 开始加载动画
spinner.start();
setTimeout(() => {
    // 修改动画样式

    // Type: string
    // Default: 'cyan'
    // Values: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray'
    spinner.color = 'red';
    spinner.text = 'Loading 彩虹';

    setTimeout(() => {
        // 加载状态修改
        spinner.stop() // 停止
        spinner.succeed('Loading 成功'); // 成功 ✔
        // spinner.fail('Loading 失败'); // 失败 ✖
        // spinner.warn('Loading 提示'); //提示 ⚠
        // spinner.info('Loading 信息'); //信息 ℹ
    }, 2000);
}, 2000);



/**
 * 执行命令
 */
// 定义需要按照的依赖
// const dependencies = ['vue', 'vuex', 'vue-router'];
const dependencies = ['ora'];
// 执行安装
const child = spawn('npm', ['install', '-D'].concat(dependencies), {
    stdio: 'inherit'
});

// 监听执行结果
child.on('close', function (code) {
    // 执行失败
    if (code !== 0) {
        console.log(chalk.red('Error occurred while installing dependencies!'));
        process.exit(1);
    }
    // 执行成功
    else {
        console.log(chalk.cyan('安装完成'))
    }
})



// 绘制图形
console.log('\r\n' + figlet.textSync('miniOcean', {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 300,
    whitespaceBreak: true
}));