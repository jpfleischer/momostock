.PHONY: run docker-build docker-run


run: stop build
	-docker network create momo
	docker run \
	-p 8080:8081 \
	-p 3000:3000 \
	-v ${CURDIR}:/app \
	--network=momo \
	-d momostock
	make logs

build:
	docker build -t momostock .

stop:
	-docker stop `docker ps -aqf "ancestor=momostock"`
	-docker rm `docker ps -aqf "ancestor=momostock"`

old-run:
	npm run serve

logs log:
	# we use ancestor and follow
	docker logs  --follow `docker ps -aqf "ancestor=momostock"`