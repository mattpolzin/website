
.PHONY: all clean timeline

all : timeline

./timeline.js:
	idris2 --build timeline.ipkg
	cp ./build/exec/timeline ./timeline.js

timeline: ./timeline.js
	node timeline.js html < proclevities.in > timeline.html

clean:
	rm -rf ./build/
	rm -f ./timeline.js
	rm -f ./timeline.html
