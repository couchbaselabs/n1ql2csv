.DEFAULT_GOAL:= build
MAKEFLAGS = -j1
PATH := ./node_modules/.bin:$(PATH)
SHELL := /bin/bash
.PHONY: install clean build compile watch run

# install all the things
install:
	@npm install

# remove the contents but leave the dist directory is not removed because
# this will break the docker container if it is removed since it is
# virtually linked
clean:
	@rm -rf logs dist/*

# build the source files
build compile:
	@make clean
	@babel src --source-maps --out-dir dist $(args)

# remove all files that are ignored by git
deep-clean:
	@make clean
	@rm -rf node_modules/ dist/ .nyc_output/ npm-debug.log yarn-error.log

# reinstall the node_modules and start with a fresh node build
reinstall setup:
	@make deep-clean
	@make install

# When watching for changes we can assume it's a development env
# so build files with source maps
watch:
	@make clean
	@babel src --source-maps --out-dir dist --watch

publish release:
	@make reinstall
	# rebuild project without sourcemaps
	@make build
	np --no-cleanup --yolo $(args)
