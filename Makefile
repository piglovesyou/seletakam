COMPILER_ZIP          = compiler-latest.zip
COMPILER_REMOTE_DIR    = http://closure-compiler.googlecode.com/files/$(COMPILER_ZIP)
COMPILER_DIR          = closure-compiler/
COMPILER_JAR          = $(COMPILER_DIR)/compiler.jar

setup:;
	rm -rf $(COMPILER_DIR) && \
	wget -P $(COMPILER_DIR) $(COMPILER_REMOTE_DIR) && \
	unzip -d $(COMPILER_DIR) $(COMPILER_DIR)$(COMPILER_ZIP) && \
	rm $(COMPILER_DIR)$(COMPILER_ZIP)

build: src/main.coffee $(COMPILER_JAR)
	coffee -c src/ && \
	java -jar $(COMPILER_JAR) src/main.js | \
	sed -n -e ":a" -e "$ s/\n//gp;N;b a" | \
	sed -e "s/^/javascript:/" \
	> bookmarklet.txt

