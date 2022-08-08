#############################################################################
-include Makefile.options
deploy_dir?=dist

build: init
	npm run build
test:  
	npm run test:unit:ci
#############################################################################
serve: init
	npm run dev
#############################################################################
lint: init
	npm run lint
#############################################################################
init: .init.done
.init.done: 
	npm ci
	touch $@
#############################################################################
clean: 
	rm -f .init.done
	rm -rf dist
	rm -rf node_modules

.EXPORT_ALL_VARIABLES:	
