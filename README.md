## Seletakam
A bookmarklet of performance test tool to measure CSS reflow time.


### build
```bash
$ coffee -v
CoffeeScript version 1.2.0

$ java -version
java version "1.6.0_31"

$ wget -P closure-compiler/ http://closure-compiler.googlecode.com/files/compiler-latest.zip && unzip -d ./closure-compiler/ ./closure-compiler/compiler-latest.zip
$ ls closure-compiler/ | grep jar
compiler.jar

$ coffee -c src/ && java -jar closure-compiler/compiler.jar src/main.js | sed -n -e ":a" -e "$ s/\n//gp;N;b a" | sed -e "s/^/javascript:/" > bookmarklet.txt
```
