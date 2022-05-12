
# Other config
NO_COLOR=\033[0m
OK_COLOR=\033[32;01m
ERROR_COLOR=\033[31;01m
WARN_COLOR=\033[33;01m

dev-up:
	@echo "$(OK_COLOR)==> Running docker-compose up$(NO_COLOR)"
	@docker-compose up -d
	@flask run --host=0.0.0.0 --port 8000