# Compiler
CC = gcc
# Compilation Flags
CFLAGS = -std=c17 -O2 -Wall -Wextra -Wpedantic
# Executable
TARGET = executable

# Indicate which are the recipe names
.PHONY: all run cleanup

all: run

$(TARGET): code.c
	$(CC) $(CFLAGS) code.c -o $(TARGET)

run: $(TARGET)
	./$(TARGET) < input.txt > output.txt

cleanup:
	rm -f $(TARGET)
