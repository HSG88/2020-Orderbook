#!/bin/bash
abigen --sol=simple.sol --pkg=arbostestcontracts --out=simple.go
abigen --sol=failedsend.sol --pkg=arbostestcontracts --out=failedsend.go
abigen --sol=storage.sol --pkg=arbostestcontracts --out=storage.go
abigen --sol=create2.sol --pkg=arbostestcontracts --out=create2.go
