#!/usr/bin/env node

const fs      = require("fs")
const url     = require("url")
const path    = require("path")
const net     = require("net")
const chalk   = require("chalk")
const program = require("commander")

var package;
try { package = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), { encoding: "utf8" })) }
catch (ex)
{
    // Something bad happened
    console.log(chalk.red   ("Error:     ") + "While loading package information, an exception occured.")
    console.log(chalk.yellow("Exception: ") + ex)

    // Return error
    process.exit(1)
}

// With the package info loaded, let's do the commander stuff
program
    .version    (package.version)
    .description(package.description)
    .option     ("-p, --port <port>"   , "Port to listen on"                 , parseInt)
    .option     ("-d, --display <mode>", "Display mode (text, hex, both)")
    .option     ("-e, --encoding <fmt>", "Encoding (\"utf8\" is default)")
    .parse(process.argv)

// Family-friendly server options
var serverPort  = program.port    || 32768    // 32 * 1024 is default port
var logDisplay  = program.display || "text" // Let's show both bytes and string (like HxD)
var logEncoding = program.display || "utf8"   // Let's show both bytes and string (like HxD)

function ipToString(family, address, port)
{
    if (family === "IPv6")
        address = `[${address}]`
    return `${address}:${port}`
}

// A list of client so we can keep track
var clients = []

// Start a TCP server
var server = net.createServer({}, (c) =>
{
    // Add the address to the clients
    console.log(chalk.blue("Info: ") + `Client ${ipToString(c.remoteFamily, c.remoteAddress, c.remotePort)} connected.`)

    c.on("data", (data) =>
    {
        console.log(chalk.magenta(ipToString(c.remoteFamily, c.remoteAddress, c.remotePort)) + ` ~ ${data.length} bytes.`)
        if (logDisplay === "text" || logDisplay === "both")
        {
            console.log(data.toString(program.encoding))
        }
        else if (logDisplay === "hex" || logDisplay === "both")
        {
            data.forEach((value, index) => 
            {
                process.stdout.write(value.toString(16).padStart(2, '0').toUpperCase() + " ")
            })
            process.stdout.write("\r\n")
        }
    })
    
    // When the client disconnects, report
    c.on("end", () => {
        console.log("Client disconnected.")
    })
})

// When we have an error
server.on("error", (err) => 
{
    throw err
})

// Start listening on port
server.listen(serverPort, () =>
{
    console.log(chalk.blue("Info: ") + `Server started on port ${ serverPort }.`)
})
