
setup:; wget -P closure-compiler/ http://closure-compiler.googlecode.com/files/compiler-latest.zip && unzip -d ./closure-compiler/ ./closure-compiler/compiler-latest.zip && rm ./closure-compiler/compiler-latest.zip 

build: src/main.coffee closure-compiler/compiler.jar
	coffee -c src/ && java -jar closure-compiler/compiler.jar src/main.js | sed -n -e ":a" -e "$ s/\n//gp;N;b a" | sed -e "s/^/javascript:/" > bookmarklet.txt

