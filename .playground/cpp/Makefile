# Compiler
CC=g++
# Compilation Flags
CXXFLAGS = -std=c++17 -O2 -Wall -Wextra
# STL Header
HEADER = /usr/include/x86_64-linux-gnu/c++/15/bits/stdc++.h
# Pre-compiled Header		
PCH = stdc++.h.gch								

# Indicate which are the recipe names:
.PHONY: all run cleanup

all: run

$(PCH): $(HEADER)
	$(CXX) $(CXXFLAGS) -x c++-header $(HEADER) -o $(PCH)

executable: code.cpp $(PCH)
	$(CXX) $(CXXFLAGS) -I. -include stdc++.h code.cpp -o executable

run: executable
	./executable < input.txt > output.txt

cleanup:
	rm -f executable

# Test Compilation times with and without PCH (assuming PCH generated):
# /usr/bin/time -f "Compilation time: %e sec" g++ -std=c++17 -Wall -O2 code.cpp -o executable
# /usr/bin/time -f "Compilation time: %e sec" g++ -std=c++17 -Wall -O2 -I. -include stdc++.h code.cpp -o executable