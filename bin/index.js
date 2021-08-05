#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Shebang通常出现在类Unix系统的脚本中第一行，作为前两个字符。在Shebang之后，可以有一个或数个空白字符，后接解释器的绝对路径，用于指明执行这个脚本文件的解释器。
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

// 用于检查入口文件是否正常执行
const inquirer = require('inquirer') //交互
const program = require('commander') //展示可用命令，并用指定命令
const chalk = require('chalk') //命令行颜色
const ora = require('ora') //加载动画
const spawn = require('cross-spawn'); // cross-spawn 跨平台 shell 工具
const figlet = require('figlet') //创建图形化LOGO

const create = require('../lib/create');


program
    // 定义命令和参数
    .command('add <app-name>')
    .description('创建一个新的项目')
    // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
    .option('-f, --force', '如果创建的目录存在则直接覆盖')
    // .option('-g, --get <path d="">', 'get value from option')
    // .option('-s, --set <path d=""> <value>')
    // .option('-d, --delete <path d="">', 'delete option from config')
    .action(create)

program
    .command('ui')
    .description('开始ui创建')
    .option('-p, --port <port>', 'UI服务器的端口')
    .action((option) => {
        console.log(option)
    })


program
    .version(`版本:${require('../package.json').version}`) // 配置版本号信息
    .usage('<command> [option]')

program
    // 监听 --help 执行 
    .on('--help', () => {
        // 绘制图形
        console.log(chalk.cyan('\r\n' + figlet.textSync('LOVE', {
            font: 'Ghost',
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 300,
            whitespaceBreak: true
        })));

        // 新增说明信息
        console.log(`\r\n运行 ${chalk.cyan(`mini <command> --help`)} 获取命令的使用详情\r\n`)
    })

// 解析用户执行命令传入参数 
program.parse(process.argv, 'process.argv');