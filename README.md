# TCP Listener

This is a simple TCP listener for data and whatnot.

It only listens and doesn't respond to anything. All it does is recieve data and
blurt it out on the screen.

I made it for monitoring and debugging a project that involves networking.

# Installation
Assuming you have Node.js and NPM installed,

```bash
[sudo] npm install -g tcp-listener
```

# Usage
```
  Usage: tcp-listener [options]

  A simple TCP listener that blurts out whatever it reads.

  Options:

    -V, --version         output the version number
    -p, --port <port>     Port to listen on
    -d, --display <mode>  Display mode (text, hex, both)
    -e, --encoding <fmt>  Encoding ("utf8" is default)
    -h, --help            output usage information
```

The `--encoding` option takes Node.js encoding identifiers.

# Example
If you start the server on port 80 and try connect to it using Firefox, this is what you get (well, it's more colorful IRL).

```
$ tcp-listener -d text -p 80

Info: Server started on port 80.
Info: Client [::ffff:192.168.1.82]:49643 connected.
[::ffff:192.168.1.82]:49643 ~ 349 bytes.
GET / HTTP/1.1
Host: 192.168.1.25
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:61.0) Gecko/20100101 Firefox/61.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-GB,en-US;q=0.7,en-NZ;q=0.3
Accept-Encoding: gzip, deflate
DNT: 1
Connection: keep-alive
Upgrade-Insecure-Requests: 1


Client disconnected.

```