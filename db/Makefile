run: stop
	-docker network create momo
	docker build -t momodb-image .
	docker run --name momodb -v momodb-data:/var/lib/postgresql/data \
	--network=momo \
	-p 5432:5432 -d momodb-image

stop down:
	-docker stop momodb
	-docker rm momodb

shell:
	docker exec -it momodb bash

logs:
	docker logs momodb